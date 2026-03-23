"use client"

import { useEffect,useState } from "react"

export default function Bolos(){

const [bolos,setBolos] = useState([])
const [nome,setNome] = useState("")
const [descricao,setDescricao] = useState("")
const [preco,setPreco] = useState("")
const [imagem,setImagem] = useState(null)

async function carregarBolos(){

const res = await fetch("/api/bolos")

const data = await res.json()

setBolos(data)

}

useEffect(()=>{

carregarBolos()

},[])

async function adicionarBolo(){

const formData = new FormData()

formData.append("nome",nome)
formData.append("descricao", descricao)
formData.append("preco",preco)
formData.append("imagem",imagem)


await fetch("/api/bolos",{

method:"POST",
body:formData

})

carregarBolos()

}

async function excluirBolo(id){

await fetch("/api/bolos",{

method:"DELETE",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({id})

})

carregarBolos()

}

return(

<div className="min-h-screen bg-gray-100 p-10">

<h1 className="text-3xl font-bold text-gray-900">

Gestão de Bolos

</h1>

<div className="bg-white p-6 rounded-xl shadow mt-8 max-w-md">

<input
placeholder="Nome do bolo"
className="border p-2 w-full mb-3 rounded text-black placeholder-gray-500"
value={nome}
onChange={(e)=>setNome(e.target.value)}
/>

<input
  placeholder="Descrição"
  className="border p-2 w-full mb-3 rounded text-black"
  value={descricao}
  onChange={(e)=>setDescricao(e.target.value)}
/>

<input
placeholder="Preço"
className="border p-2 w-full mb-3 rounded text-black placeholder-gray-500"
value={preco}
onChange={(e)=>setPreco(e.target.value)}
/>

<input
type="file"
className="mb-3 text-black"
onChange={(e)=>setImagem(e.target.files[0])}
/>

<button
onClick={adicionarBolo}
className="bg-green-500 text-white px-4 py-2 rounded"
>

Adicionar

</button>

</div>

<div className="mt-10 space-y-3">

{bolos.map((bolo)=>(

<div
key={bolo.id}
className="bg-white p-4 rounded shadow flex justify-between"
>

<div>

<h3 className="font-bold text-gray-900">
{bolo.nome}
</h3>

<p className="text-gray-700">
R$ {bolo.preco}
</p>

</div>

<button
onClick={()=>excluirBolo(bolo.id)}
className="text-red-500"
>

Excluir

</button>

</div>

))}

</div>

</div>

)

}