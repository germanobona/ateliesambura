import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CardProduto, SeloColecao } from "@/components/marca";
import { EscolhaModelo } from "@/components/EscolhaModelo";
import { getColecao, getConfiguracoes, getModelo, getModelos } from "@/lib/conteudo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getModelos()).map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const m = await getModelo((await params).slug);
  return m ? { title: `Bolsa de crochê ${m.nome}`, description: m.descricao, openGraph: { images: [m.fotos[0]?.src ?? ""] } } : {};
}

export default async function PaginaModelo({ params }: Props) {
  const modelo = await getModelo((await params).slug);
  if (!modelo) notFound();
  const [colecao, config] = await Promise.all([getColecao(modelo.colecao), getConfiguracoes()]);
  const irmaos = (await getModelos({ colecao: modelo.colecao })).filter((m) => m.slug !== modelo.slug).slice(0, 3);
  const whatsappBase = `https://wa.me/${config.whatsapp.replace(/\D/g, "")}`;

  return (
    <>
      <div className="sb-secao">
        <nav className="sb-trilha" aria-label="Você está em">
          <Link href="/colecoes">Coleções</Link> / {colecao && <Link href={`/colecoes/${colecao.chave}`}>{colecao.nome}</Link>} / {modelo.nome}
        </nav>
        <EscolhaModelo
          nome={modelo.nome}
          fotos={modelo.fotos}
          cores={modelo.cores}
          whatsappBase={whatsappBase}
          mensagem={config.mensagemEncomenda}
        >
          {colecao && <SeloColecao colecao={colecao} link />}
          <h1 className="titulo-1 sb-produto-nome">{modelo.nome}</h1>
          <span className="preco">{modelo.preco}</span>
          <p className="sb-produto-desc">{modelo.descricao}</p>
          <dl className="sb-ficha">
            <div>
              <dt>Medidas</dt>
              <dd>{modelo.medidas}</dd>
            </div>
            <div>
              <dt>Materiais</dt>
              <dd>{modelo.materiais}</dd>
            </div>
            <div>
              <dt>Prazo</dt>
              <dd>{modelo.prazo}</dd>
            </div>
            <div>
              <dt>Cuidados</dt>
              <dd>
                Lave à mão, seque à sombra e guarde sem peso dentro. <Link href="/cuidados">Ver todos</Link>
              </dd>
            </div>
          </dl>
        </EscolhaModelo>
      </div>
      {irmaos.length > 0 && colecao && (
        <section className="sb-faixa" aria-labelledby="mesma-colecao">
          <div className="sb-secao">
            <h2 className="sb-secao-titulo" id="mesma-colecao" style={{ marginBottom: "var(--espaco-5)" }}>
              Da mesma coleção
            </h2>
            <div className="sb-grade">
              {irmaos.map((m) => (
                <CardProduto key={m.slug} modelo={m} colecao={colecao} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
