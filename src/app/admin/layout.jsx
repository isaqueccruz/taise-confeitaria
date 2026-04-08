"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

export default function AdminLayout({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (pathname === "/admin/login") return
    const logado = localStorage.getItem("adminLogado")
    if (!logado) {
      router.push("/admin/login")
    }
  }, [pathname])

  // Fecha o menu mobile ao trocar de página
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  if (pathname === "/admin/login") return <>{children}</>

  return (
    <div className="flex min-h-screen bg-[#FDF8F5]">
      
      {/* BOTÃO HAMBÚRGUER (Aparece apenas no Mobile) */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden fixed top-4 right-4 z-[60] bg-[#5A2D0C] text-white p-3 rounded-xl shadow-lg"
      >
        {isMenuOpen ? "✕" : "☰"}
      </button>

      {/* SIDEBAR RESPONSIVA */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#5A2D0C] text-white p-6 transform transition-transform duration-300 ease-in-out
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:block
      `}>
        <h2 className="text-xl font-black italic mb-8 border-b border-white/10 pb-4 text-rose-100">
          Painel Admin
        </h2>

        <nav className="flex flex-col gap-2">
          <Link 
            href="/admin/dashboard" 
            className={`p-3 rounded-xl transition ${pathname === "/admin/dashboard" ? "bg-white/20 font-bold" : "hover:bg-white/10"}`}
          >
            📊 Dashboard
          </Link>
          <Link 
            href="/admin/bolos" 
            className={`p-3 rounded-xl transition ${pathname === "/admin/bolos" ? "bg-white/20 font-bold" : "hover:bg-white/10"}`}
          >
            🎂 Bolos
          </Link>
          <Link 
            href="/admin/pedidos" 
            className={`p-3 rounded-xl transition ${pathname === "/admin/pedidos" ? "bg-white/20 font-bold" : "hover:bg-white/10"}`}
          >
            🛍️ Pedidos
          </Link>

          <button
            onClick={() => {
              localStorage.removeItem("adminLogado")
              router.push("/admin/login")
            }}
            className="text-left p-3 mt-10 text-rose-300 font-bold hover:bg-red-500/10 rounded-xl transition"
          >
            🚪 Sair
          </button>
        </nav>
      </aside>

      {/* OVERLAY (Escurece o fundo quando o menu abre no mobile) */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 w-full min-w-0 bg-[#FDF8F5] p-4 md:p-10 overflow-x-hidden">
        {children}
      </main>

    </div>
  )
}