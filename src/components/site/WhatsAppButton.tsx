import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/554999783926"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
      aria-label="Fale conosco no WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
}
