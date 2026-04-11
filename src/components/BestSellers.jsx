"use client"

import { useEffect, useState } from "react"
// IMPORTAÇÕES DO SWIPER
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation } from "swiper/modules"

// IMPORTAÇÕES DOS ESTILOS DO SWIPER
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

import CakeCard from "./CakeCard"
import ProductModal from "./ProductModal"

export default function BestSellers() {
  const [bolos, setBolos] = useState([])
  const [boloSelecionado, setBoloSelecionado] = useState(null)

  async function carregarBolos() {
    try {
      const res = await fetch("/api/bolos")
      const data = await res.json()
      
      // FILTRO: Pega apenas os marcados como destaque
      let destaques = data.filter(bolo => bolo.destaque === true)
      
      // Fallback: Se não houver destaques, pega os 3 últimos
      if (destaques.length === 0) {
        destaques = data.slice(0, 3)
      }

      // --- ESTRATÉGIA DE DUPLICAÇÃO ---
      // Se tivermos menos de 5 bolos (número seguro para o loop funcionar em todos os breakpoints),
      // nós duplicamos a lista para garantir o giro infinito.
      if (destaques.length > 0 && destaques.length < 5) {
        setBolos([...destaques, ...destaques, ...destaques]) // Triplicamos para garantir
      } else {
        setBolos(destaques)
      }

    } catch (error) {
      console.error("Erro ao carregar destaques:", error)
    }
  }

  useEffect(() => {
    carregarBolos()
  }, [])

  return (
    <section className="py-20 px-4 md:px-10 bg-[#F7E7E3]">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <span className="text-sm font-black uppercase tracking-widest text-[#A67C74] opacity-70">Os Mais Pedidos</span>
          <h2 className="text-4xl md:text-6xl font-black italic text-[#A67C74] tracking-tighter mt-2">
            Nossos Best Sellers
          </h2>
          <div className="w-24 h-1.5 bg-[#F3E5DC] mx-auto mt-5 rounded-full"></div>
        </header>

        {/* CONFIGURAÇÃO DO SWIPER (FORÇANDO O LOOP) */}
        <Swiper
          spaceBetween={30}
          slidesPerView={1} // Mobile
          loop={bolos.length > 1} // Ativa o loop se houver pelo menos 2 (já duplicados)
          centeredSlides={true}
          autoplay={{
            delay: 3000, // Passa mais rápido (3 segundos)
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true} // Setas ativadas
          modules={[Autoplay, Pagination, Navigation]}
          breakpoints={{
            // Tablet
            640: {
              slidesPerView: 2,
              centeredSlides: false,
            },
            // Desktop
            1024: {
              slidesPerView: 3,
              centeredSlides: false,
            },
          }}
          className="mySwiper pb-14"
        >
          {bolos.map((bolo, index) => (
            // Usamos index no key porque agora temos IDs duplicados na lista
            <SwiperSlide key={`${bolo.id}-${index}`} className="py-4">
              <CakeCard 
                bolo={bolo}
                onClick={setBoloSelecionado}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* MODAL */}
      {boloSelecionado && (
        <ProductModal 
          bolo={boloSelecionado}
          onClose={() => setBoloSelecionado(null)}
        />
      )}

      {/* ESTILIZAÇÃO DAS SETAS E PONTOS */}
      <style jsx global>{`
        .swiper-button-next, .swiper-button-prev {
          color: #A67C74 !important;
          scale: 0.6;
          background: rgba(255,255,255,0.9);
          padding: 25px;
          border-radius: 100%;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .swiper-pagination-bullet-active {
          background-color: #A67C74 !important;
        }
      `}</style>
    </section>
  )
}