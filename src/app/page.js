import { supabase } from "@/lib/supabase";

import Header from "../components/Header";
import Hero from "../components/Hero";
import BestSellers from "../components/BestSellers";
import Menu from "../components/Menu";
import Testimonials from "../components/Testimonials";
import OrderCTA from "../components/OrderCTA";
import Footer from "../components/Footer";
import WhatsappButton from "../components/WhatsappButton";

const carregarCardapio = async () => {
  try {
    const { data, error } = await supabase
      .from("bolos")
      .select("*")
      .eq("disponivel", true)
      .order("id", { ascending: false });

    if (error) {
      throw error;
    }

    return data ?? [];
  } catch (error) {
    console.error("Erro ao carregar os produtos:", error);
    return [];
  }
};

const separarDestaques = (produtos) =>
  produtos.filter((produto) => produto.destaque);

export default async function Home() {
  const produtos = await carregarCardapio();
  const produtosEmDestaque = separarDestaques(produtos);

  return (
    <main className="min-h-screen bg-[#FDF8F5]">
      <Header />

      <Hero />

      <BestSellers
        bolos={produtosEmDestaque}
      />

      <Menu
        bolos={produtos}
      />

      <Testimonials />

      <OrderCTA />

      <Footer />

      <WhatsappButton />
    </main>
  );
}
