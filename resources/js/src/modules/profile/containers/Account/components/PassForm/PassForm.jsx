import React, { useEffect, useState } from "react";

import Heading from "@/components/Heading";
import Button from "@/components/Button";
import { TextField, Checkbox, Select } from "@/components/Input";
import Loading from "@/components/Loading";
import Modal from "@/components/Modal";

import useTranslate from "@/utils/useTranslate";
import useForm from "@/utils/useForm";
import { status as REQUEST } from "@/utils/request-status";

import ProfileSection from "../ProfileSection/ProfileSection";

const rules = {
    old_password: pass =>
        pass.length >= 8 ||
        "Пароль должен состоять не менее, чем из 8 символов",
    password: pass =>
        pass.length >= 8 ||
        "Пароль должен состоять не менее, чем из 8 символов",
    password_confirmation: {
        dependencies: ["password", "password_confirmation"],
        validator: (pass, passConfirm) =>
            (passConfirm.length >= 8 && passConfirm === pass) ||
            "Пароли должны совпадать"
    }
};

const defaultState = {
    old_password: "",
    password: "",
    password_confirmation: ""
};

export default function PassForm({ changePass }) {
    const [status, setStatus] = useState(REQUEST.success);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [isFormTouched, setIsFormTouched] = useState(false);
    const { t } = useTranslate();

    const {
        data,
        isFormValid,
        setFieldValue,
        Inspector
    } = useForm({
        formFields: defaultState,
        fieldRules: rules
    });

    const onFieldChange = (field = "", value = "") => {
        if (!field || !data.hasOwnProperty(field))
            throw new Error("Field name is invalid");

        setFieldValue(field, value);
    };

    const onInputChange = e => {
        const { name, value, checked, type } = e.target;
        const inputValue = type === "checkbox" ? checked : value;
        if (!name) throw new Error("Name should be passed");

        onFieldChange(name, inputValue);
        setIsFormTouched(false);
    };

    const onFormSubmit = async e => {
        e.preventDefault();
        setIsFormTouched(true);

        if (!isFormValid) return;

        setStatus(REQUEST.pending);

        const [err, response] = await changePass(data);

        if (response) setIsSuccessModalVisible(true);

        setStatus(err ? REQUEST.error : REQUEST.success);
    };
    return (
        <ProfileSection
            title={_ => (
                <Heading className="account-section-heading">
                    {t("change-password", "Изменить пароль")}
                </Heading>
            )}
        >
            <form className="password" onSubmit={onFormSubmit}>
                <TextField
                    name="old_password"
                    onChange={onInputChange}
                    label={t("old-password", "Старый пароль")}
                    type="password"
                />
                <div className="fields-grid">
                    <TextField
                        name="password"
                        onChange={onInputChange}
                        label={t("new-password", "Новый пароль")}
                        type="password"
                    />
                    <TextField
                        name="password_confirmation"
                        onChange={onInputChange}
                        label={t(
                            "confirm-new-password",
                            "Подтверждение нового пароля"
                        )}
                        type="password"
                    />
                </div>
                {status === REQUEST.pending && <Loading fixed />}
                {isFormTouched && <Inspector />}
                {isSuccessModalVisible && (
                    <Modal>
                        <Modal closable={false}>
                            <div className="success-modal">
                                <h1 className="success-modal__heading">
                                    {t("", "Пароль успешно изменен")}
                                </h1>
                                <Button
                                    onClick={_ =>
                                        setIsSuccessModalVisible(false)
                                    }
                                >
                                    {t("", "Ok")}
                                </Button>
                            </div>
                        </Modal>
                    </Modal>
                )}
                <Button>{t("save", "Сохранить")}</Button>
            </form>
        </ProfileSection>
    );
}
