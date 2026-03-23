import { depoimentos } from "../data/depoimentos"
import TestimonialCard from "./TestimonialCard"

export default function Testimonials(){

return(

<section id="depoimentos" className="py-20 bg-gray-100">

<h2 className="text-3xl font-bold text-center text-gray-800">

Depoimentos de Clientes

</h2>

<div className="grid md:grid-cols-3 gap-8 mt-12">

{depoimentos.map((dep)=>(
<TestimonialCard key={dep.id} depoimento={dep}/>
))}

</div>

</section>

)

}