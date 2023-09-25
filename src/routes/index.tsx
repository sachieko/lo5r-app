import { ItemCard } from "../components/ItemCard";
import menucards from "../assets/menu.json";
import { useEffect, useState } from "react";

export const Index = function () {
  const [fadeIn, setFadeIn] = useState<boolean>(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFadeIn(true);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, []);

  const items = menucards.map((item, index) => {
    return (
      <ItemCard
        key={index}
        title={item.title}
        desc={item.desc}
        url={item.url}
      />
    );
  });

  return <div className={`menu ${fadeIn ? "fade" : ""}`}>{items}</div>;
};
