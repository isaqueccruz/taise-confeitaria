"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Login(){

const router = useRouter()

const [email,setEmail] = useState("")
const [senha,setSenha] = useState("")

const entrar = (e)=>{

e.preventDefault()

if(email === "admin@taise.com" && senha === "123456"){

localStorage.setItem("adminLogado","true") // 🔐 SALVA LOGIN

router.push("/admin/dashboard")

}else{

alert("Login inválido")

}

}

return(

<div className="flex items-center justify-center min-h-screen bg-gray-100">

<form
onSubmit={entrar}
className="bg-white p-10 rounded-xl shadow-lg w-96"
>

<h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
Login Admin
</h2>

<input
type="email"
placeholder="Email"
className="w-full border p-3 rounded-lg mb-4 text-black placeholder-gray-500"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Senha"
className="w-full border p-3 rounded-lg mb-6 text-black placeholder-gray-500"
onChange={(e)=>setSenha(e.target.value)}
/>

<button
className="w-full bg-[#8B4513] text-white py-3 rounded-lg"
>

Entrar

</button>

</form>

</div>

)

}