"use client";

import { useEffect, useState } from "react";

import CakeCard from "./CakeCard";
import ProductModal from "./ProductModal";

export default function Menu() {
  const [produtos, setProdutos] = useState([]);
  const [produtoAberto, setProdutoAberto] = useState(null);

  useEffect(() => {
    const buscarProdutos = async () => {
      try {
        const response = await fetch("/api/bolos");

        if (!response.ok) {
          throw new Error("Falha ao buscar os produtos.");
        }

        const lista = await response.json();

        setProdutos(
          lista.filter(({ disponivel }) => disponivel)
        );
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
      }
    };

    buscarProdutos();
  }, []);

  const abrirProduto = (produto) => {
    setProdutoAberto(produto);
  };

  const fecharProduto = () => {
    setProdutoAberto(null);
  };

  return (
    <>
      <section
        id="cardapio"
        className="bg-white py-24"
      >
        <div className="mx-auto max-w-6xl px-6">
          <header className="mb-14 text-center">
            <h2 className="tracking-tighter text-3xl font-black italic text-[#A67C74] md:text-5xl">
              Nosso Cardápio
            </h2>

            <span className="mx-auto mt-4 block h-1 w-20 rounded-full bg-[#F3E5DC]" />

            <p className="mt-4 font-medium text-[#826A61]">
              Escolha o seu favorito e adoce o seu dia.
            </p>
          </header>

          {produtos.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-3">
              {produtos.map((produto) => (
                <CakeCard
                  key={produto.id}
                  bolo={produto}
                  onClick={abrirProduto}
                />
              ))}
            </div>
          ) : (
            <div className="py-10 text-center text-gray-400">
              Nenhum bolo disponível no momento.
            </div>
          )}
        </div>
      </section>

      {produtoAberto && (
        <ProductModal
          bolo={produtoAberto}
          onClose={fecharProduto}
        />
      )}
    </>
  );
}
