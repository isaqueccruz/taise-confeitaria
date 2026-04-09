import { supabase } from "@/lib/supabase"
import { NextResponse } from "next/server"

// 1. LISTAR TODOS OS BOLOS (Usado no Catálogo e no Painel)
export async function GET() {
  const { data, error } = await supabase
    .from("bolos")
    .select("*")
    .order("id", { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data || [])
}

// 2. CRIAR NOVO BOLO
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

    // Upload da imagem apenas se ela existir
    if (imagem && imagem instanceof File && imagem.size > 0) {
      const fileName = `${Date.now()}-${imagem.name.replace(/\s/g, '_')}`
      const bytes = await imagem.arrayBuffer()
      
      const { error: uploadError } = await supabase.storage
        .from("bolos")
        .upload(fileName, bytes, { contentType: imagem.type })

      if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 })
      
      const { data: publicUrl } = supabase.storage.from("bolos").getPublicUrl(fileName)
      urlImagem = publicUrl.publicUrl
    }

    const { data, error } = await supabase
      .from("bolos")
      .insert([{ 
        nome, 
        preco: String(preco), 
        descricao, 
        porcoes, 
        ingredientes, 
        destaque, 
        disponivel, 
        imagem: urlImagem 
      }])
      .select()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data[0], { status: 201 })

  } catch (err) {
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 })
  }
}

// 3. EDITAR BOLO EXISTENTE (PUT)
export async function PUT(req) {
  try {
    const formData = await req.formData()
    const id = formData.get("id")

    if (!id) return NextResponse.json({ error: "ID do bolo é obrigatório" }, { status: 400 })

    // Objeto com os dados para atualizar
    const updateData = {
      nome: formData.get("nome"),
      preco: String(formData.get("preco")),
      descricao: formData.get("descricao") || "",
      porcoes: formData.get("porcoes") || "",
      ingredientes: formData.get("ingredientes") || "",
      destaque: formData.get("destaque") === "true",
      disponivel: formData.get("disponivel") === "true",
    }

    const imagem = formData.get("imagem")

    // Lógica inteligente de imagem: só atualiza se você enviou um novo arquivo
    if (imagem && imagem instanceof File && imagem.size > 0) {
      const fileName = `${Date.now()}-${imagem.name.replace(/\s/g, '_')}`
      const bytes = await imagem.arrayBuffer()
      
      const { error: uploadError } = await supabase.storage
        .from("bolos")
        .upload(fileName, bytes, { contentType: imagem.type })

      if (!uploadError) {
        const { data: publicUrl } = supabase.storage.from("bolos").getPublicUrl(fileName)
        updateData.imagem = publicUrl.publicUrl
      }
    }

    const { data, error } = await supabase
      .from("bolos")
      .update(updateData)
      .eq("id", id)
      .select()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data[0])

  } catch (err) {
    return NextResponse.json({ error: "Erro ao atualizar bolo" }, { status: 500 })
  }
}

// 4. EXCLUIR BOLO
export async function DELETE(req) {
  try {
    const { id } = await req.json()
    const { error } = await supabase.from("bolos").delete().eq("id", id)
    
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: "Erro ao processar exclusão" }, { status: 500 })
  }
}