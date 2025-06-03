import { ItemCard } from "../components/ItemCard";
import menucards from "../assets/menu.json";
import announcements from "../assets/announcements";
import { useEffect, useState } from "react";

export const Index = function () {
  const [fadeIn, setFadeIn] = useState<boolean>(false);
  const [hideAnnounce, setHideAnnounce] = useState<boolean>(false);
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

  const announceList = announcements.map((announcement, index) => {
    const paragraphs = announcement.text.split("\n").map((paragraph, index) => {
      return <p key={index}>{paragraph}</p>;
    });
    return (
      <div className="announce-card" key={index}>
        <p className="announce-title">
          {announcement.title} - {announcement.date}
        </p>
        {paragraphs}
      </div>
    );
  });

  return (
    <section className="main-menu">
      <div
        id="announce-container"
        className={`${hideAnnounce ? "fadeout" : ""}`}
        onClick={() => setHideAnnounce(true)}
      >
        {announceList}
      </div>
      <div className={`menu ${fadeIn ? "fade" : ""}`}>{items}</div>
    </section>
  );
};
