"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled || menuOpen ? "bg-[#3d2b1f] shadow-xl" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4 md:py-5">
        
        {/* Logo */}
        <div className="flex flex-col leading-none">
          <h1 className="font-serif italic text-xl md:text-2xl text-white">
            Taíse Sena
          </h1>
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-[#d4af37] mt-1">
            Confeitaria
          </span>
        </div>

        {/* Menu Desktop - Adicionado Depoimentos e Contato */}
        <nav className="hidden lg:flex gap-8 items-center text-[13px] uppercase tracking-widest font-medium text-white">
          <a href="#" className="hover:text-[#d4af37] transition-colors">Início</a>
          <a href="#cardapio" className="hover:text-[#d4af37] transition-colors">Cardápio</a>
          <a href="#depoimentos" className="hover:text-[#d4af37] transition-colors">Depoimentos</a>
          <a href="#contato" className="hover:text-[#d4af37] transition-colors">Contato</a>
          <a 
            href="https://wa.me/5571988461789" 
            className="bg-[#7a8c53] px-5 py-2 rounded-full font-bold hover:bg-[#687a42] transition-all"
          >
            Pedir Agora
          </a>
        </nav>

        {/* Botão Mobile */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-white focus:outline-none">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu Mobile Dropdown - Adicionado Depoimentos e Contato */}
      <div className={`absolute top-full left-0 w-full bg-[#3d2b1f] border-t border-white/10 transition-all duration-300 overflow-hidden ${
        menuOpen ? "max-h-[500px] opacity-100 visible" : "max-h-0 opacity-0 invisible"
      }`}>
        <nav className="flex flex-col items-center py-8 gap-6">
          <a href="#" onClick={() => setMenuOpen(false)} className="text-white uppercase tracking-widest text-sm">Início</a>
          <a href="#cardapio" onClick={() => setMenuOpen(false)} className="text-white uppercase tracking-widest text-sm">Cardápio</a>
          <a href="#depoimentos" onClick={() => setMenuOpen(false)} className="text-white uppercase tracking-widest text-sm">Depoimentos</a>
          <a href="#contato" onClick={() => setMenuOpen(false)} className="text-white uppercase tracking-widest text-sm">Contato</a>
          <a 
            href="https://wa.me/5571988461789" 
            onClick={() => setMenuOpen(false)} 
            className="bg-[#7a8c53] w-[80%] py-4 rounded-xl text-center font-bold text-white shadow-lg"
          >
            Fazer Pedido
          </a>
        </nav>
      </div>
    </header>
  )
}