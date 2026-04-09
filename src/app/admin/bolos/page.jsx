"use client"

import { useEffect, useState } from "react"

export default function AdminBolos() {
  const [bolos, setBolos] = useState([])
  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")
  const [preco, setPreco] = useState("")
  const [porcoes, setPorcoes] = useState("")
  const [ingredientes, setIngredientes] = useState("")
  const [destaque, setDestaque] = useState(false)
  const [disponivel, setDisponivel] = useState(true)
  const [imagem, setImagem] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => { carregarBolos() }, [])

  async function carregarBolos() {
    try {
      const res = await fetch("/api/bolos")
      const data = await res.json()
      if (Array.isArray(data)) {
        setBolos(data)
      } else {
        setBolos([])
      }
    } catch (error) {
      console.error("Erro ao carregar:", error)
    }
  }

  async function adicionarBolo() {
    if (!nome || !preco) return alert("Preencha o nome e o preço!")
    setLoading(true)
    
    try {
      const formData = new FormData()
      formData.append("nome", nome)
      formData.append("preco", preco)
      formData.append("descricao", descricao)
      formData.append("porcoes", porcoes)
      formData.append("ingredientes", ingredientes)
      formData.append("destaque", destaque)
      formData.append("disponivel", disponivel)
      if (imagem) formData.append("imagem", imagem)

      const response = await fetch("/api/bolos", {
        method: "POST",
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erro desconhecido")
      }

      alert("Produto salvo!")
      setNome(""); setPreco(""); setDescricao(""); setPorcoes("")
      setIngredientes(""); setDestaque(false); setDisponivel(true); setImagem(null)
      carregarBolos()
    } catch (err) {
      alert("Erro ao salvar: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen">
      <div className="max-w-6xl mx-auto p-4 md:p-10">
        <header className="mb-10">
          <h1 className="text-3xl font-black italic text-[#A67C74]">Catálogo Taise Sena</h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* FORMULÁRIO */}
          <section className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-[#F3E5DC] space-y-4 h-fit">
            <h2 className="text-lg font-bold">Novo Bolo</h2>
            <div className="relative group h-40 bg-[#FAF3F0] border-2 border-dashed border-[#D7CCC8] rounded-3xl flex items-center justify-center cursor-pointer overflow-hidden">
              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setImagem(e.target.files[0])} />
              <span className="text-sm font-bold text-[#826A61]">
                {imagem ? "✅ Foto Selecionada" : "📸 Adicionar Foto"}
              </span>
            </div>

            <input placeholder="Nome" className="admin-input" value={nome} onChange={e => setNome(e.target.value)} />
            <div className="grid grid-cols-2 gap-4">
              <input placeholder="Preço" type="number" className="admin-input" value={preco} onChange={e => setPreco(e.target.value)} />
              <input placeholder="Porções" className="admin-input" value={porcoes} onChange={e => setPorcoes(e.target.value)} />
            </div>
            <textarea placeholder="Descrição" className="admin-input h-24 pt-3" value={descricao} onChange={e => setDescricao(e.target.value)} />
            <input placeholder="Ingredientes" className="admin-input" value={ingredientes} onChange={e => setIngredientes(e.target.value)} />

            <div className="flex gap-2">
              <button onClick={() => setDestaque(!destaque)} className={`flex-1 p-3 rounded-xl border text-xs font-bold transition ${destaque ? 'bg-[#A67C74] text-white' : 'bg-white'}`}>⭐ Destaque</button>
              <button onClick={() => setDisponivel(!disponivel)} className={`flex-1 p-3 rounded-xl border text-xs font-bold transition ${disponivel ? 'bg-green-600 text-white' : 'bg-white'}`}>✅ Disponível</button>
            </div>

            <button onClick={adicionarBolo} disabled={loading} className="w-full py-4 bg-[#A67C74] text-white rounded-2xl font-black disabled:bg-gray-300">
              {loading ? "SALVANDO..." : "SALVAR PRODUTO"}
            </button>
          </section>

          {/* LISTA */}
          <section className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-[#A67C74]">Bolos Cadastrados ({bolos.length})</h3>
            <div className="grid gap-3">
              {bolos.length === 0 ? (
                <p className="text-sm text-gray-400 italic">Nenhum bolo encontrado.</p>
              ) : (
                bolos.map(b => (
                  <div key={b.id} className="bg-white p-3 rounded-2xl border border-[#F3E5DC] flex items-center gap-4">
                    <img src={b.imagem || "https://via.placeholder.com/50"} className="w-12 h-12 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm truncate">{b.nome}</p>
                      <p className="text-xs text-[#A67C74]">R$ {b.preco}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>

      <style jsx>{`
        .admin-input {
          width: 100%;
          padding: 0 1rem;
          height: 3rem;
          background: #FAF3F0;
          border: 1px solid #F3E5DC;
          border-radius: 1rem;
          font-size: 16px !important;
          outline: none;
        }
      `}</style>
    </div>
  )
}