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
      {/* No Desktop: Transição da Esquerda (Preto/Marrom) para Transparente na Direita */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent lg:block hidden z-10" />
      
      {/* No Mobile: Transição do Topo (Preto/Marrom) para Transparente no Baixo */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/45 to-transparent lg:hidden block z-10" />

      {/* CONTAINER DO CONTEÚDO (Centralizado e Flutuando sobre a Foto) */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 w-full flex justify-center lg:justify-start items-center relative z-20">
        
        {/* TEXTO (Centralizado no Mobile, Esquerda no Desktop) */}
        <div className="space-y-6 py-20 max-w-xl text-center lg:text-left">
          
          <div className="space-y-6">
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif tracking-tight leading-[0.95] text-white drop-shadow-md">
              Bolos <br />
              <span className="italic font-normal text-white/90">Artesanais</span>
              <span className="block text-2xl sm:text-3xl md:text-4xl font-sans font-light tracking-widest uppercase mt-4 text-white/80">
                Feitos com Amor
              </span>
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-md mx-auto lg:mx-0 font-light leading-relaxed">
              Delícias feitas com carinho para adoçar seu dia!
            </p>

            <div className="pt-6">
              <a
                href="https://wa.me/5571988461789"
                className="inline-flex items-center justify-center bg-[#7a8c53] hover:bg-[#637341] text-white px-9 py-4 rounded-full text-base sm:text-lg font-medium tracking-wide transition-all duration-300 shadow-xl hover:shadow-[#7a8c53]/25 hover:-translate-y-1 active:translate-y-0 active:scale-95"
              >
                Fazer Pedido
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* BASE CURVA BRANCA (Ajustada para o novo design imersivo) */}
      <div className="absolute bottom-0 w-full h-16 md:h-24 bg-white rounded-t-[50px] md:rounded-t-[100px] z-30" />
    </section>
  )
}
