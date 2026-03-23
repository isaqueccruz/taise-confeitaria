"use client"

import { useEffect, useState } from "react"
import CakeCard from "./CakeCard"
import ProductModal from "./ProductModal"

export default function Menu(){

const [bolos,setBolos] = useState([])
const [boloSelecionado,setBoloSelecionado] = useState(null)

async function carregarBolos(){

const res = await fetch("/api/bolos")
const data = await res.json()

setBolos(data)

}

useEffect(()=>{
carregarBolos()
},[])

return(

<section id="cardapio" className="py-24 bg-white">

<div className="max-w-6xl mx-auto px-6">

<h2 className="text-3xl font-bold text-center text-gray-900">
Nosso Cardápio
</h2>

<p className="text-center text-gray-700 mt-3">
Os favoritos dos nossos clientes
</p>

<div className="grid md:grid-cols-3 gap-8 mt-14">

{bolos.map((bolo)=>(
<CakeCard 
key={bolo.id} 
bolo={bolo}
onClick={(bolo)=>setBoloSelecionado(bolo)}
/>
))}

</div>

</div>

{/* MODAL */}
{boloSelecionado && (
<ProductModal 
bolo={boloSelecionado}
onClose={() => setBoloSelecionado(null)}
/>
)}

</section>

)

}