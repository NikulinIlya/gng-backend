import React, { useState, useEffect } from 'react';

import Progress from "@/components/Progress";
import Heading from "@/components/Heading";

export default function AboutWine({ sweetness = 1, body = 1, acidity = 1 }) {
    return <>
        <Heading as="h2">Об этом вине</Heading>
        <div className="product-details__criterias">
            <Progress label={'Сладость'} value={sweetness * 100 / 3} />
            <Progress label={'Тело'} value={body * 100 / 3} />
            <Progress label={'Кислотность'} value={acidity * 100 / 3} />
        </div>
    </>
}