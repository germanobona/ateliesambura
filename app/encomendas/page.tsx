import type { Metadata } from "next";
import { PassosEncomenda } from "@/components/marca";
import { getConfiguracoes, getPaginas, linkWhatsApp } from "@/lib/conteudo";

export const metadata: Metadata = {
  title: "Como encomendar",
  description: "Toda bolsa do Ateliê Samburá é feita sob encomenda, à mão, na cor que você escolher.",
};

export default async function Encomendas() {
  const [config, paginas] = await Promise.all([getConfiguracoes(), getPaginas()]);
  const p = paginas.encomendas;
  return (
    <>
      <section className="sb-secao">
        <div className="sb-pagina-texto">
          <span className="rotulo sb-secao-rot">Encomendas</span>
          <h1 className="display">{p.titulo}</h1>
          <p className="sb-texto">{p.introducao}</p>
        </div>
      </section>
      <PassosEncomenda passos={p.passos} titulo="Do fio até você" rotulo="Passo a passo" href={linkWhatsApp(config)} />
      <section className="sb-faixa" aria-labelledby="perguntas">
        <div className="sb-secao">
          <h2 className="sb-secao-titulo" id="perguntas" style={{ textAlign: "center", marginBottom: "var(--espaco-5)" }}>
            Perguntas frequentes
          </h2>
          <div className="sb-perguntas">
            {p.perguntas.map((q) => (
              <details key={q.pergunta}>
                <summary>{q.pergunta}</summary>
                <p>{q.resposta}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
