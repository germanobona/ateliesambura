/**
 * Modelo de conteúdo do site.
 *
 * Estes tipos são o "contrato" entre o conteúdo e o layout. Hoje o conteúdo
 * vem dos arquivos em /content; quando o painel de edição (CMS) entrar, ele
 * deve produzir exatamente estas mesmas formas, e nenhuma página precisa mudar.
 */

/** Chave de coleção, igual aos tokens do design system. */
export type ChaveColecao = "mata" | "mar" | "reconcavo" | "sertao" | "chapada";

/** Linha da marca. */
export type Linha = "Terra" | "Bahia Viva";

export interface Colecao {
  chave: ChaveColecao;
  nome: string;
  linhas: Linha[];
  /** Variável CSS da cor do selo (token do design system). */
  corSelo: string;
  /** Cor fixa da laje do hero (versão escura e legível do token). */
  corLaje: string;
  frase: string;
  descricao: string;
  /** Padrão gráfico do grupo Padroes, usado a 18% na laje. */
  padrao: string;
  ordem: number;
}

export interface CorModelo {
  /** Identificador da cor (ex.: "mar-de-itapua"). */
  chave: string;
  nome: string;
  /** Valor hexadecimal para a bolinha de cor. */
  valor: string;
  /** Foto da bolsa nesta cor. */
  foto: string;
  alt: string;
}

export interface FotoModelo {
  src: string;
  alt: string;
  /** Papel da foto no padrão de fotografia da marca. */
  tipo: "still" | "alca" | "trama" | "lifestyle";
}

export interface Modelo {
  slug: string;
  nome: string;
  colecao: ChaveColecao;
  linha: Linha;
  /** Frase curta para o card. */
  resumo: string;
  descricao: string;
  /** Fotos no padrão: still, alça, trama, lifestyle. */
  fotos: FotoModelo[];
  cores: CorModelo[];
  /** "Sob encomenda" ou "A partir de R$ …". */
  preco: string;
  medidas: string;
  materiais: string;
  prazo: string;
  status: "encomenda" | "pronta-entrega";
  destaque: boolean;
}

export interface Campanha {
  id: string;
  colecao: ChaveColecao;
  titulo: string;
  frase: string;
  /** Slug do modelo cuja foto abre a campanha. */
  modelo: string;
  /** Foto específica do hero (opcional; padrão: still do modelo). */
  foto?: string;
  alt?: string;
  inicio: string;
  fim?: string;
}

export interface Passo {
  titulo: string;
  texto: string;
}

export interface Pergunta {
  pergunta: string;
  resposta: string;
}

export interface Paginas {
  inicio: {
    colecoesRotulo: string;
    colecoesTitulo: string;
    bastidorRotulo: string;
    bastidorFrase: string;
    bastidorTexto: string;
    bastidorFoto: string;
    bastidorAlt: string;
  };
  encomendas: {
    titulo: string;
    introducao: string;
    passos: Passo[];
    perguntas: Pergunta[];
  };
  atelie: {
    titulo: string;
    frase: string;
    paragrafos: string[];
    foto: string;
    alt: string;
  };
  cuidados: {
    titulo: string;
    introducao: string;
    itens: { titulo: string; texto: string }[];
  };
}

export interface Configuracoes {
  nome: string;
  assinatura: string;
  descricao: string;
  /** Número do WhatsApp só com dígitos, com DDI e DDD (ex.: 5561999999999). */
  whatsapp: string;
  instagram: string;
  email: string;
  /** Mensagem de encomenda; {modelo} e {cor} são substituídos. */
  mensagemEncomenda: string;
  /** Id da campanha que abre a página inicial. */
  campanhaAtiva: string;
  cidade: string;
}
