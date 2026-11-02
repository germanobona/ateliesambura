import type { Metadata } from "next";
import { getPaginas } from "@/lib/conteudo";

export const metadata: Metadata = {
  title: "Cuidados com a bolsa de crochê",
  description: "Como lavar, secar e guardar sua bolsa de crochê para ela durar muitos anos.",
};

export default async function Cuidados() {
  const p = (await getPaginas()).cuidados;
  return (
    <section className="sb-secao">
      <div className="sb-pagina-texto">
        <span className="rotulo sb-secao-rot">Cuidados</span>
        <h1 className="display">{p.titulo}</h1>
        <p className="sb-texto">{p.introducao}</p>
      </div>
      <div className="sb-cuidados">
        {p.itens.map((i) => (
          <div key={i.titulo} className="sb-cuidado">
            <h2 className="titulo-2">{i.titulo}</h2>
            <p>{i.texto}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
