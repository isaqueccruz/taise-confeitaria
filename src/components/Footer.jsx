import{Instagram, Facebook} from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-linear-to-r from-[#4a2d1f] to-[#7b4b32] text-white pt-16 pb-10 px-6 lg:px-20">

      <div className="grid md:grid-cols-3 gap-10">

        {/* Marca */}
        <div>
          <h3 className="text-2xl font-serif italic">
            Taíse Sena Confeitaria
          </h3>

          <p className="mt-4 text-white/80 leading-relaxed">
            Bolos artesanais feitos com amor para tornar seus momentos mais doces e inesquecíveis.
          </p>
        </div>

        {/* Contato */}
        <div>
          <h4 className="text-lg font-semibold mb-4">
            Contato: 71 98846-1789
          </h4>

          <p className="text-white/80">
            Salvador - BA
          </p>

          <a
            href="https://wa.me/5571988461789"
            className="inline-block mt-4 bg-[#7a8c53] hover:bg-[#687a42] px-6 py-3 rounded-full text-white font-medium transition"
          >
            Falar no WhatsApp
          </a>
        </div>

        {/* Redes */}
        <div>
  <h4 className="text-lg font-semibold mb-4">
    Redes Sociais
  </h4>

  <div className="flex gap-4">

    {/* Instagram */}
    <a
      href="https://instagram.com/tay.guerra"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-[#E1306C] transition-all duration-300 shadow-md hover:scale-110"
    >
      <Instagram className="text-white group-hover:text-white transition" size={20} />
    </a>

             {/* Facebook */}
    <a
      href="https://facebook.com/tay.guerra"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-[#1877F2] transition-all duration-300 shadow-md hover:scale-110"
    >
      <Facebook className="text-white group-hover:text-white transition" size={20} />
    </a>

  </div>
</div>
      </div>

      {/* Linha inferior */}
      <div className="border-t border-white/20 mt-12 pt-6 text-center text-sm text-white/70">
        © 2026 Taíse Sena Confeitaria — Todos os direitos reservados
      </div>

    </footer>
  )
}