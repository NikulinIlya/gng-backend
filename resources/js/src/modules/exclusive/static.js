import sets from "@/assets/images/templates/sets.png";
import ideas from "@/assets/images/templates/present-ideas.png";
import vintage from "@/assets/images/templates/vintage.png";
import rare from "@/assets/images/templates/rare.png";
export default [
    // {
    //   name: "Наборы",
    //   description: `Est laborum adipisicing nostrud amet esse culpa paria tur labore labore. Laboris aliquip duis ullamco.`,
    //   backdrop: sets,
    // },
    // {
    //   name: "Идеи для подарка",
    //   description: `Est laborum adipisicing nostrud amet esse culpa paria tur labore labore. Laboris aliquip duis ullamco.`,
    //   backdrop: ideas,
    // },
    {
        name: "Винтажи",
        description: `Est laborum adipisicing nostrud amet esse culpa paria tur labore labore. Laboris aliquip duis ullamco.`,
        descrSlug: `vintage-champagne-is-created-only-in-the-year-when-the-wine-has-something-to-tell-you`,
        backdrop: vintage,
        to: "/search?category=vintages"
    },
    {
        name: "Редкие",
        description: `Est laborum adipisicing nostrud amet esse culpa paria tur labore labore. Laboris aliquip duis ullamco.`,
        descrSlug: `discover-the-world-of-the-most-exclusive-gandg-products`,
        backdrop: rare,
        to: "/search?category=rares"
    }
];
