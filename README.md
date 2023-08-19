# L5R Standard Reference Document App

This app is to contain useful reference information for players while playing the tabletop roleplaying game: [Legend of the Five Rings (Fantasy Flight Games & Recently Edge Studio)](https://www.edge-studio.net/games/l5r-core-rulebook/).

Those interested in the game should reference the core rulebook and rely on experience in other tabletop roleplaying games if planning to run the game, but this app is supposed to serve as a resource to help a storyteller (GM) and players to reference certain rules quickly, making the game more accessible to new players.

This is a personal hobby project so while I wouldn't expect a lot from it, but if you do like the project and want to contribute or ask about features/issues, feel free to reach out to me.

## Roadmap for Development

* Basic features 
  * Site has character creation details ✅
    1. 20 questions are referenced from database ✅
    2. Character sheet changes are noted ✅
    3. Detailed information is included
    4. Allow users to quickly navigate between questions ✅
  * Site has rule pages
    1. Rules can be viewed in a list (sort by type?)
    2. Clicking a rule allows users to view it without hiding list
    3. Keywords can be mapped to their RESTful route for quick navigation ✅
  * Convert app to Typescript as the project is getting large ✅
    1. Create replacements for JSX/JS files ✅
    2. Future: Create separate interface file
  * Site can search for resources using the search bar
    1. API returns the correct resources based on the search
    2. The site displays them appropriately in a dropdown view
    3. Ensure consistency with mobile views
  * Site has basic lore pages to explain concepts integral to L5R
    1. Explain bushido, small snippets for clans, Japanese terms
* Advanced features
  * Create admin suite for quick insertion of new values into database
    1. Use authorization via username & password
    2. Allow admin to insert rules or lore resources
  * Other things as I think of them