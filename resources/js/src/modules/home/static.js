import setimage from "@/assets/images/templates/wine-set.png";
import saleimage from "@/assets/images/templates/wine-sale.png";
import expertimage from "@/assets/images/templates/expert.png";

import marker from "@/assets/images/icons/marker-light.svg";
import phone from "@/assets/images/icons/phone-light.svg";
import time from "@/assets/images/icons/time-light.svg";

export const discounts = [
    {
        title: "Id incididunt",
        description: `Cloudy Bay was established by David Hohnen, of Cape Mentelle fame, in 1985. Cloudy Bay takes its name from `,
        image: expertimage
    },
    {
        title: "Esse dolore",
        description: `New Zealand's answer to Napa Valley, Marlborough is a veritable engine room that in 2006 accounted for 47 percent`,
        image: saleimage
    },
    {
        title: "Aute occaecat",
        description: `An important white grape in Bordeaux and the Loire Valley that has now found fame in New Zealand and now Chile. `,
        image: setimage
    }
];

export const contacts = [
    {
        icon: marker,
        name: "Адрес",
        nameSlug: "adress",
        valueSlug: "g-moskva-ul-seleznevskaya-dom-19-2",
        value: "г. Москва, ул. Селезневская , дом 19/2"
    },
    {
        icon: phone,
        name: "Телефон",
        nameSlug: "mob-number",
        valueSlug: "8 (982) 655-50-00",
        value: "8 (982) 655-50-00"
    },
    {
        icon: time,
        name: "Время работы",
        nameSlug: "opening-hours",
        valueSlug: "pn-pt-10-00-20-00",
        value: "Понедельник – пятница с 9.00 до 18.00"
    },
    {
        icon: time,
        name: "Email",
        nameSlug: "",
        valueSlug: "",
        value: "info@gng.wine"
    }
];
