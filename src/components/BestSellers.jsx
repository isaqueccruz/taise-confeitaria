"use client"

import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"

import "swiper/css"
import "swiper/css/pagination"

import CakeCard from "./CakeCard"
import ProductModal from "./ProductModal"

export default function BestSellers() {
  const [bolos, setBolos] = useState([])
  const [boloSelecionado, setBoloSelecionado] = useState(null)

  async function carregarBolos() {
    try {
      const res = await fetch("/api/bolos")
      const data = await res.json()
      let destaques = data.filter(bolo => bolo.destaque === true)
      
      if (destaques.length === 0) destaques = data.slice(0, 3)

      if (destaques.length > 0 && destaques.length < 5) {
        setBolos([...destaques, ...destaques, ...destaques])
      } else {
        setBolos(destaques)
      }
    } catch (error) {
      console.error("Erro ao carregar os destaques:", error)
    }
  }

  useEffect(() => {
    carregarBolos()
  }, [])

  return (
    <section className="py-24 px-4 md:px-10 bg-[#FAF3F0]"> {/* Fundo levemente mais claro e elegante */}
      <div className="max-w-7xl mx-auto">
        
        <header className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#A67C74] opacity-80 mb-3 block">
            Destaques da Semana
          </span>
          <h2 className="text-4xl md:text-5xl font-serif italic text-[#5C4033] tracking-tight">
            Nossos Best Sellers
          </h2>
          {/* Divisor mais sutil */}
          <div className="w-16 h-[2px] bg-[#D7CCC8] mx-auto mt-6"></div>
        </header>

        <Swiper
          spaceBetween={40}
          slidesPerView={1}
          loop={bolos.length > 1}
          centeredSlides={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[Autoplay, Pagination]}
          breakpoints={{
            640: { slidesPerView: 2, centeredSlides: false },
            1024: { slidesPerView: 3, centeredSlides: false },
          }}
          className="mySwiper !pb-20"
        >
          {bolos.map((bolo, index) => (
            <SwiperSlide key={`${bolo.id}-${index}`} className="py-6">
              <div className="transition-transform duration-300 hover:scale-[1.02]">
                <CakeCard 
                  bolo={bolo}
                  onClick={setBoloSelecionado}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {boloSelecionado && (
        <ProductModal 
          bolo={boloSelecionado}
          onClose={() => setBoloSelecionado(null)}
        />
      )}

      {/* Estilos Globais Customizados */}
      <style jsx global>{`
        /* Cor de fundo dos bullets inativos */
        .swiper-pagination-bullet {
          background: #A67C74 !important;
          opacity: 0.3;
          width: 8px;
          height: 8px;
          transition: all 0.3s ease;
        }
        /* Estilo do bullet ativo (Pill Shape) */
        .swiper-pagination-bullet-active {
          opacity: 1 !important;
          width: 24px !important;
          border-radius: 12px !important;
          background: #5C4033 !important;
        }
        /* Ajuste de posição da paginação para não colar no card */
        .swiper-pagination {
          bottom: 0px !important;
        }
      `}</style>
    </section>
  )
}
