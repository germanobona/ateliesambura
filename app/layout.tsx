import type { Metadata } from "next";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "@fontsource/cormorant-garamond/600-italic.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "./globals.css";
import { Cabecalho } from "@/components/Cabecalho";
import { RodapeSite } from "@/components/marca";
import { getConfiguracoes, linkWhatsApp } from "@/lib/conteudo";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getConfiguracoes();
  return {
    title: { default: `${c.nome} | Bolsas de crochê feitas à mão em Brasília`, template: `%s | ${c.nome}, Brasília` },
    description: c.descricao,
    icons: { icon: "/icone.svg" },
    openGraph: { siteName: c.nome, locale: "pt_BR", type: "website" },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const config = await getConfiguracoes();
  return (
    <html lang="pt-BR">
      <body>
        <a className="pular" href="#conteudo">
          Pular para o conteúdo
        </a>
        <Cabecalho />
        <main id="conteudo">{children}</main>
        <RodapeSite config={config} whatsapp={linkWhatsApp(config)} />
      </body>
    </html>
  );
}
