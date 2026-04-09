import { supabase } from "@/lib/supabase"

// BUSCAR BOLOS (GET) - Garante que a lista apareça
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("bolos")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error
    return Response.json(data || [])
  } catch (err) {
    console.error("Erro ao buscar:", err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}

// SALVAR BOLO (POST) - Resolve o erro 500
export async function POST(req) {
  try {
    const formData = await req.formData()
    
    // Extração segura dos campos
    const nome = formData.get("nome") || ""
    const precoStr = formData.get("preco") || "0"
    const preco = parseFloat(precoStr.replace(',', '.'))
    const descricao = formData.get("descricao") || ""
    const porcoes = formData.get("porcoes") || ""
    const ingredientes = formData.get("ingredientes") || ""
    const destaque = formData.get("destaque") === "true"
    const disponivel = formData.get("disponivel") === "true"
    const imagem = formData.get("imagem")

    let urlImagem = ""

    // Lógica de Upload de Imagem
    if (imagem && imagem instanceof File && imagem.size > 0) {
      const fileName = `${Date.now()}-${imagem.name.replace(/[^a-zA-Z0-9.]/g, '_')}`
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("bolos")
        .upload(fileName, imagem)

      if (uploadError) throw new Error("Erro no upload: " + uploadError.message)
      
      const { data: publicUrl } = supabase.storage.from("bolos").getPublicUrl(fileName)
      urlImagem = publicUrl.publicUrl
    }

    // Inserção no Supabase
    const { data, error: dbError } = await supabase
      .from("bolos")
      .insert([{ 
        nome, 
        preco, 
        descricao, 
        porcoes, 
        ingredientes, 
        destaque, 
        disponivel, 
        imagem: urlImagem 
      }])
      .select()

    if (dbError) throw new Error("Erro no banco: " + dbError.message)
    return Response.json(data[0])

  } catch (err) {
    console.error("Falha na API:", err.message)
    return Response.json({ error: err.message }, { status: 500 })
  }
}