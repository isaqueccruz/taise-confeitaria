"use client"

import { useEffect, useState } from "react"

export default function AdminBolos() {
  const [bolos, setBolos] = useState([])
  const [editandoId, setEditandoId] = useState(null) // Controla se estamos editando ou criando
  
  // Estados do Formulário
  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")
  const [preco, setPreco] = useState("")
  const [porcoes, setPorcoes] = useState("")
  const [ingredientes, setIngredientes] = useState("")
  const [destaque, setDestaque] = useState(false)
  const [disponivel, setDisponivel] = useState(true)
  const [imagem, setImagem] = useState(null)
  const [preview, setPreview] = useState(null) // Para mostrar a imagem antes de upar
  const [loading, setLoading] = useState(false)

  useEffect(() => { carregarBolos() }, [])

  async function carregarBolos() {
    const res = await fetch("/api/bolos")
    const data = await res.json()
    setBolos(data)
  }

  // Lógica de Preview de Imagem
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImagem(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  // Preenche o formulário com os dados do bolo para editar
  function prepararEdicao(bolo) {
    setEditandoId(bolo.id)
    setNome(bolo.nome)
    setPreco(bolo.preco)
    setDescricao(bolo.descricao || "")
    setPorcoes(bolo.porcoes || "")
    setIngredientes(bolo.ingredientes || "")
    setDestaque(bolo.destaque)
    setDisponivel(bolo.disponivel)
    setPreview(bolo.imagem) // Mostra a imagem atual
    window.scrollTo({ top: 0, behavior: 'smooth' }) // Sobe a página para o form
  }

  function limparFormulario() {
    setEditandoId(null)
    setNome(""); setDescricao(""); setPreco(""); setPorcoes("")
    setIngredientes(""); setDestaque(false); setDisponivel(true)
    setImagem(null); setPreview(null)
  }

  async function salvarBolo() {
    if (!nome || !preco) return alert("Preencha nome e preço!")
    setLoading(true)
    
    const formData = new FormData()
    if (editandoId) formData.append("id", editandoId)
    formData.append("nome", nome)
    formData.append("descricao", descricao)
    formData.append("preco", preco)
    formData.append("porcoes", porcoes)
    formData.append("ingredientes", ingredientes)
    formData.append("destaque", destaque)
    formData.append("disponivel", disponivel)
    if (imagem) formData.append("imagem", imagem)

    const metodo = editandoId ? "PUT" : "POST"
    const res = await fetch("/api/bolos", { method: metodo, body: formData })
    
    if (res.ok) {
      limparFormulario()
      carregarBolos()
    } else {
      alert("Erro ao salvar o produto.")
    }
    setLoading(false)
  }

  async function excluirBolo(id) {
    if (!confirm("Remover este bolo?")) return
    const res = await fetch("/api/bolos", {
      method: "DELETE",
      body: JSON.stringify({ id })
    })
    if (res.ok) carregarBolos()
  }

  return (
    <div className="min-h-screen bg-[#FDF8F5] md:ml-64 transition-all duration-300">
      <div className="max-w-5xl mx-auto p-4 md:p-10 space-y-8">
        
        <header className="py-6 border-b border-[#F3E5DC]">
          <h1 className="text-3xl md:text-5xl font-black italic text-[#A67C74] tracking-tighter">
            Painel Taise Sena
          </h1>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 items-start">
          
          <section className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-xl border border-[#F3E5DC] space-y-6">
            <h2 className="text-xl font-bold text-[#3E2723]">
              {editandoId ? "Editar Produto" : "Novo Produto"}
            </h2>

            {/* Preview de Imagem */}
            <div className="relative group">
              <input type="file" id="file" hidden onChange={handleImageChange} accept="image/*" />
              <label htmlFor="file" className="flex flex-col items-center justify-center w-full h-44 bg-[#FAF3F0] border-2 border-dashed border-[#D7CCC8] rounded-[2rem] cursor-pointer hover:bg-[#F3E5DC] transition-all overflow-hidden">
                {preview ? (
                  <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                ) : (
                  <div className="text-center">
                    <span className="text-3xl block mb-2">📸</span>
                    <span className="text-xs font-black uppercase tracking-widest text-[#826A61]">Adicionar Foto</span>
                  </div>
                )}
              </label>
            </div>

            <div className="space-y-4">
              <input className="admin-input" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome do Bolo" />
              <div className="grid grid-cols-2 gap-4">
                <input type="number" className="admin-input" value={preco} onChange={e => setPreco(e.target.value)} placeholder="Preço" />
                <input className="admin-input" value={porcoes} onChange={e => setPorcoes(e.target.value)} placeholder="Porções" />
              </div>
              <textarea className="admin-input h-28 py-4 resize-none" value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Descrição..." />
              <input className="admin-input" value={ingredientes} onChange={e => setIngredientes(e.target.value)} placeholder="Ingredientes..." />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setDestaque(!destaque)} className={`p-4 rounded-2xl border-2 flex items-center justify-between ${destaque ? 'bg-[#A67C74] text-white' : 'bg-white text-[#826A61]'}`}>
                <span className="text-xs font-bold">⭐ Destaque</span>
              </button>
              <button onClick={() => setDisponivel(!disponivel)} className={`p-4 rounded-2xl border-2 flex items-center justify-between ${disponivel ? 'bg-green-600 text-white' : 'bg-white text-[#826A61]'}`}>
                <span className="text-xs font-bold">✅ Disponível</span>
              </button>
            </div>

            <div className="flex gap-2">
              <button onClick={salvarBolo} disabled={loading} className="flex-1 py-5 rounded-full font-black text-white bg-[#A67C74] hover:bg-[#826A61] transition-all">
                {loading ? "SALVANDO..." : editandoId ? "SALVAR ALTERAÇÕES" : "CRIAR PRODUTO"}
              </button>
              {editandoId && (
                <button onClick={limparFormulario} className="px-6 rounded-full font-bold text-[#826A61] bg-[#F3E5DC]">Cancelar</button>
              )}
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xs uppercase font-black text-[#A67C74] ml-2">Produtos ({bolos.length})</h3>
            <div className="grid grid-cols-1 gap-4">
              {bolos.map((bolo) => (
                <div key={bolo.id} className="bg-white p-4 rounded-3xl border border-[#F3E5DC] flex items-center gap-4">
                  <img src={bolo.imagem} className="w-16 h-16 rounded-2xl object-cover" alt="" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-[#3E2723] truncate">{bolo.nome}</h4>
                    <p className="text-sm font-black text-[#A67C74]">R$ {bolo.preco}</p>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => prepararEdicao(bolo)} className="p-3 text-blue-400 hover:bg-blue-50 rounded-full">✏️</button>
                    <button onClick={() => excluirBolo(bolo.id)} className="p-3 text-red-300 hover:bg-red-50 rounded-full">🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
      
      <style jsx>{`
        .admin-input {
          width: 100%; padding: 0 1.5rem; height: 3.5rem;
          background: #FAF3F0; border: 1.5px solid #F3E5DC;
          border-radius: 1.25rem; outline: none;
          color: #3E2723; font-weight: 500;
        }
        .admin-input:focus { border-color: #A67C74; background: white; }
      `}</style>
    </div>
  )
}