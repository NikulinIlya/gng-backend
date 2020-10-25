import React, {
    useState,
    useEffect,
    useMemo,
    useCallback,
    useReducer
} from "react";

import isEmpty from "@/utils/is-empty";

export default function useForm({ formFields, fieldRules }) {
    const [fieldsValue, fieldsDispatcher] = useReducer(formReducer, formFields);
    const [isFormDirty, setIsFormDirty] = useState(false);

    const setFieldValue = useCallback((field, value) => {
        if (field === undefined || value === undefined)
            throw new Error("Field name and value must be present");
        fieldsDispatcher({
            type: "set-field-value",
            payload: { field, value }
        });
        setIsFormDirty(true);
    }, []);

    const setFormFields = useCallback(fields => {
        fieldsDispatcher({
            type: "set-form-values",
            payload: fields
        });
    }, []);

    const applyRule = (fields, name, rule) => {
        if (typeof rule === "function") return rule(fields[name]);

        const { dependencies, validator } = rule;

        return validator(...dependencies.map(d => fieldsValue[d]));
    };

    const isFormValid = useMemo(
        _ => {
            if (isEmpty(fieldRules)) return true;

            return Object.entries(fieldRules).every(([name, rule]) => {
                const validationResult = applyRule(fieldsValue, name, rule);

                return typeof validationResult === "boolean"
                    ? validationResult
                    : false;
            });
        },
        [fieldsValue, fieldRules]
    );

    const errors = useMemo(
        _ => {
            if (isEmpty(fieldRules)) return [];
            return Object.entries(fieldRules)
                .map(([name, rule]) => applyRule(fieldsValue, name, rule))
                .filter(res => typeof res === "string");
        },
        [fieldsValue, fieldRules]
    );

    const Inspector = useCallback(() => {
        return (
            <div className="messages-inspector">
                {errors.map((message, i) => (
                    <p className="form-message" key={i}>
                        {message}
                    </p>
                ))}
            </div>
        );
    }, [errors]);

    return {
        isFormValid,
        isFormDirty,
        errors,
        data: fieldsValue,
        setFieldValue,
        setFormFields,
        Inspector
    };
}

function formReducer(state, action) {
    switch (action.type) {
        case "set-form-values":
            return { ...action.payload };
        case "set-field-value":
            return { ...state, [action.payload.field]: action.payload.value };
        default:
            return state;
    }
}
