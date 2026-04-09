import { supabase } from "@/lib/supabase"

// GET: Busca os bolos para a lista
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("bolos")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error
    return Response.json(data || [])
  } catch (err) {
    console.error("Erro GET:", err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}

// POST: Salva um novo bolo
export async function POST(req) {
  try {
    const formData = await req.formData()
    
    // Tratamento de campos nulos e tipos de dados
    const nome = formData.get("nome") || ""
    const preco = parseFloat(formData.get("preco")) || 0
    const descricao = formData.get("descricao") || ""
    const porcoes = formData.get("porcoes") || ""
    const ingredientes = formData.get("ingredientes") || ""
    const destaque = formData.get("destaque") === "true"
    const disponivel = formData.get("disponivel") === "true"
    const imagem = formData.get("imagem")

    let urlImagem = ""

    // Upload de Imagem
    if (imagem && imagem instanceof File && imagem.size > 0) {
      // Limpa o nome do arquivo para evitar caracteres especiais
      const fileName = `${Date.now()}-${imagem.name.replace(/[^a-zA-Z0-9.]/g, '_')}`
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("bolos")
        .upload(fileName, imagem)

      if (uploadError) throw new Error("Erro Storage: " + uploadError.message)
      
      const { data: publicUrl } = supabase.storage.from("bolos").getPublicUrl(fileName)
      urlImagem = publicUrl.publicUrl
    }

    // Inserção no Banco de Dados
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

    if (dbError) throw new Error("Erro Banco: " + dbError.message)

    return Response.json(data[0])

  } catch (err) {
    console.error("Erro POST:", err.message)
    return Response.json({ error: err.message }, { status: 500 })
  }
}
