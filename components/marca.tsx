/**
 * Componentes da marca, portados do design system Ateliê Samburá
 * (Logo, Botao, SeloColecao, CardProduto, HeroCampanha, PassosEncomenda, RodapeSite).
 * Mesmos nomes de classe (sb-*) e mesmas regras de uso do manual.
 */
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { Colecao, Configuracoes, Modelo, Passo } from "@/lib/tipos";

type ComCor = CSSProperties & { "--sb-cor"?: string };

/** Flor de ponto pipoca: 8 pétalas e centro vazado. */
export function Flor({ tamanho = 32 }: { tamanho?: number }) {
  return (
    <svg viewBox="0 0 100 100" width={tamanho} height={tamanho} aria-hidden="true" fill="currentColor">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <ellipse key={a} cx="50" cy="26" rx="9" ry="15" transform={`rotate(${a} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="5.5" fill="none" stroke="currentColor" strokeWidth="2.6" />
    </svg>
  );
}

/** Logo horizontal: flor + "ATELIÊ" sobre "Samburá". */
export function Logo({ tamanho = 30 }: { tamanho?: number }) {
  return (
    <span className="sb-logo" role="img" aria-label="Ateliê Samburá">
      <Flor tamanho={tamanho} />
      <span className="sb-logo-txt" aria-hidden="true">
        <span className="sb-logo-atelie">Ateliê</span>
        <span className="sb-logo-nome">Samburá</span>
      </span>
    </span>
  );
}

export function Botao({
  variante = "primario",
  href,
  children,
  externo,
}: {
  variante?: "primario" | "secundario" | "campanha";
  href: string;
  children: ReactNode;
  externo?: boolean;
}) {
  const cls = `sb-btn sb-btn-${variante}`;
  if (externo || /^https?:/.test(href)) {
    return (
      <a className={cls} href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link className={cls} href={href}>
      {children}
    </Link>
  );
}

export function SeloColecao({ colecao, link = false }: { colecao: Colecao; link?: boolean }) {
  const estilo: ComCor = { "--sb-cor": colecao.corSelo };
  const conteudo = (
    <>
      <span className="sb-selo-ponto" aria-hidden="true" />
      Coleção {colecao.nome}
    </>
  );
  return link ? (
    <Link className="sb-selo" style={estilo} href={`/colecoes/${colecao.chave}`}>
      {conteudo}
    </Link>
  ) : (
    <span className="sb-selo" style={estilo}>
      {conteudo}
    </span>
  );
}

export function CardProduto({ modelo, colecao }: { modelo: Modelo; colecao?: Colecao }) {
  const foto = modelo.fotos[0] ?? { src: modelo.cores[0]?.foto, alt: modelo.cores[0]?.alt };
  return (
    <Link className="sb-card" href={`/modelos/${modelo.slug}`}>
      <div className="sb-card-foto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={foto.src} alt={foto.alt} loading="lazy" />
      </div>
      <div className="sb-card-corpo">
        {colecao && <SeloColecao colecao={colecao} />}
        <h3 className="titulo-2 sb-card-nome">{modelo.nome}</h3>
        <p className="corpo-pequeno sb-card-desc">{modelo.resumo}</p>
        <div className="sb-card-pe">
          <span className="preco">{modelo.preco}</span>
          <span className="sb-card-cores">
            {modelo.cores.slice(0, 3).map((c) => (
              <span key={c.chave} className="sb-cor" title={c.nome} style={{ background: c.valor }} />
            ))}
            <span className="sr-only">
              {modelo.cores.length} {modelo.cores.length === 1 ? "cor" : "cores"}: {modelo.cores.map((c) => c.nome).join(", ")}
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}

export function HeroCampanha({
  colecao,
  titulo,
  frase,
  foto,
  alt,
  acao,
  href,
  acaoSecundaria,
  hrefSecundaria,
  comoTitulo = "h1",
}: {
  colecao: Colecao;
  titulo: string;
  frase?: string;
  foto: string;
  alt: string;
  acao?: string;
  href?: string;
  acaoSecundaria?: string;
  hrefSecundaria?: string;
  comoTitulo?: "h1" | "h2";
}) {
  const Titulo = comoTitulo;
  const estilo: ComCor = { "--sb-cor": colecao.corLaje };
  return (
    <section className="sb-hero" style={estilo} aria-label={`Campanha ${titulo}`}>
      <div className="sb-hero-in">
        <div className="sb-hero-txt">
          <SeloColecao colecao={colecao} />
          <Titulo className="sb-hero-titulo">{titulo}</Titulo>
          {frase && <p className="sb-hero-frase">{frase}</p>}
          {(acao || acaoSecundaria) && (
            <div className="sb-hero-acoes">
              {acao && href && <Botao href={href}>{acao}</Botao>}
              {acaoSecundaria && hrefSecundaria && (
                <Botao variante="secundario" href={hrefSecundaria}>
                  {acaoSecundaria}
                </Botao>
              )}
            </div>
          )}
        </div>
        <div className="sb-hero-visual">
          <div className="sb-hero-laje">
            <div className="sb-hero-padrao" style={{ backgroundImage: `url(${colecao.padrao})` }} />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="sb-hero-foto" src={foto} alt={alt} fetchPriority="high" />
        </div>
      </div>
    </section>
  );
}

export function PassosEncomenda({
  passos,
  titulo = "Sua bolsa, feita para você",
  rotulo = "Como encomendar",
  acao = "Chamar no WhatsApp",
  href,
}: {
  passos: Passo[];
  titulo?: string;
  rotulo?: string;
  acao?: string;
  href: string;
}) {
  return (
    <section className="sb-passos" id="encomendas" aria-labelledby="passos-titulo">
      <div className="sb-passos-in">
        <span className="rotulo sb-passos-rot">{rotulo}</span>
        <h2 className="sb-passos-titulo" id="passos-titulo">
          {titulo}
        </h2>
        <ol className="sb-passos-lista">
          {passos.map((s, i) => (
            <li key={s.titulo} className="sb-passo">
              <span className="sb-passo-num" aria-hidden="true">
                {i + 1}
              </span>
              <span className="sb-passo-nome">{s.titulo}</span>
              <span className="sb-passo-txt">{s.texto}</span>
            </li>
          ))}
        </ol>
        <Botao href={href} externo>
          {acao}
        </Botao>
      </div>
    </section>
  );
}

export function RodapeSite({ config, whatsapp }: { config: Configuracoes; whatsapp: string }) {
  const colunas = [
    {
      titulo: "Loja",
      links: [
        { rotulo: "Coleções", href: "/colecoes" },
        { rotulo: "Encomendas", href: "/encomendas" },
        { rotulo: "Cuidados", href: "/cuidados" },
      ],
    },
    { titulo: "Ateliê", links: [{ rotulo: "Nossa história", href: "/atelie" }] },
    {
      titulo: "Contato",
      links: [
        { rotulo: "Instagram", href: config.instagram },
        { rotulo: "WhatsApp", href: whatsapp },
        ...(config.email ? [{ rotulo: "E-mail", href: `mailto:${config.email}` }] : []),
      ],
    },
  ];
  return (
    <footer className="sb-rod">
      <div className="sb-rod-in">
        <div className="sb-rod-marca">
          <Logo />
          <p className="sb-rod-ass">{config.assinatura}</p>
        </div>
        <div className="sb-rod-cols">
          {colunas.map((c) => (
            <nav key={c.titulo} className="sb-rod-col" aria-label={c.titulo}>
              <span className="rotulo">{c.titulo}</span>
              {c.links.map((l) =>
                /^(https?:|mailto:)/.test(l.href) ? (
                  <a key={l.rotulo} href={l.href} target={l.href.startsWith("mailto:") ? undefined : "_blank"} rel="noopener noreferrer">
                    {l.rotulo}
                  </a>
                ) : (
                  <Link key={l.rotulo} href={l.href}>
                    {l.rotulo}
                  </Link>
                ),
              )}
            </nav>
          ))}
        </div>
      </div>
      <div className="sb-rod-base">
        <span>Feita à mão em {config.cidade}, com raiz em Salvador</span>
        <span>
          © {new Date().getFullYear()} {config.nome}
        </span>
      </div>
    </footer>
  );
}
