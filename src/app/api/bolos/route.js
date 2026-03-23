import fs from "fs"
import { writeFile, readFile, mkdir } from "fs/promises"
import path from "path"

// 📁 caminhos
const dataDir = path.join(process.cwd(), "data")
const filePath = path.join(dataDir, "bolos.json")
const uploadDir = path.join(process.cwd(), "public/uploads")

// 📖 Ler bolos
async function lerBolos(){
  try{
    const data = await readFile(filePath,"utf-8")
    return JSON.parse(data)
  }catch{
    return []
  }
}

// 💾 Salvar bolos (corrigido)
async function salvarBolos(bolos){

  // garante pasta /data
  if(!fs.existsSync(dataDir)){
    await mkdir(dataDir, { recursive: true })
  }

  // garante arquivo bolos.json
  if(!fs.existsSync(filePath)){
    await writeFile(filePath, "[]")
  }

  // salva dados
  await writeFile(filePath, JSON.stringify(bolos,null,2))
}

// 📦 GET
export async function GET(){
  const bolos = await lerBolos()

  return new Response(JSON.stringify(bolos), {
    headers: { "Content-Type": "application/json" }
  })
}

// ➕ POST (adicionar bolo)
export async function POST(req){

  const data = await req.formData()

  const nome = data.get("nome")
  const preco = data.get("preco")
  const descricao = data.get("descricao") // ✅ NOVO
  const destaque = data.get("destaque") === "true" // ✅ NOVO
  const imagem = data.get("imagem")

  let bolos = await lerBolos()

  let caminhoImagem = ""

  // garante pasta uploads
  if(!fs.existsSync(uploadDir)){
    await mkdir(uploadDir, { recursive: true })
  }

  // upload imagem
  if(imagem && imagem.name){

    const bytes = await imagem.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const nomeArquivo = Date.now() + "-" + imagem.name
    const caminho = path.join(uploadDir, nomeArquivo)

    await writeFile(caminho, buffer)

    caminhoImagem = "/uploads/" + nomeArquivo
  }

  // 🔥 remove destaque anterior
  if (destaque) {
    bolos = bolos.map(b => ({
      ...b,
      destaque: false
    }))
  }

  const novoBolo = {
    id: Date.now(),
    nome,
    preco,
    descricao, // ✅ AGORA SALVA
    imagem: caminhoImagem,
    destaque // ✅ AGORA SALVA
  }

  bolos.push(novoBolo)

  await salvarBolos(bolos)

  return new Response(JSON.stringify(novoBolo), {
    headers: { "Content-Type": "application/json" }
  })
}

// ❌ DELETE (remover bolo)
export async function DELETE(req){

  const { id } = await req.json()

  let bolos = await lerBolos()

  bolos = bolos.filter(b => b.id !== id)

  await salvarBolos(bolos)

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" }
  })
}