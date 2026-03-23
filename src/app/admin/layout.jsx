"use client"

import Link from "next/link"
import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

export default function AdminLayout({ children }) {

const router = useRouter()
const pathname = usePathname()

useEffect(()=>{

// libera login
if(pathname === "/admin/login") return

const logado = localStorage.getItem("adminLogado")

if(!logado){
router.push("/admin/login")
}

},[pathname])

return (

<div className="flex min-h-screen">

<aside className="w-64 bg-[#5A2D0C] text-white p-6">

<h2 className="text-xl font-bold mb-8">
Painel Admin
</h2>

<nav className="flex flex-col gap-4">

<Link href="/admin/dashboard">Dashboard</Link>
<Link href="/admin/bolos">Bolos</Link>
<Link href="/admin/pedidos">Pedidos</Link>

<button
onClick={()=>{
localStorage.removeItem("adminLogado")
router.push("/admin/login")
}}
className="text-left"
>
Sair
</button>

</nav>

</aside>

<main className="flex-1 bg-gray-100 p-10">
{children}
</main>

</div>

)

}