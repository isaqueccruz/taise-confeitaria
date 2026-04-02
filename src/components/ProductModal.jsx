"use client"

import { useState, useEffect } from "react"

export default function ProductModal({ bolo, onClose }) {
  const [tamanho, setTamanho] = useState("Pequeno")
  const [massa, setMassa] = useState("Chocolate")
  const [quantidade, setQuantidade] = useState(1)
  const [obs, setObs] = useState("")

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => (document.body.style.overflow = "auto")
  }, [])

  const precos = {
    "Pequeno": 170,
    "Médio": 220,
    "Grande": 300
  }

  const precoUnitario = precos[tamanho] || bolo.preco
  const precoTotal = (precoUnitario * quantidade).toFixed(2)

  const mensagem = `*Novo Pedido de Bolo* 🍰
---------------------------
*Sabor:* ${bolo.nome}
*Tamanho:* ${tamanho}
*Massa:* ${massa}
*Qtd:* ${quantidade}
${obs ? `*Obs:* ${obs}` : ""}

*Total:* R$ ${precoTotal}
---------------------------`

  return (
    <div className="fixed inset-0 bg-black/70 flex items-end md:items-center justify-center z-50 transition-opacity" onClick={onClose}>
      <div 
        className="bg-white w-full md:max-w-lg rounded-t-[32px] md:rounded-3xl overflow-hidden shadow-2xl animate-slideUp max-h-[95vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho com Imagem e Botão Fechar */}
        <div className="relative h-64 w-full">
          <img src={bolo.imagem} className="w-full h-full object-cover" alt={bolo.nome} />
          <button onClick={onClose} className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md text-gray-800 hover:bg-white">
            ✕
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          <div>
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-black text-gray-900 leading-tight">{bolo.nome}</h2>
              <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase">Artesanal</span>
            </div>
            <p className="text-gray-500 text-sm mt-2">{bolo.descricao}</p>
          </div>

          {/* Seleção de Tamanho (Usando Chips em vez de Select) */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-800">Escolha o tamanho:</label>
            <div className="grid grid-cols-3 gap-2">
              {Object.keys(precos).map((t) => (
                <button
                  key={t}
                  onClick={() => setTamanho(t)}
                  className={`py-3 rounded-2xl border-2 text-sm font-semibold transition ${
                    tamanho === t ? "border-green-500 bg-green-50 text-green-700" : "border-gray-100 text-gray-500"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Seleção de Massa */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-800">Massa:</label>
            <div className="flex gap-2">
              {["Chocolate", "Baunilha", "Misto"].map((m) => (
                <button
                  key={m}
                  onClick={() => setMassa(m)}
                  className={`px-4 py-2 rounded-full border text-xs font-bold transition ${
                    massa === m ? "bg-gray-800 text-white border-gray-800" : "bg-white text-gray-400 border-gray-200"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Observações */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-900">Alguma observação?</label>
            <textarea
              placeholder="Ex: Nome do aniversariante, retirar morangos..."
              className="w-full bg-gray-50 border-none p-4 rounded-2xl text-sm focus:ring-2 focus:ring-green-500 outline-none"
              rows="2"
              value={obs}
              onChange={(e) => setObs(e.target.value)}
            />
          </div>
        </div>

        {/* Rodapé Fixo */}
        <div className="p-6 border-t border-gray-100 flex items-center gap-4 bg-white">
          {/* Contador de Quantidade */}
          <div className="flex items-center border border-gray-200 rounded-xl p-1">
            <button onClick={() => setQuantidade(Math.max(1, quantidade - 1))} className="px-3 py-2 text-xl text-gray-400 hover:text-green-600">-</button>
            <span className="w-8 text-center font-bold text-gray-800">{quantidade}</span>
            <button onClick={() => setQuantidade(quantidade + 1)} className="px-3 py-2 text-xl text-gray-400 hover:text-green-600">+</button>
          </div>

          <a
            href={`https://wa.me/5571988461789?text=${encodeURIComponent(mensagem)}`}
            target="_blank"
            className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-2xl py-4 text-center font-bold shadow-lg shadow-green-200 transition-all active:scale-95"
          >
            Pedir agora • R$ {precoTotal}
          </a>
        </div>
      </div>
    </div>
  )
}