import React, { useEffect, useState } from "react";
import { useStoreon } from "storeon/react";

import Heading from "@/components/Heading";
import Button from "@/components/Button";
import { TextField, Checkbox, Select } from "@/components/Input";
import Loading from "@/components/Loading";
import Modal from "@/components/Modal";

import useTranslate from "@/utils/useTranslate";
import useForm from "@/utils/useForm";
import { status as REQUEST } from "@/utils/request-status";

import ProfileSection from "../ProfileSection/ProfileSection";

const errMessageTemplates = {
    required: "Заполните поле",
    phone: "Введите номер телефона в формате +7-(xxx)-xxx-xx-xx",
    format: "Неверный формат"
};

const rules = {
    phone: phone =>
        (phone && phone.length >= 16 && phone.indexOf("_") === -1) ||
        errMessageTemplates["phone"]
};

const defaultState = {
    name: "test name",
    second_name: "test second name",
    phone: "test set phone",
    email: "email"
};

export default function CommonInfoForm({ updateInfo }) {
    const [status, setStatus] = useState(REQUEST.success);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [isFormTouched, setIsFormTouched] = useState(false);
    const { t } = useTranslate();
    const { userInfo } = useStoreon("userInfo");
    const {
        data,
        isFormValid,
        isFormDirty,
        setFieldValue,
        setFormFields,
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

    useEffect(
        _ => {
            if (userInfo) {
                const { name, second_name, phone, email } = userInfo;
                setFormFields({
                    name,
                    second_name,
                    phone: phone + "    ",
                    email
                });
            }
        },
        [userInfo]
    );

    const onFormSubmit = async e => {
        e.preventDefault();
        
        if (!isFormDirty) return;

        setIsFormTouched(true);

        if (!isFormValid) return;

        setStatus(REQUEST.pending);

        const { second_name, phone } = data;
        const [err, response] = await updateInfo({
            second_name,
            phone: phone.replace(/-/g, "")
        });

        if (response) setIsSuccessModalVisible(true);

        setStatus(err ? REQUEST.error : REQUEST.success);
    };

    return (
        <ProfileSection
            title={_ => (
                <Heading className="account-section-heading">
                    {t("personal-data", "Персональные данные")}
                </Heading>
            )}
        >
            {status === REQUEST.pending && <Loading fixed />}

            <form className="personal-info" onSubmit={onFormSubmit}>
                <TextField
                    label={t("name", "Имя")}
                    disabled
                    value={data.name}
                />
                <TextField
                    name="second_name"
                    label={t("second-name", "Фамилия")}
                    value={data.second_name}
                    onChange={onInputChange}
                />
                <div className="fields-grid">
                    <TextField
                        name="phone"
                        type="phone"
                        label={t("mob-number", "Телефон")}
                        value={data.phone}
                        onChange={onInputChange}
                    />
                    <TextField
                        name="email"
                        label="Email"
                        disabled
                        value={data.email}
                    />
                    {/* <DateInput
                    // TODO: FIX
                    lang={localStorage.getItem("lang")}
                    label={t("date-of-birth", "Дата Рождения")}
                />
                <div className="fields-flex">
                    <h3 className="fields-flex__title">
                        {t("sex", "Пол")}
                    </h3>
                    <div className="fields-flex__body">
                        <Checkbox
                            variant="square"
                            label={t("male", "Мужской")}
                            defaultChecked
                        />
                        <Checkbox
                            variant="square"
                            label={t("female", "Женский")}
                        />
                    </div>
                </div> */}
                </div>
                {isFormTouched && <Inspector />}
                {isSuccessModalVisible && (
                    <Modal>
                        <Modal closable={false}>
                            <div className="success-modal">
                                <h1 className="success-modal__heading">
                                    {t("", "Данные успешно обновлены")}
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
