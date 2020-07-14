import { ReactComponent as ListIcon } from "@/assets/images/icons/list-icon.svg";
import { ReactComponent as ProfileIcon } from "@/assets/images/icons/profile-icon.svg";
import { ReactComponent as FavIcon } from "@/assets/images/icons/fav-icon.svg";

export default [
  {
    name: "profile-tabs",
    label: "Мои заказы",
    icon: ListIcon,
    id: "orders",
  },
  {
    name: "profile-tabs",
    label: "Профиль",
    icon: ProfileIcon,
    id: "info",
  },
  {
    name: "profile-tabs",
    label: "Избранное",
    icon: FavIcon,
    id: "favorite",
  },
];
