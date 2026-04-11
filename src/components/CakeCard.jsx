export default function CakeCard({ bolo, onClick }) {
  return (
    <div 
      onClick={() => onClick && onClick(bolo)}
      className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer border border-[#F3E5DC] relative"
    >
      {/* Container da Imagem com Zoom no Hover */}
      <div className="relative overflow-hidden h-64">
        <img
          src={bolo.imagem}
          alt={bolo.nome}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Badge discreta de Best Seller (Opcional) */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-tighter text-[#A67C74]">
            Mais Pedido
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col items-center text-center">
        {/* Avaliação Mockada para Prova Social */}
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-yellow-400 text-xs">★</span>
          ))}
          <span className="text-[10px] text-gray-400 ml-1 font-medium">(125)</span>
        </div>

        <h3 className="font-serif text-xl text-[#5C4033] mb-1 group-hover:text-[#A67C74] transition-colors">
          {bolo.nome}
        </h3>

        <p className="text-[#A67C74] font-bold text-lg">
          R$ {bolo.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </p>
        
        {/* Descrição curta (se existir no seu objeto bolo) */}
        {bolo.descricao && (
          <p className="text-gray-400 text-xs mt-2 line-clamp-1 italic">
            {bolo.descricao}
          </p>
        )}

        {/* Botão Estilizado - Corrigindo o Verde para o Marrom da Marca */}
        <button
          className="mt-6 w-full bg-[#5C4033] text-white py-3 rounded-xl text-xs uppercase font-bold tracking-[0.2em] transition-all duration-300 hover:bg-[#3E2B22] hover:shadow-lg active:scale-95"
        >
          Explorar Opções
        </button>
      </div>
    </div>
  )
            }
