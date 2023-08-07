import { ItemCard } from "../components/ItemCard";
import menucards from "../assets/menu.json";

export const Index = function() {
    const items = menucards.map((item, index) => {
        return <ItemCard key={index} title={item.title} desc={item.desc} url={item.url}/>
    });

    return (
        <>
        {items}
        </>
    );
};