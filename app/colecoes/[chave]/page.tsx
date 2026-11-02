import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CardProduto, HeroCampanha } from "@/components/marca";
import { getCampanhaDaColecao, getColecao, getColecoes, getModelo, getModelos } from "@/lib/conteudo";

type Props = { params: Promise<{ chave: string }> };

export async function generateStaticParams() {
  return (await getColecoes()).map((c) => ({ chave: c.chave }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = await getColecao((await params).chave);
  return c ? { title: `Coleção ${c.nome}`, description: c.descricao } : {};
}

export default async function PaginaColecao({ params }: Props) {
  const colecao = await getColecao((await params).chave);
  if (!colecao) notFound();
  const modelos = await getModelos({ colecao: colecao.chave });
  const campanha = await getCampanhaDaColecao(colecao.chave);
  const modeloHero = campanha ? await getModelo(campanha.modelo) : modelos[0];
  const foto = campanha?.foto ?? modeloHero?.fotos[0]?.src;
  const alt = campanha?.alt ?? modeloHero?.fotos[0]?.alt ?? "";

  return (
    <>
      {foto ? (
        <HeroCampanha colecao={colecao} titulo={`Coleção ${colecao.nome}`} frase={colecao.frase} foto={foto} alt={alt} />
      ) : (
        <section className="sb-secao">
          <h1 className="sb-secao-titulo">Coleção {colecao.nome}</h1>
          <p className="sb-texto">{colecao.frase}</p>
        </section>
      )}
      <section className="sb-secao" aria-labelledby="modelos-titulo">
        <p className="sb-texto">{colecao.descricao}</p>
        <h2 className="sb-secao-titulo" id="modelos-titulo" style={{ marginBottom: "var(--espaco-5)" }}>
          Modelos
        </h2>
        {modelos.length > 0 ? (
          <div className="sb-grade">
            {modelos.map((m) => (
              <CardProduto key={m.slug} modelo={m} colecao={colecao} />
            ))}
          </div>
        ) : (
          <div className="sb-vazio">
            <p>A próxima coleção está nas minhas agulhas.</p>
          </div>
        )}
      </section>
    </>
  );
}
