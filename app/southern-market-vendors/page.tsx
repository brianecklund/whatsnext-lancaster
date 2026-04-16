import Link from "next/link";
import type { Metadata } from "next";
import { siteCopy, withSiteTitle } from "@/lib/site-copy";
import SpringHubBack from "@/app/spring/SpringHubBack";

export const metadata: Metadata = {
  title: withSiteTitle("Meet the vendors of Southern Market"),
  description:
    "Southern Market in Lancaster City: local food vendors, standholders, and Bar 1888—adapted from Fig Lancaster’s vendor guide.",
};

const FIG_ARTICLE =
  "https://figlancaster.com/articles/meet-the-vendors-of-southern-market/" as const;
const SOUTHERN_MARKET = "https://southernmarketlancaster.com/" as const;

const VENDORS: ReadonlyArray<{ name: string; standholder: string; offerings: string }> = [
  {
    name: "Akhi Sushi",
    standholder: "Chef Sai Nu",
    offerings: "Asian-based modern Burmese and Japanese cuisine using only the freshest ingredients.",
  },
  {
    name: "Cabbage Hill Schnitzel Haus",
    standholder: "Daniel Kilp",
    offerings: "Authentic German foods with trademark classics, as well as a delicious new spin on recipes.",
  },
  {
    name: "Lynn and Gray Coffee Co.",
    standholder: "Marasha Sanchez",
    offerings: "Espresso, matcha, chai, seasonal specialty beverages, and baked goods.",
  },
  {
    name: "Dov-a-licious Deli",
    standholder: "David Davis",
    offerings: "Authentic New York-style deli with sandwiches and more.",
  },
  {
    name: "Flavors of Morocco",
    standholder: "Bushra Fakier",
    offerings:
      "Moroccan-Indian fusion foods prepared with fresh, local products and exquisitely seasoned with authentic spices and herbs.",
  },
  {
    name: "The Gloomy Rooster",
    standholder: "Chris Grove",
    offerings: "Fried chicken options that pack a flavorful punch, along with vegetarian options.",
  },
  {
    name: "Layali El Sham",
    standholder: "Co-owners Amer Al Fayadh & Mo Khilo",
    offerings:
      "Middle Eastern cuisine including hummus, tabbouleh, shawarma, falafel, and baklawa.",
  },
  {
    name: "Lemongrass",
    standholder: "Chef Michelle",
    offerings: "Traditional Thai cuisine with fresh ingredients and flavors.",
  },
  {
    name: "Mekatos Eatery",
    standholder: "Co-owner Buitrago",
    offerings: "A unique blend of Colombian and Laos food with fusion platters.",
  },
  {
    name: "Noodle King",
    standholder: "Anh Tren and Minh Nyugen with business partner Davaun Dorsey",
    offerings:
      "North-style Vietnamese cuisine from traditional Pho rice noodle soups and salad bowls to spring rolls, egg rolls, sandwiches, and more.",
  },
  {
    name: "Philthy Good",
    standholder: "Chef Andrew “Phil” Sharpe",
    offerings:
      "Japanese and Mexican flavors blended together for a fusion of grilled dishes and other fare.",
  },
  {
    name: "Pizzeria 211",
    standholder: "Matt Shultz",
    offerings:
      "Classic hand-tossed Italian slices, specialty pies including Detroit-style pan pizza, and more.",
  },
];

export default function SouthernMarketVendorsPage() {
  return (
    <main className="contentPage southernMarketVendorsPage">
      <SpringHubBack />

      <section className="contentHero">
        <p className="contentEyebrow">Lancaster eats</p>
        <h1 className="contentHeroTitle">Meet the vendors of Southern Market</h1>
        <p className="contentHeroLead">
          <a href={SOUTHERN_MARKET} target="_blank" rel="noreferrer">
            Southern Market
          </a>{" "}
          is a historic gem in the heart of Lancaster City, reimagined as a culinary hub featuring 13 local vendors. With a
          wide variety of globally inspired dishes and local favorites, there’s something to satisfy every palate. At the
          center of it all is Bar 1888, a 30-seat bar serving crafted cocktails. Follow your senses to the food station that
          catches your eye, grab a drink, and settle in!
        </p>
      </section>

      <section className="contentGridTwo" aria-label="Southern Market vendors">
        {VENDORS.map((v) => (
          <article key={v.name} className="contentCard">
            <h3 className="contentCardTitle">{v.name}</h3>
            <p className="contentVendorStand">
              <strong>Meet the standholder</strong> {v.standholder}
            </p>
            <p>
              <strong>Offerings</strong> {v.offerings}
            </p>
          </article>
        ))}
      </section>

      <section className="contentFigNotice" aria-label="More from Lancaster">
        <p style={{ margin: "0 0 12px" }}>
          Want to discover more locally? Follow Fig on{" "}
          <a href="https://www.facebook.com/FigLancaster/" target="_blank" rel="noreferrer">
            Facebook
          </a>{" "}
          and{" "}
          <a href="https://www.instagram.com/figlancaster/" target="_blank" rel="noreferrer">
            Instagram
          </a>{" "}
          for inspiration.
        </p>
        <p style={{ margin: 0 }}>
          Vendor names and descriptions above are adapted from{" "}
          <a href={FIG_ARTICLE} target="_blank" rel="noreferrer">
            Fig Lancaster
          </a>
          . Menus and stands can change—confirm details with{" "}
          <a href={SOUTHERN_MARKET} target="_blank" rel="noreferrer">
            Southern Market
          </a>
          .
        </p>
      </section>

      <p style={{ marginTop: 24, fontSize: "0.95rem" }}>
        <Link href="/locations">← {siteCopy.nav.directory}</Link>
        {" · "}
        <Link href="/">{siteCopy.nav.calendar} home</Link>
      </p>
    </main>
  );
}
