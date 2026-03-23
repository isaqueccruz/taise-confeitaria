export default function CakeCard({ bolo, onClick }) {

return(

<div 
onClick={() => onClick && onClick(bolo)}
className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden cursor-pointer"
>

<img
src={bolo.imagem}
className="w-full h-56 object-cover"
/>

<div className="p-5">

<h3 className="font-bold text-lg text-gray-900">
{bolo.nome}
</h3>

<p className="text-gray-800 font-medium">
R$ {bolo.preco}
</p>

<button
className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg text-sm"
>
Ver opções
</button>

</div>

</div>

)

}