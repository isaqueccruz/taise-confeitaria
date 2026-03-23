import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative min-h-[650px] flex items-center overflow-hidden bg-[#4a2d1f]">

      {/* 🔥 Luz (ajustada pro mobile) */}
      <div className="absolute right-0 top-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[#7b4b32] rounded-full blur-[120px] opacity-60"></div>

      {/* 🔥 Base curva (mais segura) */}
      <div className="absolute bottom-0 w-full h-24 bg-[#f8e1e7] rounded-t-[100px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 items-center relative z-10">
        
        {/* TEXTO */}
        <div className="space-y-6 py-12 max-w-xl text-center lg:text-left">
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif italic leading-tight text-white">
            Bolos Artesanais <br />
            <span className="font-normal">Feitos com Amor</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-white/90">
            Delícias feitas com carinho para adoçar seu dia!
          </p>

          <div className="pt-4">
            <a
              href="https://wa.me/5571999999999"
              className="inline-block bg-[#7a8c53] hover:bg-[#687a42] text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium transition-all shadow-xl hover:scale-105"
            >
              Fazer Pedido
            </a>
          </div>

        </div>

        {/* IMAGEM */}
        <div className="relative flex justify-center lg:justify-end">
          
          <div className="relative w-full max-w-[320px] sm:max-w-[400px] md:max-w-[550px] h-[300px] sm:h-[400px] md:h-[550px]">

            {/* sombra */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200px] sm:w-[300px] h-[40px] sm:h-[60px] bg-black/40 blur-2xl rounded-full"></div>

            <Image
              src="/bolos/hero-bolo-v2.png"
              alt="Bolo de Chocolate"
              fill
              className="object-contain drop-shadow-[0_50px_80px_rgba(0,0,0,0.6)]"
              priority
            />
          </div>

        </div>

      </div>
    </section>
  )
}