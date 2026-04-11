"use client"

import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"

// Estilos do Swiper
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
      
      // Filtra apenas os destaques
      let destaques = data.filter(bolo => bolo.destaque === true)
      
      // Se não houver nenhum marcado, pega os 3 primeiros para não ficar vazio
      if (destaques.length === 0) {
        destaques = data.slice(0, 3)
      }

      // Lógica para o Giro Infinito:
      // Triplicamos a lista se houver poucos itens (menos de 5)
      // Isso engana o Swiper e permite o loop infinito sem erros de "slides insuficientes"
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
    <section className="py-20 px-4 md:px-10 bg-[#F7E7E3]">
      <div className="max-w-7xl mx-auto">
        
        <header className="text-center mb-16">
          <span className="text-sm font-black uppercase tracking-widest text-[#A67C74] opacity-70">
            Os Favoritos
          </span>
          <h2 className="text-4xl md:text-6xl font-black italic text-[#A67C74] tracking-tighter mt-2">
            Nossos Best Sellers
          </h2>
          <div className="w-24 h-1.5 bg-[#F3E5DC] mx-auto mt-5 rounded-full"></div>
        </header>

        {/* Carrossel sem setas laterais */}
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          loop={bolos.length > 1}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[Autoplay, Pagination]}
          breakpoints={{
            // Quando a tela for >= 640px (Tablet)
            640: {
              slidesPerView: 2,
              centeredSlides: false,
            },
            // Quando a tela for >= 1024px (Desktop)
            1024: {
              slidesPerView: 3,
              centeredSlides: false,
            },
          }}
          className="mySwiper pb-14"
        >
          {bolos.map((bolo, index) => (
            // Usamos o index na key pois temos itens repetidos para o loop infinito
            <SwiperSlide key={`${bolo.id}-${index}`} className="py-4">
              <CakeCard 
                bolo={bolo}
                onClick={setBoloSelecionado}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* MODAL DE DETALHES */}
      {boloSelecionado && (
        <ProductModal 
          bolo={boloSelecionado}
          onClose={() => setBoloSelecionado(null)}
        />
      )}

      {/* Customização dos pontinhos de paginação */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: #D7CCC8;
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background-color: #A67C74 !important;
          width: 12px;
          border-radius: 5px;
        }
      `}</style>
    </section>
  )
}