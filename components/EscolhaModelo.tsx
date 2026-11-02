"use client";

import { useMemo, useState } from "react";
import type { CorModelo, FotoModelo } from "@/lib/tipos";

/**
 * Galeria + escolha de cor + botão de encomenda da página do modelo.
 * Ao escolher uma cor, a foto principal e a mensagem do WhatsApp mudam juntas.
 */
export function EscolhaModelo({
  nome,
  fotos,
  cores,
  whatsappBase,
  mensagem,
  children,
}: {
  nome: string;
  fotos: FotoModelo[];
  cores: CorModelo[];
  /** Ex.: https://wa.me/5561… (sem ?text) */
  whatsappBase: string;
  /** Modelo de mensagem com {modelo} e {cor}. */
  mensagem: string;
  /** Conteúdo do painel de informações, abaixo do nome. */
  children: React.ReactNode;
}) {
  const [cor, setCor] = useState(cores[0]);

  // Fotos da galeria: a foto da cor escolhida primeiro, depois as demais do modelo.
  const galeria = useMemo(() => {
    const daCor = cor ? [{ src: cor.foto, alt: cor.alt }] : [];
    const resto = fotos.filter((f) => f.src !== cor?.foto).map((f) => ({ src: f.src, alt: f.alt }));
    return [...daCor, ...resto];
  }, [cor, fotos]);
  const [indice, setIndice] = useState(0);
  const atual = galeria[Math.min(indice, galeria.length - 1)];

  const link = `${whatsappBase}?text=${encodeURIComponent(
    mensagem.replace("{modelo}", nome).replace("{cor}", cor?.nome ?? "que eu escolher"),
  )}`;

  return (
    <>
      <div className="sb-produto">
        <div>
          <div className="sb-galeria-principal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={atual.src} alt={atual.alt} />
          </div>
          {galeria.length > 1 && (
            <div className="sb-galeria-miniaturas">
              {galeria.map((f, i) => (
                <button key={f.src} type="button" aria-pressed={i === indice} aria-label={`Ver foto ${i + 1}: ${f.alt}`} onClick={() => setIndice(i)}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.src} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="sb-produto-info">
          {children}
          {cores.length > 0 && (
            <fieldset className="sb-cores-escolha">
              <legend className="rotulo">Cor: {cor?.nome}</legend>
              <div className="sb-cores-lista">
                {cores.map((c) => (
                  <button
                    key={c.chave}
                    type="button"
                    className="sb-cor-opcao"
                    aria-pressed={c.chave === cor?.chave}
                    onClick={() => {
                      setCor(c);
                      setIndice(0);
                    }}
                  >
                    <span className="sb-cor" style={{ background: c.valor }} aria-hidden="true" />
                    {c.nome}
                  </button>
                ))}
              </div>
            </fieldset>
          )}
          <a className="sb-btn sb-btn-primario" href={link} target="_blank" rel="noopener noreferrer">
            Encomendar pelo WhatsApp
          </a>
        </div>
      </div>
      <div className="sb-encomenda-fixa">
        <a className="sb-btn sb-btn-primario" href={link} target="_blank" rel="noopener noreferrer">
          Encomendar {nome}
          {cor ? ` · ${cor.nome}` : ""}
        </a>
      </div>
    </>
  );
}
