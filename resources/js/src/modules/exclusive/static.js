import rares from "@/assets/images/templates/vintages.jpg";
import vintages from "@/assets/images/templates/vintage-drinks.jpg";
export default [
    {
        name: "Винтажи",
        nameSlug: "vintages",
        description: `Est laborum adipisicing nostrud amet esse culpa paria tur labore labore. Laboris aliquip duis ullamco.`,
        descrSlug: `vintage-champagne-is-created-only-in-the-year-when-the-wine-has-something-to-tell-you`,
        backdrop: vintages,
        to: "/search?category=vintages"
    },
    {
        name: "Редкие",
        nameSlug: "rare",
        description: `Est laborum adipisicing nostrud amet esse culpa paria tur labore labore. Laboris aliquip duis ullamco.`,
        descrSlug: `discover-the-world-of-the-most-exclusive-gandg-products`,
        backdrop: rares,
        to: "/search?category=rares"
    }
];
