export default function TestimonialCard({depoimento}){

return(

<div className="bg-white p-6 rounded-xl shadow-lg">

<p className="text-gray-700 italic leading-relaxed">
"{depoimento.texto}"
</p>

<h4 className="mt-4 font-bold text-gray-900">
{depoimento.nome}
</h4>

</div>

)

}