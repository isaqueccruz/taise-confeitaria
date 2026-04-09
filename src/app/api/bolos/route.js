import { supabase } from "@/lib/supabase"

export async function POST(req) {
  try {
    const formData = await req.formData()
    
    // Pegando os valores e tratando nulos para evitar erro no banco
    const nome = formData.get("nome") || ""
    const preco = formData.get("preco") ? parseFloat(formData.get("preco")) : 0
    const descricao = formData.get("descricao") || ""
    const porcoes = formData.get("porcoes") || ""
    const ingredientes = formData.get("ingredientes") || ""
    const destaque = formData.get("destaque") === "true"
    const disponivel = formData.get("disponivel") === "true"
    const imagem = formData.get("imagem")

    let urlImagem = ""

    // Lógica de Upload
    if (imagem && imagem.size > 0) {
      const fileName = `${Date.now()}-${imagem.name.replace(/\s/g, '_')}`
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("bolos")
        .upload(fileName, imagem)

      if (uploadError) {
        console.error("Erro no Storage:", uploadError)
        return Response.json({ error: "Erro ao subir imagem" }, { status: 500 })
      }
      
      const { data: publicUrl } = supabase.storage.from("bolos").getPublicUrl(fileName)
      urlImagem = publicUrl.publicUrl
    }

    // Inserção com campos novos
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

    if (dbError) {
      console.error("Erro no Banco:", dbError)
      return Response.json({ error: dbError.message }, { status: 500 })
    }

    return Response.json(data[0])

  } catch (err) {
    console.error("Erro Geral:", err)
    return Response.json({ error: "Falha interna no servidor" }, { status: 500 })
  }
}