"use client"

import { useEffect, useState } from "react"
import CakeCard from "./CakeCard"
import ProductModal from "./ProductModal"

export default function BestSellers() {
  const [bolos, setBolos] = useState([])
  const [boloSelecionado, setBoloSelecionado] = useState(null)

  async function carregarBolos() {
    try {
      const res = await fetch("/api/bolos")
      const data = await res.json()

      // FILTRO: Pega apenas os marcados como destaque no painel
      const destaques = data.filter(bolo => bolo.destaque === true)
      
      // Opcional: Se não houver nenhum destaque marcado, ele pega os 3 últimos
      if (destaques.length === 0) {
        setBolos(data.slice(0, 3))
      } else {
        setBolos(destaques)
      }
    } catch (error) {
      console.error("Erro ao carregar destaques:", error)
    }
  }

  useEffect(() => {
    carregarBolos()
  }, [])

  return (
    <section className="py-20 px-10 bg-[#F7E7E3]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black italic text-[#A67C74] text-center tracking-tighter">
          Nossos Bolos Mais Vendidos
        </h2>
        <p className="text-center text-[#826A61] font-medium mt-2">
          As estrelas da Taíse Sena Confeitaria
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {bolos.map((bolo) => (
            <CakeCard 
              key={bolo.id} 
              bolo={bolo}
              onClick={setBoloSelecionado}
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