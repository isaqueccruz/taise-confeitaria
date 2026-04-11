import { supabase } from "@/lib/supabase"
import Header from "../components/Header"
import Hero from "../components/Hero"
import BestSellers from "../components/BestSellers"
import Menu from "../components/Menu"
import Testimonials from "../components/Testimonials"
import OrderCTA from "../components/OrderCTA"
import Footer from "../components/Footer"
import WhatsappButton from "../components/WhatsappButton" 

// Esta função roda no servidor e busca os dados em tempo real
async function getBolos() {
  const { data } = await supabase
    .from("bolos")
    .select("*")
    .eq("disponivel", true) // Só mostra o que pode ser vendido
    .order("id", { ascending: false })
  
  return data || []
}

export default async function Home() {
  const bolos = await getBolos()
  
  // Filtramos os destaques para os BestSellers
  const destaques = bolos.filter(b => b.destaque === true)

  return (
    <div className="bg-[#FDF8F5]">
      <Header/>
      <Hero/>
      
      {/* Passamos os bolos filtrados como PROPS */}
      <BestSellers bolos={destaque} />
      
      <Menu bolos={bolos} />
      
      <Testimonials/>
      <OrderCTA/>
      <Footer/>
      <WhatsappButton/>
    </div>
  )
}