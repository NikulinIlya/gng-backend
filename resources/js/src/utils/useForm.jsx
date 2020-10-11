import React, { useState, useEffect, useMemo } from "react";

import isEmpty from "@/utils/is-empty";

export default function useForm({ formFields, fieldRules }) {
    const applyRule = (fields, name, rule) => {
        if (typeof rule === "function") return rule(fields[name]);

        const { dependencies, validator } = rule;

        return validator(...dependencies.map(d => formFields[d]));
    };

    const isFormValid = useMemo(
        _ => {
            if (isEmpty(fieldRules)) return true;

            return Object.entries(fieldRules).every(([name, rule]) => {
                const validationResult = applyRule(formFields, name, rule);

                return typeof validationResult === "boolean"
                    ? validationResult
                    : false;
            });
        },
        [formFields, fieldRules]
    );

    const errors = useMemo(
        _ => {
            if (isEmpty(fieldRules)) return [];
            return Object.entries(fieldRules)
                .map(([name, rule]) => applyRule(formFields, name, rule))
                .filter(res => typeof res === "string");
        },
        [formFields, fieldRules]
    );

    return { isFormValid, errors };
}
