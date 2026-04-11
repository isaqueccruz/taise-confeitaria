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
      // FILTRO: Apenas os destaques
      const destaques = data.filter(bolo => bolo.destaque === true)
      
      // Fallback se não houver destaques
      if (destaques.length === 0) {
        setBolos(data.slice(0, 6)) // Pega mais bolos para o slider ficar bonito
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

        {/* CONFIGURAÇÃO DO SWIPER */}
        <Swiper
          spaceBetween={30} // Espaço entre os cards
          sliceview={1} // Padrão mobile: 1 card por vez
          loop={true} // Faz o efeito de "indo e voltando" infinito
          centeredSlides={true} // Centraliza o card ativo
          autoplay={{
            delay: 3500, // Tempo que cada bolo fica na tela (3.5 segundos)
            disableOnInteraction: false, // Não para se o usuário mexer
          }}
          pagination={{
            clickable: true, // Pontinhos clicáveis embaixo
            dynamicBullets: true, // Pontinhos mudam de tamanho
          }}
          navigation={true} // Setinhas laterais (opcional, pode tirar se preferir limpo)
          modules={[Autoplay, Pagination, Navigation]} // Módulos ativados
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
          className="mySwiper pb-14" // pb-14 para dar espaço aos pontinhos
        >
          {bolos.map((bolo) => (
            <SwiperSlide key={bolo.id} className="py-4"> {/* py-4 para não cortar a sombra do card */}
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

      {/* ESTILIZAÇÃO CUSTOMIZADA PARA AS SETAS E PONTOS (OPCIONAL) */}
      <style jsx global>{`
        .swiper-button-next, .swiper-button-prev {
          color: #A67C74 !important; /* Cor das setas marrom rosado */
          scale: 0.7;
          background: rgba(255,255,255,0.8);
          padding: 30px;
          border-radius: 100%;
        }
        .swiper-pagination-bullet-active {
          background-color: #A67C74 !important; /* Cor do ponto ativo */
        }
      `}</style>
    </section>
  )
}