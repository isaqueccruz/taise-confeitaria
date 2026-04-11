"use client"

import { useEffect, useState } from "react"
import CakeCard from "./CakeCard"
import ProductModal from "./ProductModal"

export default function Menu() {
  const [bolos, setBolos] = useState([])
  const [boloSelecionado, setBoloSelecionado] = useState(null)

  async function carregarBolos() {
    try {
      const res = await fetch("/api/bolos")
      const data = await res.json()

      // FILTRO: Mostra apenas os bolos que estão com "disponivel: true"
      const disponiveis = data.filter(bolo => bolo.disponivel === true)
      setBolos(disponiveis)
    } catch (error) {
      console.error("Erro ao carregar cardápio:", error)
    }
  }

  useEffect(() => {
    carregarBolos()
  }, [])

  return (
    <section id="cardapio" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-black italic text-[#A67C74] tracking-tighter">
            Nosso Cardápio
          </h2>
          <div className="w-20 h-1 bg-[#F3E5DC] mx-auto mt-4 rounded-full"></div>
          <p className="text-[#826A61] font-medium mt-4">
            Escolha o seu favorito e adoce o seu dia
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {bolos.map((bolo) => (
            <CakeCard 
              key={bolo.id} 
              bolo={bolo}
              onClick={(bolo) => setBoloSelecionado(bolo)}
            />
          ))}
        </div>

        {bolos.length === 0 && (
          <p className="text-center text-gray-400 py-10">
            Nenhum bolo disponível no momento.
          </p>
        )}
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