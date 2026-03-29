"use client"

import Image from "next/image"
import { X, ShoppingCart, Plus, Minus } from "lucide-react"
import { useState, useEffect } from "react"

export default function ProductModal({ product, isOpen, onClose }) {
  const [quantity, setQuantity] = useState(1)

  // Resetar a quantidade toda vez que o modal abrir com um novo produto
  useEffect(() => {
    if (isOpen) setQuantity(1)
  }, [isOpen, product])

  if (!isOpen || !product) return null

  // Formatação de preço para Real Brasileiro
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(product.price * quantity)

  const handleWhatsAppOrder = () => {
    const message = `Olá Taíse! Gostaria de encomendar:\n\n*${product.name}*\nQuantidade: ${quantity}\nTotal: ${formattedPrice}\n\nLink do produto: ${window.location.href}`
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/5571988461789?text=${encodedMessage}`, '_blank')
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row shadow-2xl animate-in fade-in zoom-in duration-300">
        
        {/* IMAGEM DO PRODUTO (Lado Esquerdo) */}
        <div className="relative w-full md:w-1/2 h-[300px] md:h-auto bg-[#fdf2f0]">
          <Image
            src={product.image || "/placeholder-bolo.png"}
            alt={product.name}
            fill
            className="object-cover"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 left-4 p-2 bg-white/80 backdrop-blur-md rounded-full text-[#3d2b1f] md:hidden"
          >
            <X size={24} />
          </button>
        </div>

        {/* CONTEÚDO (Lado Direito) */}
        <div className="flex-1 p-8 flex flex-col justify-between">
          <div className="relative">
            <button 
              onClick={onClose}
              className="absolute -top-2 -right-2 p-2 text-gray-400 hover:text-[#3d2b1f] hidden md:block"
            >
              <X size={28} />
            </button>

            <span className="text-[#d4af37] text-xs uppercase tracking-widest font-bold">
              {product.category || "Artesanal"}
            </span>
            
            <h2 className="text-3xl md:text-4xl font-serif italic text-[#3d2b1f] mt-2 leading-tight">
              {product.name}
            </h2>

            {/* DESCRIÇÃO DINÂMICA (Corrigido: Pega do Admin) */}
            <div className="mt-4 text-gray-600 text-sm md:text-base leading-relaxed">
              {product.description || "Delícia artesanal feita com ingredientes selecionados e muito carinho."}
            </div>

            {/* PREÇO DINÂMICO (Corrigido: Pega do Admin) */}
            <div className="mt-6">
              <span className="text-2xl md:text-3xl font-bold text-[#7a8c53]">
                {formattedPrice}
              </span>
            </div>
          </div>

          {/* CONTROLES E BOTÃO */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-200 rounded-full px-4 py-2">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-gray-500 hover:text-[#3d2b1f]"
                >
                  <Minus size={20} />
                </button>
                <span className="mx-6 font-bold text-[#3d2b1f] w-4 text-center">
                  {quantity}
                </span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-gray-500 hover:text-[#3d2b1f]"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            <button 
              onClick={handleWhatsAppOrder}
              className="w-full bg-[#7a8c53] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#687a42] transition-all shadow-lg active:scale-95"
            >
              <ShoppingCart size={20} />
              Pedir no WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}