import { useLoaderData, Params } from "react-router-dom";
import { ItemCard } from "../components/ItemCard";
import { getRule } from "../helpers/ruleHelpers";
import FetchedParagraphs from "../helpers/LinkParser";
import { TRule } from "../helpers/types";

export async function loader({ params }: { params: Params<string> }) {
  const ruleData = await getRule(params.ruleId);
  return ruleData;
}

export default function Rule() {
  const rule = useLoaderData() as TRule;

  // All rules have the title and info sent back, but this is inefficient and will be refactored later on the API end.
  const title = rule.title;
  const details = FetchedParagraphs(rule.detail.split("\n"));

  const cards = rule.cards.map((card) => {
    return (
      <ItemCard
        key={card.id}
        title={card.header}
        desc={card.content}
      />
    );
  });

  return (
    <>
      <div className="card">
        <div className="title">{title}</div>
        <div className="desc">{details}</div>
        {cards}
      </div>
    </>
  );
}
