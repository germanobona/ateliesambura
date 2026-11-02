import { CardProduto, HeroCampanha, PassosEncomenda, Botao } from "@/components/marca";
import {
  getCampanhaAtiva,
  getColecao,
  getColecoes,
  getConfiguracoes,
  getModelo,
  getModelos,
  getPaginas,
  linkWhatsApp,
} from "@/lib/conteudo";

export default async function Inicio() {
  const [config, campanha, colecoes, paginas] = await Promise.all([
    getConfiguracoes(),
    getCampanhaAtiva(),
    getColecoes(),
    getPaginas(),
  ]);
  const colecao = (await getColecao(campanha.colecao))!;
  const modeloCampanha = await getModelo(campanha.modelo);
  const fotoHero = campanha.foto ?? modeloCampanha?.fotos[0]?.src ?? "";
  const altHero = campanha.alt ?? modeloCampanha?.fotos[0]?.alt ?? campanha.titulo;

  // Destaques, com a coleção da campanha vigente primeiro (regra do manual).
  const destaques = (await getModelos({ destaque: true })).sort(
    (a, b) => Number(b.colecao === campanha.colecao) - Number(a.colecao === campanha.colecao),
  );
  const porChave = Object.fromEntries(colecoes.map((c) => [c.chave, c]));
  const p = paginas.inicio;

  return (
    <>
      <HeroCampanha
        colecao={colecao}
        titulo={campanha.titulo}
        frase={campanha.frase}
        foto={fotoHero}
        alt={altHero}
        acao={`Ver coleção ${colecao.nome}`}
        href={`/colecoes/${colecao.chave}`}
        acaoSecundaria="Como encomendar"
        hrefSecundaria="/encomendas"
      />

      <section className="sb-secao" aria-labelledby="colecoes-titulo">
        <div className="sb-secao-topo">
          <div>
            <span className="rotulo sb-secao-rot">{p.colecoesRotulo}</span>
            <h2 className="sb-secao-titulo" id="colecoes-titulo">
              {p.colecoesTitulo}
            </h2>
          </div>
          <Botao variante="secundario" href="/colecoes">
            Ver todas as coleções
          </Botao>
        </div>
        <div className="sb-grade">
          {destaques.slice(0, 3).map((m) => (
            <CardProduto key={m.slug} modelo={m} colecao={porChave[m.colecao]} />
          ))}
        </div>
      </section>

      <section className="sb-faixa" aria-labelledby="bastidor-titulo">
        <div className="sb-secao sb-bastidor">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.bastidorFoto} alt={p.bastidorAlt} loading="lazy" />
          <div>
            <span className="rotulo sb-secao-rot">{p.bastidorRotulo}</span>
            <h2 className="sb-bastidor-frase" id="bastidor-titulo">
              {p.bastidorFrase}
            </h2>
            <p className="sb-texto">{p.bastidorTexto}</p>
            <Botao variante="secundario" href="/atelie">
              Conhecer o ateliê
            </Botao>
          </div>
        </div>
      </section>

      <PassosEncomenda passos={paginas.encomendas.passos} href={linkWhatsApp(config)} />
    </>
  );
}
