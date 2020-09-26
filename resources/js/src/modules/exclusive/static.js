import vintage from "@/assets/images/templates/vintages.jpg";
import rare from "@/assets/images/templates/rares.jpg";
export default [
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
