import { supabase } from "@/lib/supabase"

export async function GET() {
  const { data, error } = await supabase
    .from("bolos")
    .select("*")
    .order("id", { ascending: false })

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data || [])
}

export async function POST(req) {
  try {
    const formData = await req.formData()

    const nome = formData.get("nome")
    const preco = formData.get("preco")
    const descricao = formData.get("descricao") || ""
    const porcoes = formData.get("porcoes") || ""
    const ingredientes = formData.get("ingredientes") || ""
    const destaque = formData.get("destaque") === "true"
    const disponivel = formData.get("disponivel") === "true"
    const imagem = formData.get("imagem")

    let urlImagem = ""

    if (imagem && imagem instanceof File && imagem.size > 0) {
      const fileName = `${Date.now()}-${imagem.name.replace(/\s/g, '_')}`
      const bytes = await imagem.arrayBuffer()
      const { error: uploadError } = await supabase.storage
        .from("bolos")
        .upload(fileName, bytes, { contentType: imagem.type })

      if (uploadError) return Response.json({ error: uploadError.message }, { status: 500 })
      const { data: publicUrl } = supabase.storage.from("bolos").getPublicUrl(fileName)
      urlImagem = publicUrl.publicUrl
    }

    const { data, error } = await supabase
      .from("bolos")
      .insert([{ 
        nome, 
        preco: parseFloat(preco), 
        descricao, 
        porcoes, 
        ingredientes, 
        destaque, 
        disponivel, 
        imagem: urlImagem 
      }])
      .select()

    if (error) return Response.json({ error: error.message }, { status: 500 })
    return Response.json(data[0])
  } catch (err) {
    return Response.json({ error: "Erro interno no servidor" }, { status: 500 })
  }
}

export async function DELETE(req) {
  const { id } = await req.json()
  const { error } = await supabase.from("bolos").delete().eq("id", id)
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ success: true })
}