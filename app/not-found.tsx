import { Botao } from "@/components/marca";

export default function NaoEncontrada() {
  return (
    <section className="sb-secao" style={{ textAlign: "center" }}>
      <h1 className="display" style={{ color: "var(--marca)" }}>Essa página escapou da trama</h1>
      <p className="sb-texto" style={{ margin: "0 auto var(--espaco-4)" }}>O endereço pode ter mudado. Que tal começar pelas coleções?</p>
      <Botao href="/colecoes">Ver as coleções</Botao>
    </section>
  );
}
