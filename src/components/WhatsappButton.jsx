"use client"

export default function WhatsappButton(){
  return(
    <a
      href="https://wa.me/5571982210229"
      target="_blank"
      className="fixed bottom-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm sm:text-base hover:scale-110 transition"
    >
      💬 <span className="hidden sm:inline">WhatsApp</span>
    </a>
  )
}