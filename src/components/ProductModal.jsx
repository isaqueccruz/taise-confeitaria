"use client"

import { useState, useEffect } from "react"

export default function ProductModal({ bolo, onClose }) {

  const [tamanho, setTamanho] = useState("Pequeno (4 pedaços)")
  const [massa, setMassa] = useState("Chocolate")
  const [obs, setObs] = useState("")

  // 🔥 trava scroll do fundo
  useEffect(()=>{
    document.body.style.overflow = "hidden"
    return ()=> document.body.style.overflow = "auto"
  },[])

  // 💰 preço dinâmico
  const precos = {
    "Pequeno (4 pedaços)": 170,
    "Médio (8 pedaços)": 220,
    "Grande (12 pedaços)": 300
  }

  const precoFinal = precos[tamanho] || bolo.preco

  // 📲 mensagem whatsapp
  const mensagem = `
Pedido de bolo 🍰

Sabor: ${bolo.nome}
Tamanho: ${tamanho}
Massa: ${massa}
Obs: ${obs}

Total: R$ ${precoFinal}
  `

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50">

      {/* CARD */}
      <div className="bg-white w-full md:max-w-md rounded-t-2xl md:rounded-2xl overflow-hidden shadow-xl animate-slideUp">

        {/* IMAGEM */}
        <img
          src={bolo.imagem}
          className="w-full h-48 object-cover"
        />

        {/* CONTEÚDO */}
        <div className="p-6 space-y-6">

          {/* TÍTULO */}
          <h2 className="text-2xl font-bold text-gray-900">
            {bolo.nome}
          </h2>

          {/* DESCRIÇÃO */}
          <p className="text-gray-800 text-sm leading-relaxed">
            Bolo artesanal feito com ingredientes selecionados.
            Escolha as opções abaixo para personalizar.
          </p>

          {/* PREÇO */}
          <p className="font-bold text-xl text-green-600">
            A partir de R$ {precoFinal}
          </p>

          {/* TAMANHO */}
          <div>
            <label className="font-semibold text-sm text-gray-800">
              Tamanho
            </label>

            <select
              value={tamanho}
              onChange={(e)=>setTamanho(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-xl mt-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option>Pequeno (4 pedaços)</option>
              <option>Médio (8 pedaços)</option>
              <option>Grande (12 pedaços)</option>
            </select>
          </div>

          {/* MASSA */}
          <div>
            <label className="font-semibold text-sm text-gray-800">
              Massa
            </label>

            <select
              value={massa}
              onChange={(e)=>setMassa(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-xl mt-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option>Chocolate</option>
              <option>Baunilha</option>
              <option>Misto</option>
            </select>
          </div>

          {/* PERSONALIZAÇÃO */}
          <div>
            <label className="font-semibold text-sm text-gray-800">
              Personalização
            </label>

            <textarea
              placeholder="Ex: nome, idade, frase,topo..."
              className="w-full border border-gray-300 p-3 rounded-xl mt-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              rows="3"
              value={obs}
              onChange={(e)=>setObs(e.target.value)}
            />
          </div>

        </div>

        {/* BOTÕES FIXOS */}
        <div className="p-4 border-t flex gap-3 bg-white sticky bottom-0">

          <button
            onClick={onClose}
            className="flex-1 border rounded-xl py-3 text-gray-800"
          >
            Fechar
          </button>

          <a
            href={`https://wa.me/5571988461789?text=${encodeURIComponent(mensagem)}`}
            target="_blank"
            className="flex-1 bg-green-500 text-white rounded-xl py-3 text-center font-semibold shadow-lg active:scale-95 transition"
          >
            Pedir
          </a>

        </div>

      </div>
    </div>
  )
}