import { supabase } from "@/lib/supabase"

// 🔍 GET
export async function GET() {
  const { data, error } = await supabase
    .from("bolos")
    .select("*")
    .order("id", { ascending: false })

  if (error) {
    console.log(error)
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json(data)
}

// ➕ POST
export async function POST(req) {
  const formData = await req.formData()

  const nome = formData.get("nome")
  const preco = formData.get("preco")
  const imagem = formData.get("imagem")

  let urlImagem = ""

  if (imagem && imagem.size > 0) {
    const fileName = Date.now() + "-" + imagem.name

    const bytes = await imagem.arrayBuffer()

    const { error: uploadError } = await supabase.storage
      .from("bolos")
      .upload(fileName, bytes, {
        contentType: imagem.type
      })

    if (uploadError) {
      console.log(uploadError)
      return Response.json({ error: uploadError.message }, { status: 500 })
    }

    const { data: publicUrl } = supabase.storage
      .from("bolos")
      .getPublicUrl(fileName)

    urlImagem = publicUrl.publicUrl
  }

  const { data, error } = await supabase
    .from("bolos")
    .insert([{ nome, preco, imagem: urlImagem }])
    .select()

  if (error) {
    console.log(error)
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json(data[0])
}

// ❌ DELETE
export async function DELETE(req) {
  const { id } = await req.json()

  const { error } = await supabase
    .from("bolos")
    .delete()
    .eq("id", id)

  if (error) {
    console.log(error)
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ success: true })
}