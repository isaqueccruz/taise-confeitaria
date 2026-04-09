"use client"

import { useState, useEffect } from "react"

// Ícones simples em SVG
const IconUsers = () => (
  <svg className="w-6 h-6 text-rose-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
)

const IconBag = () => (
  <svg className="w-6 h-6 text-rose-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
)

const IconLeaf = () => (
  <svg className="w-5 h-5 text-rose-400 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
)

const IconWhatsapp = () => (
  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.56 5.333-11.891 11.894-11.891 3.181 0 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.481 8.403 0 6.561-5.333 11.892-11.893 11.892-1.99 0-3.951-.5-5.688-1.448l-6.306 1.666zm6.29-4.143c1.589.943 3.163 1.44 4.77 1.44 5.4 0 9.794-4.396 9.794-9.797 0-2.617-1.019-5.079-2.868-6.929-1.85-1.85-4.311-2.87-6.926-2.87-5.4 0-9.794 4.395-9.794 9.797 0 2.153.68 3.82 1.83 5.432l-1.104 4.035 4.302-1.133zM16.518 16.99c-.27.27-.649.434-1.014.434-.11 0-.21-.01-.33-.03-1.07-.22-2.17-.79-3.13-1.52-.96-.73-1.78-1.63-2.43-2.63-.65-1-1.11-2.1-1.25-3.17-.07-.57.1-.96.47-1.33l.97-.97c.18-.18.43-.27.69-.27a.93.93 0 01.69.27l1.45 1.45c.18.18.27.43.27.69s-.09.51-.27.69l-.51.51c-.18.18-.27.43-.27.69s.09.51.27.69l3.3 3.3c.18.18.43.27.69.27s.51-.09.69-.27l.51-.51c.18-.18.43-.27.69-.27s.51.09.69.27l1.45 1.45c.18.18.27.43.27.69s-.09.51-.27.69l-.97.97z" />
  </svg>
)

export default function ProductModal({ bolo, onClose }) {

  // Trava scroll do fundo ao abrir o modal
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => (document.body.style.overflow = "auto")
  }, [])

  // Configuração da mensagem do WhatsApp
  const mensagem = `Olá Taise! Gostaria de fazer uma encomenda do bolo:
*${bolo.nome}*
Valor: R$ ${parseFloat(bolo.preco).toFixed(2).replace('.', ',')}`

  // Formatação de preço para exibição
  const precoFormatado = parseFloat(bolo.preco).toFixed(2).replace('.', ',')

  return (
    <div 
      className="fixed inset-0 bg-[#FDF8F5] z-50 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl mx-auto bg-white min-h-screen shadow-xl"
        onClick={(e) => e.stopPropagation()} 
      >
        
        {/* BOTÃO VOLTAR */}
        <div className="p-4 pt-6">
          <button 
            onClick={onClose}
            className="flex items-center text-[#826A61] hover:text-[#5D4B44] transition group font-bold"
          >
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar ao Catálogo
          </button>
        </div>

        {/* IMAGEM DO BOLO */}
        <div className="px-4 md:px-8 pb-6">
          <img
            src={bolo.imagem || "https://via.placeholder.com/600x400?text=Bolo+Taise+Sena"}
            alt={bolo.nome}
            className="w-full h-72 md:h-96 object-cover rounded-3xl shadow-lg border border-[#F3E5DC]"
          />
        </div>

        {/* CONTEÚDO */}
        <div className="px-6 md:px-10 pb-10 space-y-8 text-[#5D4B44]">
          
          {/* TÍTULO E PREÇO */}
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-[#3E2723] leading-tight italic">
              {bolo.nome}
            </h1>
            <p className="text-3xl font-black text-[#A67C74]">
              R$ {precoFormatado}
            </p>
          </div>

          {/* DESCRIÇÃO DINÂMICA */}
          <div className="space-y-3">
            <h2 className="text-xs uppercase tracking-widest font-black text-[#826A61]">
              Descrição
            </h2>
            <p className="text-[#6D5D55] leading-relaxed font-light italic">
              {bolo.descricao || "Um clássico da nossa confeitaria, preparado com ingredientes selecionados e muito carinho para adoçar o seu momento."}
            </p>
          </div>

          {/* CARTÕES DE INFORMAÇÃO (PORÇÕES E DISPONIBILIDADE) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Porções */}
            <div className="bg-[#FAF3F0] p-5 rounded-2xl flex items-center gap-4 border border-[#F3E5DC]">
              <div className="bg-white p-2 rounded-xl shadow-sm"><IconUsers /></div>
              <div>
                <p className="text-[10px] uppercase font-black text-[#826A61]">Porções</p>
                <p className="text-lg font-bold text-[#5D4B44]">
                  {bolo.porcoes || "Sob consulta"}
                </p>
              </div>
            </div>
            
            {/* Disponibilidade */}
            <div className="bg-[#FAF3F0] p-5 rounded-2xl flex items-center gap-4 border border-[#F3E5DC]">
              <div className="bg-white p-2 rounded-xl shadow-sm"><IconBag /></div>
              <div>
                <p className="text-[10px] uppercase font-black text-[#826A61]">Status</p>
                <p className={`text-lg font-bold ${bolo.disponivel ? 'text-green-600' : 'text-amber-600'}`}>
                  {bolo.disponivel ? 'Disponível' : 'Sob Encomenda'}
                </p>
              </div>
            </div>
          </div>

          {/* INGREDIENTES DINÂMICOS */}
          <div className="space-y-3 border-t border-[#F3E5DC] pt-8">
            <h2 className="text-sm uppercase tracking-widest font-black text-[#3E2723] flex items-center">
              <IconLeaf />
              Composição
            </h2>
            <p className="text-[#6D5D55] leading-relaxed">
              {bolo.ingredientes || "Massa artesanal fofinha e recheios autorais Taise Sena Confeitaria."}
            </p>
          </div>

          {/* AVISO DE ENCOMENDA */}
          <div className="bg-[#FFF8E1] border border-[#FFE082] text-[#856404] p-4 rounded-2xl flex gap-3 items-start text-sm shadow-sm">
            <span className="text-xl">🎂</span>
            <p className="font-medium">
              Nossos bolos são artesanais! Para garantir a melhor qualidade, realize sua encomenda com antecedência mínima de 48 horas.
            </p>
          </div>

          {/* BOTÕES DE AÇÃO */}
          <div className="space-y-4 pt-4">
            <a
              href={`https://wa.me/5571988461789?text=${encodeURIComponent(mensagem)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full py-5 px-6 flex items-center justify-center font-black text-lg shadow-lg shadow-green-100 transition-all active:scale-[0.98]"
            >
              <IconWhatsapp />
              PEDIR PELO WHATSAPP
            </a>

            <button 
              onClick={onClose}
              className="w-full bg-white border-2 border-[#A67C74] text-[#A67C74] hover:bg-[#FAF3F0] rounded-full py-5 px-6 font-black text-lg transition-all"
            >
              CONTINUAR VENDO
            </button>
          </div>

        </div>

        <div className="h-10"></div>
      </div>
    </div>
  )
}