export default function Dashboard(){

return(

<div>

<h1 className="text-3xl font-bold text-gray-900">

Dashboard

</h1>

<div className="grid md:grid-cols-3 gap-6 mt-10">

<div className="bg-white p-6 rounded-xl shadow">

<h3 className="font-semibold text-gray-800">
Total de Bolos
</h3>

<p className="text-3xl mt-2 text-gray-900">
6
</p>

</div>

<div className="bg-white p-6 rounded-xl shadow">

<h3 className="font-semibold">
Pedidos Hoje
</h3>

<p className="text-3xl mt-2">
3
</p>

</div>

<div className="bg-white p-6 rounded-xl shadow">

<h3 className="font-semibold">
Pedidos Pendentes
</h3>

<p className="text-3xl mt-2">
2
</p>

</div>

</div>

</div>

)

}