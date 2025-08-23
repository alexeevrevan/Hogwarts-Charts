import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { ResultStatusType } from "antd/es/result";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("common");

  return (
    <Result
      status={t("notFound.title") as ResultStatusType}
      title={t("notFound.title")}
      subTitle={t("notFound.subtitle")}
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          {t("notFound.backToHome")}
        </Button>
      }
    />
  );
};

export default NotFoundPage;
