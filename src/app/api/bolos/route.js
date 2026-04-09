import { supabase } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function GET() {
  const { data, error } = await supabase
    .from("bolos")
    .select("*")
    .order("id", { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data || [])
}

export async function POST(req) {
  try {
    const formData = await req.formData()

    // Extração dos dados enviando exatamente o que o banco agora suporta
    const nome = formData.get("nome")
    const preco = formData.get("preco")
    const descricao = formData.get("descricao") || ""
    const porcoes = formData.get("porcoes") || ""
    const ingredientes = formData.get("ingredientes") || ""
    const destaque = formData.get("destaque") === "true"
    const disponivel = formData.get("disponivel") === "true"
    const imagem = formData.get("imagem")

    let urlImagem = ""

    // Lógica de Upload para o Storage do Supabase
    if (imagem && imagem instanceof File && imagem.size > 0) {
      const fileName = `${Date.now()}-${imagem.name.replace(/\s/g, '_')}`
      const bytes = await imagem.arrayBuffer()
      
      const { error: uploadError } = await supabase.storage
        .from("bolos")
        .upload(fileName, bytes, { 
          contentType: imagem.type,
          upsert: true 
        })

      if (uploadError) {
        return NextResponse.json({ error: `Erro no Upload: ${uploadError.message}` }, { status: 500 })
      }

      const { data: publicUrl } = supabase.storage.from("bolos").getPublicUrl(fileName)
      urlImagem = publicUrl.publicUrl
    }

    // Inserção no banco de dados com a nova coluna 'descricao'
    const { data, error } = await supabase
      .from("bolos")
      .insert([{ 
        nome, 
        preco: String(preco), // Mantido como String para evitar erro com a coluna 'text'
        descricao, 
        porcoes, 
        ingredientes, 
        destaque, 
        disponivel, 
        imagem: urlImagem 
      }])
      .select()

    if (error) {
      console.error("Erro Supabase:", error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data[0], { status: 201 })

  } catch (err) {
    console.error("Erro Interno:", err)
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 })
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json()
    const { error } = await supabase.from("bolos").delete().eq("id", id)
    
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: "Erro ao deletar" }, { status: 500 })
  }
}