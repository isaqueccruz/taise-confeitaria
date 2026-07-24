export default function Hero() {
  return (
    <section 
      className="relative min-h-screen flex items-center overflow-hidden bg-[#4a2d1f] selection:bg-[#7a8c53] selection:text-white"
      // 🔥 A MÁGICA ESTÁ AQUI: A IMAGEM COMO FUNDO COMPLETO 🔥
      style={{ 
        backgroundImage: `url('/bolos/WhatsApp Image 2026-03-28 at 19.54.53.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* 🖤 OVERLAY DE GRADIENTE: Essencial para garantir contraste e leitura 🖤 */}
      {/* No Desktop: Gradiente escuro com tom quente ultra-suave na esquerda */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent lg:block hidden z-10" />
      
      {/* No Mobile: Gradiente escuro do topo para baixo */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/55 to-transparent lg:hidden block z-10" />

      {/* CONTAINER DO CONTEÚDO (Centralizado e Flutuando sobre a Foto) */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 w-full flex justify-center lg:justify-start items-center relative z-20 pt-10 pb-24">
        
        {/* TEXTO (Centralizado no Mobile, Esquerda no Desktop) */}
        <div className="space-y-6 py-16 max-w-xl text-center lg:text-left">
          
          <div className="space-y-8">
            
            {/* Título Principal Reestruturado */}
            <h2 className="text-white tracking-tight">
              <span className="block text-xs sm:text-sm uppercase tracking-[0.35em] text-[#c2d1a2] font-semibold mb-3">
                Feitos com Amor
              </span>
              
              <span className="block font-serif text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.05] drop-shadow-md">
                Bolos <br className="hidden sm:inline" />
                <span className="italic font-serif text-amber-100/90 font-light">Artesanais</span>
              </span>
            </h2>
            
            {/* Subtítulo Clean */}
            <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-md mx-auto lg:mx-0 font-light leading-relaxed tracking-wide">
              Delícias feitas com carinho para adoçar seu dia!
            </p>

            {/* Ação / CTA Moderno */}
            <div className="pt-2">
              <a
                href="https://wa.me/5571988461789"
                className="group inline-flex items-center justify-center gap-3 bg-[#7a8c53] hover:bg-[#687a42] text-white px-8 sm:px-10 py-4 rounded-full text-sm sm:text-base font-medium tracking-wider uppercase transition-all duration-300 shadow-xl hover:shadow-[#7a8c53]/30 hover:-translate-y-1 active:translate-y-0 active:scale-95"
              >
                <span>Fazer Pedido</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white group-hover:scale-150 transition-transform duration-300" />
              </a>
            </div>

          </div>

        </div>

      </div>

      {/* BASE CURVA BRANCA (Transição fluida para a próxima seção) */}
      <div className="absolute bottom-0 w-full h-12 md:h-20 bg-white rounded-t-[40px] md:rounded-t-[80px] z-30" />
    </section>
  )
}
