export default function Hero() {
  return (
    <section
      className="relative min-h-screen overflow-hidden bg-[#241812]"
      style={{
        backgroundImage:
          "url('/bolos/WhatsApp Image 2026-03-28 at 19.54.53.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Gradiente */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/10" />

      {/* Luz */}
      <div className="absolute -top-44 left-1/2 h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-amber-200/10 blur-[180px]" />

      <div className="relative z-20 mx-auto flex min-h-screen max-w-7xl items-center px-6 lg:px-16">

        <div className="max-w-xl">

          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-5 py-2 backdrop-blur-xl">

            <div className="h-2 w-2 rounded-full bg-[#A5C06B]" />

            <span className="text-xs font-medium uppercase tracking-[0.35em] text-[#DDE7C6]">
              Feitos diariamente
            </span>

          </div>

          {/* Título */}

          <h1 className="font-serif text-6xl leading-none text-white sm:text-7xl lg:text-8xl">

            Bolos

            <span className="mt-2 block font-light italic text-[#F6E6CF]">
              Artesanais
            </span>

          </h1>

          {/* Linha */}

          <div className="mt-8 h-px w-28 bg-[#A5C06B]" />

          {/* Texto */}

          <p className="mt-8 max-w-lg text-lg leading-9 text-white/80">
            Delícias preparadas artesanalmente com ingredientes selecionados
            para transformar qualquer ocasião em um momento inesquecível.
          </p>

          {/* CTA */}

          <div className="mt-12 flex flex-wrap gap-5">

            <a
              href="https://wa.me/5571988461789"
              className="group inline-flex items-center gap-4 rounded-2xl bg-[#7A8C53] px-8 py-5 text-sm font-semibold uppercase tracking-widest text-white shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-[#687A42]"
            >
              Fazer Pedido

              <svg
                className="h-5 w-5 transition duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M5 12h14M13 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

            </a>

          </div>

        </div>

      </div>

      {/* Gradiente inferior */}
      <div className="absolute bottom-0 left-0 h-44 w-full bg-gradient-to-t from-[#faf8f5] to-transparent" />

    </section>
  );
}
