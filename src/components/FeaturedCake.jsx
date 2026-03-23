"use client"

import { useEffect, useState } from "react"

export default function FeaturedCake() {
  const [bolo, setBolo] = useState(null)

  useEffect(() => {
    async function carregar() {
      const res = await fetch("/api/bolos")
      const data = await res.json()

      const destaque = data.find(b => b.destaque)
      setBolo(destaque || data[0])
    }

    carregar()
  }, [])

  if (!bolo) return null

  return (
    <section className="w-full py-16 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        <div className="h-[400px] overflow-hidden rounded-2xl">
          <img
            src={bolo.imagem}
            alt={bolo.nome}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-4">
            {bolo.nome}
          </h2>

          <p className="text-gray-600 mb-6">
            {bolo.descricao || "Delicioso bolo artesanal"}
          </p>

          <p className="text-2xl font-bold mb-6">
            R$ {bolo.preco}
          </p>

          <button className="bg-black text-white px-6 py-3 rounded-xl">
            Fazer pedido
          </button>
        </div>

      </div>
    </section>
  )
}