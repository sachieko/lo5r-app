import { Client } from "pg";

type TCard = {
  id: number;
  header: string;
  content: string;
}

type TLore = {
  id: number;
  title: string;
  detail: string;
  image: string;
  cards: TCard[];
}

const formatLoreResult = function (loreResult) {
  const result: TLore[] = [];
  let currentLore: null | TLore = null;
  for (const row of loreResult.rows) {
    // If there isn't a current lore or the id has changed, make a new currentLore and add to the result array
    if (currentLore === null || currentLore.id !== row.id) {
      currentLore = {
        id: row.id,
        title: row.title,
        detail: row.detail,
        image: row.image_url,
        cards: [],
      };
      result.push(currentLore);
    }

    // Add cards to the card array
    if (row.card_id) {
      currentLore.cards.push({
        id: row.card_id,
        header: row.header,
        content: row.content,
      });
    }
  }
  return result;
};

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const db = new Client(env.DB_URL);
    await db.connect();

    // Query lore
    const query = `
    SELECT lore.*, cards.id AS card_id, cards.header, 
    cards.content FROM lore
    LEFT JOIN cards ON lore.id = lore_id
    ORDER BY lore.id, cards.id;`
    const loreResult = await db.query(query);
    const result: TLore[] = formatLoreResult(loreResult)
    // Return the result as JSON
    const resp = new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });

    // Clean up the client
    ctx.waitUntil(db.end());
    return resp;
  },
};
