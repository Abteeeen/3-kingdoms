# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router) with Tailwind CSS, hosted on Vercel, with preview deploys for client review. Chosen by the studio on 13 Oct 2026. Pages are statically generated. The ordering provider is still undecided (see Capabilities and Constraints).

## Users

- **CBD workers and students on a lunch break.** Mostly on phones, often already in or near Uptown, with a short window. They need to know what to order, what it costs and where the counter is.
- **Followers of food creators.** They arrive from TikTok or Instagram posts, know the name, but don't know the location or how the bowl works.
- **Chinese-speaking diners** (students, residents, visitors). Today only HungryPanda carries Chinese copy.
- **Returning regulars** who want to order ahead at counter prices instead of paying app prices.

## Product Purpose

The restaurant's own home online. It replaces a mall listing with no menu and delivery apps that charge 22–34% above the counter. Success means:
- more pickup orders at counter prices;
- fewer "hard to find" complaints;
- one trusted source for hours, location and the menu.

## Positioning

A Chengdu dish, mao cai (冒菜), sold as a "mini hotpot": you pick your ingredients by weight and choose one of six spice levels, at a counter in Brisbane's CBD. The name 三国 (Three Kingdoms) links to Shu, the Three Kingdoms state centred on Chengdu, which is still the short name for Sichuan. Rivals in the same building sell malatang. None tells this story, and none has a Chinese-language menu.

## Operating Context

- Counter service. You order and pay at the counter, collect your bowl, self-serve utensils and water.
- Shop 32, Level A, Uptown, 91 Queen St, next to Target. Level A is also the level of the Queen Street Bus Station.
- Hours: Mon–Thu, Sat, Sun 11am–7pm; Fri 11am–7:30pm. Uptown itself closes at 5:30pm Mon–Thu, and how customers get in after that is unconfirmed.
- Today's online orders go through Uber Eats, DoorDash and HungryPanda. EatClub runs 30% off from 2–5pm daily.

## Capabilities and Constraints

- **Menu format:**
  - Build your own bowl by weight (500g, 1000g).
  - Set mini hotpots with rice: Signature, beef, lamb, fish, coriander and pork meatball, chicken, and others.
  - Noodle and rice-noodle soups, Sichuan cold sides and drinks.
  - Six spice levels, from not spicy to extra hot.
  - Most items may contain nuts.
- **Counter prices** (EatClub list price, matching a Google review): Signature $20.80, other mini hotpots and noodle soups $19.80, sides $6.90–$8.90. Prices for the build-your-own bowl, drinks and some sides are not verified.
- **Ordering:** there is no direct ordering system. At launch, the site shows the full menu and a ticket you build yourself. It must not claim online ordering or ordering ahead until a provider is live. Provider candidates such as Square Online, HungryHungry, me&u and Bopple are the owner's decision.
- **Undecided or unconfirmed:**
  - the spice level names;
  - access after Uptown closes;
  - the domain (3kingdoms.com.au is registered, owner unknown);
  - whether the shop takes phone orders;
  - whether Chapter 3 (Level E) is a sister venue;
  - Chinese dish names beyond 招牌冒菜, 牛肉冒菜, 毛血旺 and 酸辣粉.
- **Bilingual:** English and Simplified Chinese.

## Brand Commitments

- **Name:** 3 Kingdoms / 三国冒菜.
- **Logo:** white brush calligraphy on black with a small red seal. This is the real logo, and it must be used, not redrawn.
- **Colours:** packaging and menu images are red and black.
- **Voice:**
  - The official copy is plain.
  - Instagram uses epic Three Kingdoms war metaphors ("Flames rise like Red Cliff").
  - The Chinese copy is energetic ("麻辣升天").
- **Visual direction:** the studio chose the Broadside concept on 13 Oct 2026 (`concepts/README.md`).

## Evidence on Hand

- **Ratings (13 Oct 2026):** Google 4.2 (324), Uber Eats 4.6 (800+), DoorDash 4.5 (100+), HungryPanda 4.7 (724), EatClub 4.7 (1,326).
- **Review themes and verbatim quotes:** in `research/current-presence/content-and-language.md` §6.
- **Creator posts:** 10+, listed in the same file.
- **Our phone footage:** four clips in Google Drive, not yet downloaded.
- **Not available:** professional food photography; the logo as a vector file (only seen in screenshots); confirmed spice level names. None of these may be faked. Placeholders must be labelled.

## Product Principles

1. Counter truth first. Prices, hours and location must match the counter exactly.
2. Get them there. Every page answers "where is it and is it open now".
3. The bowl is yours. Lead with choice: ingredients, weight and heat.
4. Both languages are equal. Chinese is not a translation hidden behind a toggle.
5. The story is told once and briefly. Three Kingdoms is the hook, the food is the product.

## Accessibility & Inclusion

WCAG 2.2 AA. Allergen (nut) information is visible on every dish, not hidden. Spice levels are shown in words and symbols, never colour alone. Every motion respects `prefers-reduced-motion`. Chinese and English text both have correct `lang` attributes.
