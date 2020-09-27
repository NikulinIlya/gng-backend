import bags from "@/assets/images/templates/_bags.png";
import glasses from "@/assets/images/templates/_glasses.png";
export default [
    {
        name: "Сумки",
        description: `Est laborum adipisicing nostrud amet esse culpa paria tur labore labore. Laboris aliquip duis ullamco.`,
        descrSlug: `here-you-can-choose-the-perfect-bag-for-your-wines-and-spirits`,
        backdrop: bags,
        to: "/search?category=bags"
    },
    {
        name: "Бокалы",
        description: `Est laborum adipisicing nostrud amet esse culpa paria tur labore labore. Laboris aliquip duis ullamco.`,
        descrSlug: `find-the-perfect-glass-now`,
        backdrop: glasses,
        to: "/search?category=glasses"
    }
];
