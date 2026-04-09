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
    const res = await fetch("/api/bolos")
    const data = await res.json()
    setBolos(data)
  }

  // FUNÇÃO QUE ESTAVA FALTANDO
  async function excluirBolo(id) {
    if (!confirm("Tem certeza que deseja remover este produto?")) return

    try {
      const res = await fetch("/api/bolos", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      })

      if (res.ok) {
        // Remove da lista local para atualizar a tela na hora
        setBolos(bolos.filter(b => b.id !== id))
      } else {
        alert("Erro ao excluir o bolo do banco de dados.")
      }
    } catch (error) {
      console.error("Erro na exclusão:", error)
      alert("Erro de conexão ao tentar excluir.")
    }
  }

  async function adicionarBolo() {
    if (!nome || !preco) return alert("Preencha nome e preço!")
    setLoading(true)
    const formData = new FormData()
    formData.append("nome", nome)
    formData.append("descricao", descricao)
    formData.append("preco", preco)
    formData.append("porcoes", porcoes)
    formData.append("ingredientes", ingredientes)
    formData.append("destaque", destaque)
    formData.append("disponivel", disponivel)
    if (imagem) formData.append("imagem", imagem)

    const res = await fetch("/api/bolos", { method: "POST", body: formData })
    
    if (res.ok) {
      setNome(""); setDescricao(""); setPreco(""); setPorcoes("")
      setIngredientes(""); setDestaque(false); setDisponivel(true); setImagem(null)
      carregarBolos()
    } else {
      alert("Erro ao criar o produto.")
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#FDF8F5] md:ml-64 transition-all duration-300">
      
      <div className="max-w-5xl mx-auto p-4 md:p-10 space-y-8">
        
        <header className="py-6 border-b border-[#F3E5DC]">
          <h1 className="text-3xl md:text-5xl font-black italic text-[#A67C74] tracking-tighter">
            Painel Taise Sena
          </h1>
          <p className="text-[#826A61] font-medium mt-1">Gerencie seus bolos e encomendas</p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 items-start">
          
          {/* SEÇÃO: FORMULÁRIO */}
          <section className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-xl shadow-rose-100/20 border border-[#F3E5DC] space-y-6">
            <h2 className="text-xl font-bold text-[#3E2723]">Novo Produto</h2>

            <div className="relative group">
              <input type="file" id="file" hidden onChange={(e) => setImagem(e.target.files[0])} accept="image/*" />
              <label htmlFor="file" className="flex flex-col items-center justify-center w-full h-44 bg-[#FAF3F0] border-2 border-dashed border-[#D7CCC8] rounded-[2rem] cursor-pointer hover:bg-[#F3E5DC] transition-all overflow-hidden">
                {imagem ? (
                  <span className="text-sm font-bold text-green-600 px-4 text-center">{imagem.name}</span>
                ) : (
                  <div className="text-center">
                    <span className="text-3xl block mb-2">📸</span>
                    <span className="text-xs font-black uppercase tracking-widest text-[#826A61]">Adicionar Foto</span>
                  </div>
                )}
              </label>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase ml-2 text-[#826A61]">Nome do Bolo</label>
                <input className="admin-input" value={nome} onChange={e => setNome(e.target.value)} placeholder="Ex: Red Velvet" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase ml-2 text-[#826A61]">Preço (R$)</label>
                  <input type="number" className="admin-input" value={preco} onChange={e => setPreco(e.target.value)} placeholder="0.00" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase ml-2 text-[#826A61]">Porções</label>
                  <input className="admin-input" value={porcoes} onChange={e => setPorcoes(e.target.value)} placeholder="10 fatias" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase ml-2 text-[#826A61]">Descrição</label>
                <textarea className="admin-input h-28 py-4 resize-none" value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Descreva o sabor..." />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase ml-2 text-[#826A61]">Ingredientes</label>
                <input className="admin-input" value={ingredientes} onChange={e => setIngredientes(e.target.value)} placeholder="Trigo, ovos..." />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button 
                onClick={() => setDestaque(!destaque)}
                className={`p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${destaque ? 'bg-[#A67C74] border-[#A67C74] text-white shadow-lg' : 'bg-white border-[#F3E5DC] text-[#826A61]'}`}
              >
                <span className="text-xs font-bold italic">⭐ Destaque</span>
                <div className={`w-4 h-4 rounded-full border-2 ${destaque ? 'bg-white border-white' : 'border-[#D7CCC8]'}`}></div>
              </button>

              <button 
                onClick={() => setDisponivel(!disponivel)}
                className={`p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${disponivel ? 'bg-green-600 border-green-600 text-white shadow-lg' : 'bg-white border-[#F3E5DC] text-[#826A61]'}`}
              >
                <span className="text-xs font-bold italic">✅ Disponível</span>
                <div className={`w-4 h-4 rounded-full border-2 ${disponivel ? 'bg-white border-white' : 'border-[#D7CCC8]'}`}></div>
              </button>
            </div>

            <button 
              onClick={adicionarBolo} 
              disabled={loading} 
              className="w-full py-5 rounded-full font-black text-white bg-[#A67C74] hover:bg-[#826A61] shadow-xl active:scale-[0.97] transition-all disabled:bg-gray-300"
            >
              {loading ? "PROCESSANDO..." : "CRIAR PRODUTO"}
            </button>
          </section>

          {/* SEÇÃO: LISTA DE PRODUTOS */}
          <section className="space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] font-black text-[#A67C74] ml-2">Produtos no Catálogo ({bolos.length})</h3>
            <div className="grid grid-cols-1 gap-4">
              {bolos.map((bolo) => (
                <div key={bolo.id} className="bg-white p-4 rounded-3xl border border-[#F3E5DC] flex items-center gap-4 hover:shadow-md transition-shadow">
                  <img src={bolo.imagem} className="w-16 h-16 rounded-2xl object-cover shadow-sm" alt="" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-[#3E2723] truncate">{bolo.nome}</h4>
                    <p className="text-sm font-black text-[#A67C74]">R$ {bolo.preco}</p>
                  </div>
                  <button onClick={() => excluirBolo(bolo.id)} className="p-3 text-red-300 hover:bg-red-50 hover:text-red-600 rounded-full transition-colors">
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>

      <style jsx>{`
        .admin-input {
          width: 100%;
          padding: 0 1.5rem;
          height: 3.5rem;
          background: #FAF3F0;
          border: 1.5px solid #F3E5DC;
          border-radius: 1.25rem;
          outline: none;
          font-size: 16px !important;
          color: #3E2723;
          font-weight: 500;
          transition: all 0.2s;
        }
        .admin-input:focus {
          background: white;
          border-color: #A67C74;
          box-shadow: 0 0 0 4px rgba(166, 124, 116, 0.1);
        }
      `}</style>
    </div>
  )
}