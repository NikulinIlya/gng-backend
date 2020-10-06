import React, { useState, useEffect } from "react";

import Progress from "@/components/Progress";
import Heading from "@/components/Heading";

import useTranslate from "@/utils/useTranslate";

export default function AboutWine({ sweetness = 1, body = 1, acidity = 1 }) {
    const ratio = 100 / 5;
    const { t } = useTranslate();
    return (
        <>
            <Heading as="h2">{t("about-this-vine", "Об этом вине")}</Heading>
            <div className="product-details__criterias">
                <Progress
                    label={t("sweetness", "Сладость")}
                    value={sweetness * ratio}
                />
                <Progress label={t("body", "Тело")} value={body * ratio} />
                <Progress
                    label={t("acidity", "Кислотность")}
                    value={acidity * ratio}
                />
            </div>
        </>
    );
}
