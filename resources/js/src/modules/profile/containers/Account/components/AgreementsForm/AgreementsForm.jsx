import React, { useEffect, useState } from "react";
import { useStoreon } from "storeon/react";

import Heading from "@/components/Heading";
import Button from "@/components/Button";
import { Checkbox } from "@/components/Input";
import Loading from "@/components/Loading";
import Modal from "@/components/Modal";

import useTranslate from "@/utils/useTranslate";
import useForm from "@/utils/useForm";
import { status as REQUEST } from "@/utils/request-status";

import ProfileSection from "../ProfileSection/ProfileSection";

const defaultState = {
    events_agreed: true,
    discount_agreed: true
};

export default function AgreementsForm({ updateInfo }) {
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
        fieldRules: {}
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
                const { events_agreed, discount_agreed } = userInfo;
                setFormFields({ events_agreed, discount_agreed });
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

        const { events_agreed, discount_agreed } = data;
        const [err, response] = await updateInfo({
            events_agreed,
            discount_agreed
        });

        if (response) setIsSuccessModalVisible(true);

        setStatus(err ? REQUEST.error : REQUEST.success);
    };
    return (
        <ProfileSection
            title={_ => (
                <Heading className="account-section-heading">
                    {t("notifications", "Оповещения")}
                </Heading>
            )}
        >
            <form className="notifications" onSubmit={onFormSubmit}>
                <Checkbox
                    variant="square"
                    name="discount_agreed"
                    label={t(
                        "receive-news-and-offers-by-e-mail",
                        "Получать новости и выгодные предложения на e-mail"
                    )}
                    onChange={onInputChange}
                    checked={data.discount_agreed}
                />
                <Checkbox
                    variant="square"
                    name="events_agreed"
                    onChange={onInputChange}
                    checked={data.events_agreed}
                    label={t(
                        "receive-information-about-upcoming-events",
                        "Получать информацию о предстоящих  мероприятиях"
                    )}
                />
                {status === REQUEST.pending && <Loading fixed />}
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
