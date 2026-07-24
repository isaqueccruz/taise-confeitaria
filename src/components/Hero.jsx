export default function Hero() {
  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundImage:
          "url('/bolos/WhatsApp Image 2026-03-28 at 19.54.53.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Luz */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

      <div className="relative z-20 max-w-7xl mx-auto min-h-screen flex items-center px-6 lg:px-16">

        <div className="backdrop-blur-md bg-black/25 border border-white/10 rounded-3xl p-8 lg:p-14 max-w-xl">

          <span className="uppercase tracking-[0.4em] text-[#D9E4B5] text-xs font-semibold">
            Feitos com Amor
          </span>

          <h1 className="mt-5 text-white font-serif text-5xl lg:text-7xl leading-none">
            Bolos
            <br />
            <span className="italic text-[#F4E5D0] font-light">
              Artesanais
            </span>
          </h1>

          <p className="mt-8 text-white/75 leading-8 text-lg">
            Delícias produzidas artesanalmente para transformar qualquer
            momento em uma lembrança doce.
          </p>

          <div className="mt-10">
            <a
              href="https://wa.me/5571988461789"
              className="inline-flex items-center gap-3 rounded-xl bg-[#7A8C53] hover:bg-[#687A42] transition px-8 py-4 text-white font-medium shadow-2xl"
            >
              Fazer Pedido

              <svg
                className="w-5 h-5 transition group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
