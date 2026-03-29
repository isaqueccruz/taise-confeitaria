import Image from 'next/image'
import { Instagram, Facebook, MessageCircle, MapPin, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#3d2b1f] to-[#5d3a2a] text-white pt-16 pb-10 px-6 lg:px-20 border-t border-white/5 shadow-inner">
      
      {/* Container Principal do Grid: Define o comportamento responsivo */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">

        {/* 1. Coluna do Perfil (Empilhada e centralizada no mobile) */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left group">
          <div className="relative w-28 h-28 mb-4">
            <Image 
              src="/images/taise-perfil.png" 
              alt="Taíse Sena - Confeiteira Chef"
              width={112} // w-28
              height={112} // h-28
              className="rounded-full object-cover border-2 border-white/10 shadow-2xl transition-all duration-300 group-hover:border-[#d4af37]"
            />
            {/* Opcional: Indicador de status verde */}
            <div className="absolute bottom-1 right-1 bg-[#7a8c53] w-4 h-4 rounded-full border-2 border-[#3d2b1f] animate-pulse"></div>
          </div>
          <h3 className="text-xl font-serif italic text-[#d4af37]">Taíse Sena</h3>
          <p className="text-xs text-white/60 mt-1 uppercase tracking-widest font-medium">Confeiteira Chef</p>
        </div>

        {/* 2. Coluna Sobre a Marca (Alinhamento responsivo) */}
        <div className="text-center lg:text-left">
          <h4 className="text-lg font-semibold mb-5 text-white/90 border-b border-white/10 pb-2 inline-block">
            Nossa História
          </h4>
          <p className="text-white/70 leading-relaxed text-sm max-w-sm mx-auto lg:mx-0">
            Bolos artesanais feitos com ingredientes selecionados e muito afeto, criados para transformar seus momentos em memórias inesquecíveis.
          </p>
        </div>

        {/* 3. Coluna de Contato (Ícones alinhados centralmente no mobile) */}
        <div className="text-center lg:text-left">
          <h4 className="text-lg font-semibold mb-5 text-white/90 border-b border-white/10 pb-2 inline-block">
            Fale Conosco
          </h4>
          <ul className="space-y-4 text-sm text-white/80 flex flex-col items-center lg:items-start">
            <li className="flex items-center gap-3">
              <MessageCircle size={18} className="text-[#7a8c53]" />
              71 98846-1789
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={18} className="text-[#7a8c53]" />
              Salvador - BA
            </li>
            <li className="flex items-center gap-3">
              <Clock size={18} className="text-[#7a8c53]" />
              Ter-Sáb: 09h às 18h
            </li>
          </ul>
          
          <div className="flex justify-center lg:justify-start mt-8">
            <a
              href="https://wa.me/5571988461789"
              target="_blank"
              rel="noopener noreferrer"
              className="w-4/5 lg:w-auto inline-flex items-center gap-2 justify-center bg-[#7a8c53] hover:bg-[#687a42] px-6 py-3 lg:py-2.5 rounded-full text-white text-sm lg:text-base font-medium transition-all hover:scale-105 shadow-lg group"
            >
              <MessageCircle size={16} className="group-hover:animate-bounce" />
              Pedir no WhatsApp
            </a>
          </div>
        </div>

        {/* 4. Coluna das Redes Sociais (Centralizada no mobile) */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <h4 className="text-lg font-semibold mb-5 text-white/90 border-b border-white/10 pb-2 inline-block">
            Acompanhe-nos
          </h4>
          <p className="text-sm text-white/60 mb-5">Veja nossas doçuras diárias:</p>
          <div className="flex gap-4">
            <a
              href="https://instagram.com/tay.guerra"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#E1306C] hover:border-transparent transition-all duration-300 group shadow-lg"
            >
              <Instagram size={20} className="group-hover:scale-110 transition-transform" />
            </a>
            <a
              href="https://facebook.com/tay.guerra"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#1877F2] hover:border-transparent transition-all duration-300 group shadow-lg"
            >
              <Facebook size={20} className="group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Linha inferior */}
      <div className="max-w-7xl mx-auto border-t border-white/10 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-5 text-xs text-white/40 italic text-center md:text-left px-4">
        <p>© 2026 Taíse Sena Confeitaria — Todos os direitos reservados</p>
        <p className="not-italic uppercase tracking-widest text-white/30 hidden md:block">Feito com açúcar e afeto</p>
      </div>
    </footer>
  )
}