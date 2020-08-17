import React, { useState, useEffect } from 'react';

import fishIcon from "@/assets/images/icons/fish-icon-gold.svg";
import cheeseIcon from "@/assets/images/icons/cheese-icon-gold.svg";

import './product-suggestion.scss'

const cardVariants = {
    cheese: { label: 'Сочетания с сыром', labelSlug: '', icon: cheeseIcon },
    combination: { label: 'Гастрономические сочетания', labelSlug: '', icon: fishIcon }
}

export default function ProductSUggestion({ text, variant = 'cheese' }) {
    return (
        <section className="relative-card" >
            <div className="relative-card__content">
                <h3 className="relative-card__title">
                    {cardVariants[variant].label}
                </h3>
                <p className="relative-card__descr">
                    {text}
                </p>
            </div>
            {variant && cardVariants[variant] && (
                <div className="relative-card__icon">
                    <img src={cardVariants[variant].icon} alt="" />
                </div>
            )}
        </section>
    )
}