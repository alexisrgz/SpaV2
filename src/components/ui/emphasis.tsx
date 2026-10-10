import { Fragment } from "react";

/** Convierte "Regálate un momento para *volver a ti*" en texto con <em>. */
export function Emphasis({ text }: { text: string }) {
  const parts = text.split(/\*(.+?)\*/g);
  return (
    <>
      {parts.map((part, i) => (i % 2 === 1 ? <em key={i}>{part}</em> : <Fragment key={i}>{part}</Fragment>))}
    </>
  );
}

