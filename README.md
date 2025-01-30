# L5R Standard Reference Document App

This app is to contain useful reference information for players while playing the tabletop roleplaying game: [Legend of the Five Rings (Edge Studio under Fantasy Flight Games)](https://www.edge-studio.net/games/l5r-core-rulebook/).

Those interested in the game should reference the core rulebook and rely on experience in other tabletop roleplaying games if planning to run the game, but this app is supposed to serve as a resource to help a storyteller (GM) and players to reference certain rules quickly, making the game more accessible to new players.

It is currently deployed via Cloudflare at [https://lo5r-app.pages.dev](https://lo5r-app.pages.dev)
This is a personal hobby project so I wouldn't expect a lot from it, but if you do like the project and want to contribute or ask about features/issues, feel free to reach out to me or open a github issue.

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
  * Site has opportunities page where opportunities are displayed in a table ✅
    1. Allow users to filter results in the table by ring, category, etc. ✅
    2. Allow users to view techniques related to opportunities on this page by clicking it in the table. ✅
  * Site has equipment pages for weapons, armor, etc
    1. Allow users to filter results in the tables by category, type, damage, etc.✅
    2. Weapons table ✅
      * Weapons table has links to qualities table
    3. Armor table
      * Armor table has links to the qualities table
    4. Item table
      * Item table has links to the qualities table as necessary
    5. Qualities table ✅
  * Site has conditions page for conditions ✅
    1. Update link filters for conditions ✅
  * Site has terrain qualities page for terrain ✅
    1. Update link filters for terrain qualities ✅
* Advanced features
  * Some tables have specific keywords for strict filtering, such as the ring names for opportunities only showing opportunities of that type ✅
  * Keywords can be mapped to their RESTful route for quick navigation ✅
    1. Improve or automate the mapping for certain words. API could create this instead of the hacky solution I use now.
  * Create admin suite for quick insertion of new values into database (This is not a priority, and would just make it easier for non-developers to contribute to my project)
    1. Use authorization via username & password
    2. Allow admin to insert resources
  * This roadmap is being added to!
 
  ### Current Priority - refactoring so views are more DRY in the future

  ## Dependencies 

Frontend:
  * Developed using node v20.8.0, VITE v4.4.5 using React 18.2.0 + Typescript
  * Axios 1.4.0
  * Sass 1.66.1
  * React-Router 6.15

Backend:
  * Developed using node v20.8.0, Express v4.18.2 with a PostgreSQL database
  * Cloudflare Workers (Has replaced netlify functions as both services have migrated)
  * @types/express
  * itty-router
  * dotenv
  * cors
  * pg
  * serverless-http
  * chalk (debugging dependency)
