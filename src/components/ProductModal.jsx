"use client"

import Image from "next/image"
import { X, ShoppingCart, Plus, Minus, Share2 } from "lucide-react"
import { useState, useEffect } from "react"

export default function ProductModal({ product, isOpen, onClose }) {
  const [quantity, setQuantity] = useState(1)

  // Sincroniza e reseta o estado sempre que um novo produto é selecionado
  useEffect(() => {
    if (isOpen) setQuantity(1)
  }, [isOpen, product])

  if (!isOpen || !product) return null

  // Garante que o preço venha dinamicamente do Admin e calcula o total
  const unitPrice = Number(product.price) || 0
  const totalPrice = unitPrice * quantity

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(totalPrice)

  const handleWhatsAppOrder = () => {
    const message = `Olá Taíse! Gostaria de encomendar:\n\n*${product.name}*\nQtd: ${quantity}\nTotal: ${formattedPrice}`
    window.open(`https://wa.me/5571988461789?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 bg-[#3d2b1f]/90 backdrop-blur-md transition-all">
      <div className="bg-white w-full h-full md:h-auto md:max-w-5xl md:rounded-[40px] overflow-hidden flex flex-col md:flex-row shadow-2xl relative">
        
        {/* BOTÃO FECHAR (Desktop) */}
        <button onClick={onClose} className="absolute top-6 right-6 z-50 p-2 bg-white/10 hover:bg-black/5 rounded-full transition-all hidden md:block">
          <X size={24} className="text-[#3d2b1f]" />
        </button>

        {/* COLUNA ESQUERDA: IMAGEM (Ocupa 50% no Desktop) */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-[650px] relative bg-[#fdf2f0]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
          {/* Botão Voltar Mobile */}
          <button onClick={onClose} className="absolute top-6 left-6 p-2 bg-white rounded-full md:hidden shadow-lg">
            <X size={20} />
          </button>
        </div>

        {/* COLUNA DIREITA: INFORMAÇÕES */}
        <div className="flex-1 p-8 md:p-14 flex flex-col justify-between bg-[#fcfaf9]">
          <div>
            <div className="flex justify-between items-start">
              <span className="text-[#d4af37] text-[10px] uppercase tracking-[0.4em] font-black">
                {product.category || "Exclusivo"}
              </span>
              <Share2 size={18} className="text-gray-400 cursor-pointer hover:text-[#d4af37]" />
            </div>
            
            <h2 className="text-3xl md:text-5xl font-serif italic text-[#3d2b1f] mt-4 leading-tight">
              {product.name}
            </h2>

            {/* DESCRIÇÃO DINÂMICA (Resolvido: Conexão com Admin) */}
            <p className="mt-6 text-gray-600 leading-relaxed text-sm md:text-base font-light">
              {product.description || "Descrição não informada pelo administrador."}
            </p>

            <div className="mt-8 flex items-baseline gap-2">
              <span className="text-3xl md:text-4xl font-bold text-[#7a8c53] tracking-tighter">
                {formattedPrice}
              </span>
            </div>
          </div>

          {/* AÇÕES DE COMPRA */}
          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center bg-gray-100 rounded-2xl p-1">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl transition-all"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 font-bold text-[#3d2b1f] min-w-[40px] text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl transition-all"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <button 
              onClick={handleWhatsAppOrder}
              className="w-full bg-[#3d2b1f] text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#2a1d15] transition-all shadow-xl active:scale-[0.98]"
            >
              <ShoppingCart size={20} />
              Finalizar Pedido no WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}