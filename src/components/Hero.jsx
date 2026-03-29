export default function Hero() {
  return (
    <section 
      className="relative min-h-screen flex items-center overflow-hidden bg-[#4a2d1f]"
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
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent lg:block hidden z-10"></div>
      
      {/* No Mobile: Transição do Topo (Preto/Marrom) para Transparente no Baixo */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent lg:hidden block z-10"></div>

      {/* CONTAINER DO CONTEÚDO (Centralizado e Flutuando sobre a Foto) */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 w-full flex justify-center lg:justify-start items-center relative z-20">
        
        {/* TEXTO (Centralizado no Mobile, Esquerda no Desktop) */}
        <div className="space-y-6 py-20 max-w-xl text-center lg:text-left">
          
         

          <div className="space-y-6">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif italic leading-tight text-white drop-shadow-lg">
              Bolos Artesanais <br />
              <span className="font-normal text-white/90">Feitos com Amor</span>
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-lg mx-auto lg:mx-0 drop-shadow-sm">
              Delícias feitas com carinho para adoçar seu dia!
            </p>

            <div className="pt-6">
              <a
                href="https://wa.me/5571988461789"
                className="inline-block bg-[#7a8c53] hover:bg-[#687a42] text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg font-bold transition-all shadow-2xl hover:scale-105 active:scale-95"
              >
                Fazer Pedido
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* BASE CURVA BRANCA (Ajustada para o novo design imersivo) */}
      <div className="absolute bottom-0 w-full h-16 md:h-24 bg-white rounded-t-[50px] md:rounded-t-[100px] z-30"></div>
    </section>
  )
}