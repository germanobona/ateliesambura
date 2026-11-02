import type { Metadata } from "next";
import { Botao } from "@/components/marca";
import { getPaginas } from "@/lib/conteudo";

export const metadata: Metadata = {
  title: "O ateliê",
  description: "De Salvador a Brasília: a história do Ateliê Samburá e das bolsas de crochê feitas à mão.",
};

export default async function Atelie() {
  const p = (await getPaginas()).atelie;
  return (
    <section className="sb-secao sb-atelie">
      <div>
        <span className="rotulo sb-secao-rot">Nossa história</span>
        <h1 className="display" style={{ color: "var(--marca)", margin: "var(--espaco-2) 0 var(--espaco-3)" }}>
          {p.titulo}
        </h1>
        <p className="titulo-3" style={{ color: "var(--tinta-suave)", marginTop: 0 }}>
          {p.frase}
        </p>
        {p.paragrafos.map((t) => (
          <p key={t.slice(0, 24)} className="sb-texto">
            {t}
          </p>
        ))}
        <Botao href="/colecoes">Ver as coleções</Botao>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={p.foto} alt={p.alt} />
    </section>
  );
}
