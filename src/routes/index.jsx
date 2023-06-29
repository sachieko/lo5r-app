import { ItemCard } from "../components/ItemCard";

export const Index = function() {
    return (
        <>
        <ItemCard 
            title="Here's a title!" 
            desc={`Here's a big ol long description, it's supposed to be a gigantic string. So it will have a few paragraphs and say ipsum lorat or some other stuff.
            If it has a random indentation how will that look? It will not show. Thanks html!
            Did you know that kangaroos can't hop backwards? Now you do. Thanks snapple.`}
        />
        </>
    );
};