"use client"

import { useEffect, useState } from "react"
import CakeCard from "./CakeCard"
import ProductModal from "./ProductModal"

export default function BestSellers(){

const [bolos,setBolos] = useState([])
const [boloSelecionado,setBoloSelecionado] = useState(null)

async function carregarBolos(){

const res = await fetch("/api/bolos")
const data = await res.json()

setBolos(data.slice(0,3))
}

useEffect(()=>{
carregarBolos()
},[])

return(

<section className="py-20 px-10 bg-[#F7E7E3]">

<h2 className="text-3xl font-bold text-center text-gray-900">
Nossos Bolos Mais Vendidos
</h2>

<div className="grid md:grid-cols-3 gap-8 mt-12">

{bolos.map((bolo)=>(
<CakeCard 
key={bolo.id} 
bolo={bolo}
onClick={setBoloSelecionado}
/>
))}

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