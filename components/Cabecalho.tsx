"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./marca";

const LINKS = [
  { rotulo: "Coleções", href: "/colecoes" },
  { rotulo: "Encomendas", href: "/encomendas" },
  { rotulo: "O ateliê", href: "/atelie" },
  { rotulo: "Cuidados", href: "/cuidados" },
];

/** Cabeçalho do site: logo, menu de 4 itens e botão "Encomendar". */
export function Cabecalho() {
  const caminho = usePathname();
  const [aberto, setAberto] = useState(false);

  useEffect(() => setAberto(false), [caminho]);

  const atual = (href: string) => caminho === href || caminho.startsWith(href + "/");

  return (
    <header className="sb-cab">
      <div className="sb-cab-in">
        <Link className="sb-cab-logo" href="/">
          <Logo />
        </Link>
        <nav className="sb-cab-nav" aria-label="Principal">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} aria-current={atual(l.href) ? "page" : undefined}>
              {l.rotulo}
            </Link>
          ))}
        </nav>
        <div className="sb-cab-acao">
          <Link className="sb-btn sb-btn-secundario" href="/encomendas">
            Encomendar
          </Link>
        </div>
        <button
          type="button"
          className="sb-cab-menu"
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={aberto}
          aria-controls="menu-celular"
          onClick={() => setAberto((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>
      <nav id="menu-celular" className="sb-cab-gaveta" data-aberta={aberto} aria-label="Menu">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} aria-current={atual(l.href) ? "page" : undefined}>
            {l.rotulo}
          </Link>
        ))}
        <Link className="sb-btn sb-btn-primario" href="/encomendas">
          Encomendar
        </Link>
      </nav>
    </header>
  );
}
