import type { MetadataRoute } from "next";
import { getColecoes, getModelos } from "@/lib/conteudo";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://exemplo.com.br";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [colecoes, modelos] = await Promise.all([getColecoes(), getModelos()]);
  return [
    ...["", "/colecoes", "/encomendas", "/atelie", "/cuidados"].map((p) => ({ url: `${BASE}${p}` })),
    ...colecoes.map((c) => ({ url: `${BASE}/colecoes/${c.chave}` })),
    ...modelos.map((m) => ({ url: `${BASE}/modelos/${m.slug}` })),
  ];
}
