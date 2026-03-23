"use client"

import { useState } from "react"
import { Menu } from "lucide-react"

<Menu size={28} />

export default function Header() {

  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-[#8B3A1A] text-white sticky top-0 z-50 shadow-lg">

      <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">

        <h1 className="font-bold text-lg sm:text-xl">
          Taíse Sena Confeitaria
        </h1>

        {/* BOTÃO MOBILE */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-2xl"
        >
          ☰
        </button>

        {/* MENU DESKTOP */}
        <nav className="hidden lg:flex gap-6 items-center text-sm">

          <a href="#">Início</a>
          <a href="#cardapio">Cardápio</a>
          <a href="#depoimentos">Depoimentos</a>
          <a href="#contato">Contato</a>

          <a
            href="https://wa.me/5571982210229"
            className="bg-green-500 px-4 py-2 rounded-lg font-semibold hover:scale-105 transition"
          >
            WhatsApp
          </a>

        </nav>

      </div>

      {/* MENU MOBILE */}
      {menuOpen && (
        <div className="lg:hidden bg-[#8B3A1A] px-6 pb-6 flex flex-col gap-4 text-sm">

          <a href="#" onClick={() => setMenuOpen(false)}>
            Início
          </a>

          <a href="#cardapio" onClick={() => setMenuOpen(false)}>
            Cardápio
          </a>

          <a href="#depoimentos" onClick={() => setMenuOpen(false)}>
            Depoimentos
          </a>

          <a href="#contato" onClick={() => setMenuOpen(false)}>
            Contato
          </a>

          <a
            href="https://wa.me/5571982210229"
            className="bg-green-500 px-4 py-3 rounded-lg text-center font-semibold"
          >
            Fazer Pedido no WhatsApp
          </a>

        </div>
      )}

    </header>
  )
}