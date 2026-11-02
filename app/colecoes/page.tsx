import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { getColecoes, getModelos } from "@/lib/conteudo";

export const metadata: Metadata = {
  title: "Coleções",
  description: "Cinco coleções de bolsas de crochê inspiradas na natureza da Bahia: Mata, Mar, Recôncavo, Sertão e Chapada.",
};

export default async function Colecoes() {
  const [colecoes, modelos] = await Promise.all([getColecoes(), getModelos()]);
  return (
    <section className="sb-secao" aria-labelledby="titulo">
      <span className="rotulo sb-secao-rot">Coleções</span>
      <h1 className="sb-secao-titulo" id="titulo" style={{ marginBottom: "var(--espaco-5)" }}>
        Cinco territórios da Bahia
      </h1>
      <div className="sb-lista-colecoes">
        {colecoes.map((c) => {
          const n = modelos.filter((m) => m.colecao === c.chave).length;
          return (
            <Link
              key={c.chave}
              className="sb-faixa-colecao"
              href={`/colecoes/${c.chave}`}
              style={{ "--sb-cor": c.corLaje } as CSSProperties}
            >
              <span className="sb-faixa-cor" aria-hidden="true" />
              <div>
                <span className="rotulo sb-secao-rot">Linha {c.linhas.join(" e ")}</span>
                <h2 className="titulo-2">Coleção {c.nome}</h2>
                <p>{c.frase}</p>
              </div>
              <span className="sb-btn sb-btn-secundario" aria-hidden="true">
                {n > 0 ? `Ver ${n} ${n === 1 ? "modelo" : "modelos"}` : "Em breve"}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
