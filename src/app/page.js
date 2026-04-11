import { supabase } from "@/lib/supabase"
import Header from "../components/Header"
import Hero from "../components/Hero"
import BestSellers from "../components/BestSellers"
import Menu from "../components/Menu"
import Testimonials from "../components/Testimonials"
import OrderCTA from "../components/OrderCTA"
import Footer from "../components/Footer"
import WhatsappButton from "../components/WhatsappButton" 

// 1. VOCÊ PRECISA DESTA FUNÇÃO AQUI EMBAIXO:
async function getBolos() {
  const { data } = await supabase
    .from("bolos")
    .select("*")
    .eq("disponivel", true)
    .order("id", { ascending: false })
  
  return data || []
}

// 2. O COMPONENTE HOME CHAMA A FUNÇÃO ACIMA:
export default async function Home() {
  const bolos = await getBolos() // Agora ele vai encontrar a função
  
  const destaques = bolos.filter(b => b.destaque === true)

  return (
    <div className="bg-[#FDF8F5]">
      <Header/>
      <Hero/>
      <BestSellers bolos={destaques} />
      <Menu bolos={bolos} />
      <Testimonials/>
      <OrderCTA/>
      <Footer/>
      <WhatsappButton/>
    </div>
  )
}