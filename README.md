# Ateliê Samburá — site

Primeiro modelo do site da loja (fase 1: vitrine com encomenda pelo WhatsApp), construído com os componentes e tokens do design system **Ateliê Samburá**.

## Rodar no computador

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # versão de produção
```

Requer Node.js 18.18 ou mais recente.

## Como o projeto está organizado

```
content/              ← TODO o conteúdo do site (editar aqui)
  configuracoes.json    WhatsApp, Instagram, mensagem de encomenda, campanha ativa
  colecoes.json         as 5 coleções (cor, frase, padrão, ordem)
  modelos.json          bolsas: fotos, cores, preço, medidas, materiais, prazo
  campanhas.json        campanhas de lançamento
  paginas.json          textos de início, encomendas, ateliê e cuidados
lib/
  tipos.ts              o "contrato" de cada tipo de conteúdo
  conteudo.ts           ÚNICO ponto que lê o conteúdo (troca-se aqui pelo CMS)
components/
  marca.tsx             Logo, Botao, SeloColecao, CardProduto, HeroCampanha,
                        PassosEncomenda, RodapeSite (portados do design system)
  Cabecalho.tsx         cabeçalho com menu de celular
  EscolhaModelo.tsx     galeria, escolha de cor e botão de encomenda
app/                  ← páginas
  page.tsx              início
  colecoes/             lista e página de cada coleção
  modelos/[slug]/       página de cada bolsa
  encomendas/ atelie/ cuidados/
  globals.css           tokens e estilos (espelho do design system)
public/img/           fotos (WebP) e padrões gráficos
```

## Tarefas do dia a dia

- **Trocar a campanha da página inicial:** em `content/configuracoes.json`, mude `campanhaAtiva` para o `id` de uma campanha de `content/campanhas.json`. O hero, a cor da laje e a ordem das coleções mudam juntos.
- **Nova bolsa:** adicione um item em `content/modelos.json` e as fotos em `public/img/produtos/` (WebP, 4:5).
- **Nova cor de um modelo:** adicione em `cores` do modelo, com a foto da bolsa naquela cor.

## Antes de publicar (pendências)

- [ ] Número do WhatsApp em `configuracoes.json` (hoje vazio: o botão abre o WhatsApp sem destinatário).
- [ ] Endereço do Instagram e e-mail.
- [ ] Medidas de cada modelo (hoje "A definir") e prazo da Samburá Cacau.
- [ ] Prazo das cores Bahia Viva: hoje "Cerca de 2 dias", conforme o design system; confirmar.
- [ ] Formas e valores de entrega (resposta nas perguntas frequentes).
- [ ] Domínio: definir `NEXT_PUBLIC_SITE_URL` na Vercel para o mapa do site.
- [ ] Nomes dos modelos da Linha Bahia Viva (Itapuã, Dendê, Mandacaru) — confirmar com a artesã.

## Próxima etapa: painel de edição (CMS)

O site já separa conteúdo de layout. Para a artesã editar sem mexer em código:

1. Escolher o painel (recomendação inicial: **Decap CMS**, que grava no próprio GitHub).
2. Descrever no painel os mesmos campos de `lib/tipos.ts`.
3. Se o painel gravar fora do repositório (Sanity, Supabase), reescrever só `lib/conteudo.ts` para ler de lá.

Nenhuma página ou componente precisa mudar.

## Fontes

Cormorant Garamond e DM Sans, servidas pelo próprio site (pacotes `@fontsource`), sem depender do Google Fonts. Licença SIL Open Font License.
