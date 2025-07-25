# L5R Standard Reference Document App

This app is to contain useful reference information for players while playing the tabletop roleplaying game: [Legend of the Five Rings (Edge Studio under Fantasy Flight Games)](https://www.edge-studio.net/games/l5r-core-rulebook/).

Those interested in the game should reference the core rulebook and rely on experience in other tabletop roleplaying games if planning to run the game, but this app is supposed to serve as a resource to help a storyteller (GM) and players to reference certain rules quickly, making the game more accessible to new players.

It is currently deployed via Cloudflare at [https://lo5r.yuseiko.org](https://lo5r.yuseiko.org)
This is a personal hobby project so I wouldn't expect a lot from it, but if you do like the project and want to contribute or ask about features/issues, feel free to reach out to me or open a github issue. Development updates are regularly put on the home page as well!

## Roadmap for Development

* Basic features 
  * Site has character creation details ✅
    1. 20 questions are referenced from database ✅
    2. Character sheet changes are noted ✅
    3. Detailed information is included (School information is a to do at a later date)
    4. Allow users to quickly navigate between questions ✅
  * Site has rule pages ✅
    1. Rules can be viewed in a list ✅
    2. Clicking a rule allows users to view it without hiding list ✅
  * Built with Typescript (Support for both Front and Backend) ✅
  * Site can search for resources using the search bar 
    1. API returns the correct resources based on the search ✅
    2. The site displays them appropriately in a dropdown view ✅
    3. Ensure consistency with mobile views ✅
    4. Can find: rules ✅, lore ✅, techniques ✅, keywords (such as opportunities)
  * Site has basic lore pages to explain concepts integral to L5R ✅
    1. Explain bushido ✅, 
    2. Small snippets for clans, 
    3. Explain currency (koku) ✅
    4. Various misc Japanese terms
  * Site has technique pages where techniques are sorted by type ✅
    1. Techniques can be quickly filtered by type  ✅
    2. Can be searched for in a box, and clicking one allows you to view the details for the technique. ✅
    3. Techniques associated with a particular Ring can be filtered for.
  * Site has opportunities page where opportunities are displayed in a table ✅
    1. Allow users to filter results in the table by ring, category, etc. ✅
    2. Allow users to view techniques related to opportunities on this page by clicking it in the table. ✅
  * Site has equipment pages for weapons, armor, etc
    1. Allow users to filter results in the tables by category, type, damage, etc.✅
    2. Weapons table ✅
    3. Weapons table has links to qualities table (requires refactoring of qualities via backend)
    4. Armor table
    5. Armor table has links to the qualities table (see 3.)
    6. Item table
    7. Item table has links to the qualities table (see 3.)
    8. Qualities table ✅
  * Site has conditions page for conditions ✅
    1. Update link filters for conditions ✅
  * Site has terrain qualities page for terrain ✅
    1. Update link filters for terrain qualities ✅
  * Site has announcement page for dev updates ✅
* Advanced features
  * Some tables have specific keywords for strict filtering, such as the ring names for opportunities only showing opportunities of that type ✅
  * Keywords can be mapped to their RESTful route for quick navigation ✅
    1. Improve or automate the mapping for certain words. API could create this instead of the hacky solution I use now.
  * Create admin suite for quick insertion of new values into database (This is not a priority, and would just make it easier for non-developers to contribute to my project)
    1. Use authorization via username & password
    2. Allow admin to insert resources
  * This roadmap is being added to!
 
  ### Current Priority - Add important rule pages that are referenced often, improve keyword filtering creation, add armor and adv/disadv tables.

  ## Dependencies - Version 1.3.2

Frontend:
  * Currently using: node v23.6.1, VITE v6.3.5 using React 18.2.0 + Typescript 5.0.2
  * Axios 1.4.0
  * Sass 1.66.1
  * React-Router 6.29.0

Backend [Repo Located here](https://github.com/sachieko/lo5r-back):
  * Implemented currently with express and a PostgreSQL database.
  * @types/express
  * dotenv
  * cors
  * pg
  * chalk (debugging dependency)