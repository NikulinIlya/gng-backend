import { lazy } from "react";
import NotFound from "@/components/NotFound";

const Home = lazy(_ => import("@/modules/home"));
const Wines = lazy(_ => import("@/modules/wines"));
const Champagne = lazy(_ => import("@/modules/champagne"));
const Strong = lazy(_ => import("@/modules/strong"));
const SearchPage = lazy(_ => import("@/modules/search-page"));
const ProductDetails = lazy(_ => import("@/modules/drink-details"));
const Events = lazy(_ => import("@/modules/events"));
const EventPage = lazy(_ => import("@/modules/events/containers/EventPage"));
const Exclusive = lazy(_ => import("@/modules/exclusive"));
const Accessories = lazy(_ => import("@/modules/accessories"));
const News = lazy(_ => import("@/modules/news"));
const Brands = lazy(_ => import("@/modules/brands"));
const Contacts = lazy(_ => import("@/modules/contacts"));
const Cart = lazy(_ => import("@/modules/cart"));
const Order = lazy(_ => import("@/modules/cart/containers/Order"));
const StaticPage = lazy(_ => import("@/modules/text-page"));
const About = lazy(_ => import("@/modules/about"));
const Profile = lazy(_ => import("@/modules/profile"));

export default [
    {
        component: Home,
        path: "/",
        exact: true
    },
    {
        component: Brands,
        path: "/brands",
        exact: true
    },
    {
        component: Wines,
        path: "/wines",
        exact: true
    },
    {
        component: Champagne,
        path: "/champagne",
        exact: true
    },
    {
        component: Strong,
        path: "/spirits",
        exact: true
    },
    {
        component: Accessories,
        path: "/accessories",
        exact: true
    },
    {
        component: Events,
        path: "/events",
        exact: true
    },
    {
        component: EventPage,
        path: "/events/:eventId",
        exact: true
    },
    {
        component: News,
        path: "/news",
        exact: true
    },
    {
        component: Exclusive,
        path: "/exclusive",
        exact: true
    },
    {
        component: SearchPage,
        path: "/search",
        exact: true
    },
    {
        component: ProductDetails,
        path: "/catalog/:productId",
        exact: true
    },
    {
        component: StaticPage,
        path: "/static"
    },
    {
        component: About,
        path: "/about",
        exact: true
    },
    {
        component: Contacts,
        path: "/contacts",
        exact: true
    },
    {
        component: Cart,
        path: "/cart",
        exact: true
    },
    {
        component: Profile,
        path: "/profile",
        exact: true,
        protected: true
    },
    {
        component: Order,
        path: "/cart/order",
        exact: true,
        protected: true
    },
    {
        component: NotFound
    }
];
