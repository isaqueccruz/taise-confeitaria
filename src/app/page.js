export default async function Home() {
  const bolos = await getBolos();
  
  // Criamos a variável no PLURAL: destaques
  const destaques = bolos.filter(b => b.destaque === true);

  return (
    <div className="bg-[#FDF8F5]">
      <Header/>
      <Hero/>
      
      {/* Aqui estava o erro. Agora corrigido para 'destaques' */}
      <BestSellers bolos={destaques} />
      
      <Menu bolos={bolos} />
      
      <Testimonials/>
      <OrderCTA/>
      <Footer/>
      <WhatsappButton/>
    </div>
  )
}