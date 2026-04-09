import { supabase } from "@/lib/supabase"

export async function POST(req) {
  try {
    const formData = await req.formData()

    const nome = formData.get("nome")
    const preco = formData.get("preco")
    const porcoes = formData.get("porcoes") || ""
    const ingredientes = formData.get("ingredientes") || ""
    const destaque = formData.get("destaque") === "true"
    const disponivel = formData.get("disponivel") === "true"
    const imagem = formData.get("imagem")

    let urlImagem = ""

    // Upload da Imagem
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

    // Inserção no Banco - Ajustado para bater com suas colunas do Supabase
    const { data, error } = await supabase
      .from("bolos")
      .insert([{ 
        nome, 
        preco: String(preco), // Convertido para String pois sua coluna é 'text'
        porcoes, 
        ingredientes, // Sua tabela usa ingredientes para a descrição longa
        destaque, 
        disponivel, 
        imagem: urlImagem 
      }])
      .select()

    if (error) {
      console.error("Erro Supabase:", error.message)
      return Response.json({ error: error.message }, { status: 500 })
    }

    return Response.json(data ? data[0] : { success: true })
    
  } catch (err) {
    console.error("Erro Interno:", err)
    return Response.json({ error: "Erro interno no servidor" }, { status: 500 })
  }
}