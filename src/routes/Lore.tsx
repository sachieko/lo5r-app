import { useLoaderData, Params } from "react-router-dom";
import { ItemCard } from "../components/ItemCard";
import { getLore } from "../helpers/loreHelpers";
import FetchedParagraphs from "../helpers/LinkParser";
import { TLore } from "../helpers/types";
import { useEffect, useState } from "react";

export async function loader({ params }: { params: Params<string> }) {
  const loreData = await getLore(params.loreId);
  return loreData;
}

export default function Lore() {
  const lore = useLoaderData() as TLore;
  const [fadeIn, setFadeIn] = useState<boolean>(true);
  // To allow fade in of UI elements
  useEffect(() => {
    setFadeIn(false);
    const timeoutId = setTimeout(() => {
      setFadeIn(true);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [setFadeIn]);

  // All lore will have the title and detail sent back, but this is inefficient and will be refactored later on the API end.
  const title = lore.title;
  const details = FetchedParagraphs(lore.detail.split("\n"));

  const cards = lore.cards.map((card) => {
    return <ItemCard key={card.id} title={card.header} desc={card.content} />;
  });

  return (
    <>
      <div className={`fadeElement ${fadeIn ? "fade" : ""}`}>
        <div className="card">
          <div className="title">{title}</div>
          <div className="desc">{details}</div>
          {cards}
        </div>
      </div>
    </>
  );
}
