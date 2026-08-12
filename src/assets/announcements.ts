type announcement = {
  title: string;
  text: string;
  date: string;
}

const announcements: announcement[] = [
  {
    title: "Fields of Victory Update! まだまだファイティング!",
    text: `A second update? Yes! Fields of Victory [Techniques] added! This means you can get your [Mass Battle]s on with more convenience!
    
    A few tables have had some adjustments, namely the [Opportunity] table which no longer has piles and piles of opportunities attached to [Techniques].
    Instead, now you just have more general [Opportunity] spends not attached to a [Technique]. Extra [Opportunity] spends from books will be added eventually.
    Also, it's possible to link to specific [Opportunity] spends on the table now, which will be more useful when I add page numbers so you can refer to the
    ones suggested by rulebooks!
    \n Some issues with the [Opportunity] table has been fixed, and spacing is a bit better on all tables, search bars lost the magnifying glass but a 
    styles overhaul might be further down the road yet. 
    \n[Advantages] and [Disadvantages] are still on the docket, but before that I will be creating some quick buttons to help manage the filters on tables better.
    
    まだまだファイティング!!! - 清子`,
    date: "11/8/2026",
  },
  {
    title: "Sneaky Update!",
    text: `Sudden Updates. Sneaky Updates. [Ninjutsu] Updates! 
    Spacing has been improved on a lot of entries.
    \n[Techniques] have gotten a bit of an overhaul, with more searchable fields and sub-categorization such as General [Kata] vs Close Combat [Kata], but tons more. \nThese are not exhaustive, I add them myself for your convenience. If you have specific requests just @me somehow.
    \nCourts of Stone has had all of its [Techniques] added finally! Shinobi rejoice! They also do utilise the above improvements too!
    \nThere's been some review of older material to make sure it is cohesive.
    \nSome technical backend updates to keep current for security. These had some major changes, so that's the big news on my end.\nTable views should be more reliable on all devices and less variable.
    \nAdvantages and Disadvantages are still planned but this took priority since it was overdue, but more improvements to existing content are planned.
    
    ファイティング!! - 清子`,
    date: "11/8/2026",
  },
];

export default announcements;
