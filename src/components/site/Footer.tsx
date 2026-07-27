import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/cleom-logo.png.asset.json";
import { solutions } from "@/lib/solutions";

export function Footer() {
  return (
    <footer className="navy-gradient text-chrome">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <img src={logo.url} alt="CLEOM" className="h-16 mb-4" />
            <p className="text-sm text-chrome/70 leading-relaxed">
              Soluções frigoríficas industriais com tecnologia de ponta para o setor alimentício.
            </p>
          </div>

          <div>
            <h4 className="text-cyan-accent uppercase tracking-wider text-sm mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm text-chrome/70">
              <li><Link to="/" className="hover:text-cyan-accent">Início</Link></li>
              <li><Link to="/sobre" className="hover:text-cyan-accent">Sobre</Link></li>
              <li><Link to="/nossas-solucoes" className="hover:text-cyan-accent">Nossas Soluções</Link></li>
              <li><Link to="/contato" className="hover:text-cyan-accent">Contato</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-cyan-accent uppercase tracking-wider text-sm mb-4">Soluções</h4>
            <ul className="space-y-2 text-sm text-chrome/70">
              {solutions.map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/nossas-solucoes/$categoria"
                    params={{ categoria: s.slug }}
                    className="hover:text-cyan-accent"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-cyan-accent uppercase tracking-wider text-sm mb-4">Contato</h4>
            <ul className="space-y-3 text-sm text-chrome/70">
              <li className="flex gap-2"><Phone className="w-4 h-4 mt-0.5 text-cyan-accent" />(00) 0000-0000</li>
              <li className="flex gap-2"><Mail className="w-4 h-4 mt-0.5 text-cyan-accent" />comercial@cleom.ind.br</li>
              <li className="flex gap-2"><MapPin className="w-4 h-4 mt-0.5 text-cyan-accent" />Rua Camaquã, 780 - D, Bairro Líder - Q. 4027, Chapecó - SC - CEP 89805-250</li>
            </ul>
            <div className="flex gap-3 mt-5">
              <a href="#" aria-label="Facebook da CLEOM" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-cyan-accent hover:text-navy-deep transition-colors"><Facebook className="w-4 h-4" /></a>
              <a href="https://www.instagram.com/cleom.solucoes" target="_blank" rel="noreferrer" aria-label="Instagram da CLEOM" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-cyan-accent hover:text-navy-deep transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="#" aria-label="LinkedIn da CLEOM" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-cyan-accent hover:text-navy-deep transition-colors"><Linkedin className="w-4 h-4" /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 text-xs text-chrome/50 flex flex-col md:flex-row justify-between gap-3">
          <p>© {new Date().getFullYear()} CLEOM — CLEOM PRESTACAO DE SERVICOS INDUSTRIAIS LTDA. Todos os direitos reservados.</p>
          <p>CNPJ 56.964.989/0001-08</p>
        </div>
      </div>
    </footer>
  );
}
