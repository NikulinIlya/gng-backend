import React, { useState, useEffect } from 'react';

import Progress from "@/components/Progress";
import Heading from "@/components/Heading";

export default function AboutWine({ sweetness = 1, body = 1, acidity = 1 }) {
    const ratio = 100 / 5
    return <>
        <Heading as="h2">Об этом вине</Heading>
        <div className="product-details__criterias">
            <Progress label={'Сладость'} value={sweetness * ratio} />
            <Progress label={'Тело'} value={body * ratio} />
            <Progress label={'Кислотность'} value={acidity * ratio} />
        </div>
    </>
}