/**
 * Camada de conteúdo.
 *
 * Todas as páginas leem dados SOMENTE por estas funções. Hoje elas leem os
 * arquivos JSON de /content. Para ligar um painel de edição (CMS) no futuro,
 * basta reescrever as funções deste arquivo para buscar no CMS, mantendo os
 * mesmos tipos de retorno de lib/tipos.ts. Componentes e páginas não mudam.
 */
import colecoesJson from "@/content/colecoes.json";
import modelosJson from "@/content/modelos.json";
import campanhasJson from "@/content/campanhas.json";
import paginasJson from "@/content/paginas.json";
import configJson from "@/content/configuracoes.json";
import type {
  Campanha,
  ChaveColecao,
  Colecao,
  Configuracoes,
  Modelo,
  Paginas,
} from "./tipos";

const colecoes = colecoesJson as Colecao[];
const modelos = modelosJson as Modelo[];
const campanhas = campanhasJson as Campanha[];
const paginas = paginasJson as Paginas;
const config = configJson as Configuracoes;

export async function getConfiguracoes(): Promise<Configuracoes> {
  return config;
}

export async function getColecoes(): Promise<Colecao[]> {
  return [...colecoes].sort((a, b) => a.ordem - b.ordem);
}

export async function getColecao(chave: string): Promise<Colecao | undefined> {
  return colecoes.find((c) => c.chave === chave);
}

export async function getModelos(filtro?: { colecao?: ChaveColecao; destaque?: boolean }): Promise<Modelo[]> {
  return modelos.filter(
    (m) =>
      (filtro?.colecao === undefined || m.colecao === filtro.colecao) &&
      (filtro?.destaque === undefined || m.destaque === filtro.destaque),
  );
}

export async function getModelo(slug: string): Promise<Modelo | undefined> {
  return modelos.find((m) => m.slug === slug);
}

/** Campanha que abre a página inicial (definida em Configurações). */
export async function getCampanhaAtiva(): Promise<Campanha> {
  return campanhas.find((c) => c.id === config.campanhaAtiva) ?? campanhas[0];
}

/** Campanha mais recente de uma coleção, se houver. */
export async function getCampanhaDaColecao(chave: ChaveColecao): Promise<Campanha | undefined> {
  return campanhas.filter((c) => c.colecao === chave).sort((a, b) => b.inicio.localeCompare(a.inicio))[0];
}

export async function getPaginas(): Promise<Paginas> {
  return paginas;
}

/** Link do WhatsApp com a mensagem de encomenda preenchida. */
export function linkWhatsApp(cfg: Configuracoes, modelo?: string, cor?: string): string {
  const texto = modelo
    ? cfg.mensagemEncomenda.replace("{modelo}", modelo).replace("{cor}", cor ?? "que eu escolher")
    : "Oi! Vim pelo site do Ateliê Samburá.";
  const numero = cfg.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
}
