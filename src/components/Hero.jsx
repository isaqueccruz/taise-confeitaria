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
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20 lg:block hidden z-10 backdrop-blur-[1px]"></div>
      
      {/* No Mobile: Transição do Topo (Preto/Marrom) para Transparente no Baixo */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/60 to-black/30 lg:hidden block z-10 backdrop-blur-[1px]"></div>

      {/* CONTAINER DO CONTEÚDO (Centralizado e Flutuando sobre a Foto) */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 w-full flex justify-center lg:justify-start items-center relative z-20 pt-12 pb-28 md:pb-36">
        
        {/* TEXTO (Centralizado no Mobile, Esquerda no Desktop) */}
        <div className="space-y-6 py-12 lg:py-20 max-w-2xl text-center lg:text-left">
          
          <div className="space-y-6">
            {/* Tag Badge Decorativa de Alta Costura */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs sm:text-sm font-medium tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-[#7a8c53] animate-pulse" />
              Sabor Caseiro & Elegância
            </div>

            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif italic leading-[1.08] text-white tracking-tight drop-shadow-md">
              Bolos Artesanais <br />
              <span className="font-normal text-amber-100/90 not-italic block mt-2 text-3xl sm:text-5xl lg:text-6xl">
                Feitos com Amor
              </span>
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-white/85 max-w-lg mx-auto lg:mx-0 font-light leading-relaxed drop-shadow">
              Delícias feitas com carinho para adoçar seu dia!
            </p>

            <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="https://wa.me/5571988461789"
                className="group relative inline-flex items-center justify-center bg-[#7a8c53] hover:bg-[#687a42] text-white px-9 py-4 sm:py-4.5 rounded-full text-base sm:text-lg font-semibold tracking-wide transition-all duration-300 shadow-xl hover:shadow-[#7a8c53]/40 hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#7a8c53] focus:ring-offset-2 focus:ring-offset-black/50 overflow-hidden"
              >
                {/* Efeito Glow no Hover do Botão */}
                <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                
                <span className="relative z-10 flex items-center gap-2">
                  Fazer Pedido
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* BASE CURVA BRANCA (Ajustada para o novo design imersivo) */}
      <div className="absolute bottom-0 w-full h-16 md:h-24 bg-white rounded-t-[50px] md:rounded-t-[100px] z-30 shadow-[0_-10px_25px_rgba(0,0,0,0.1)]"></div>
    </section>
  )
}
