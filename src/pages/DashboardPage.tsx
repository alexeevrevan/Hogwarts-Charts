import React from "react";
import { Button, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AuthService } from "../services/authService";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("common");

  const handleLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Card
        title={t("dashboard.title")}
        style={{
          width: 400,
          textAlign: "center",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <Button
            type="primary"
            size="large"
            block
            onClick={() => navigate("/chart")}
          >
            {t("dashboard.goToChart")}
          </Button>
          <Button danger size="large" block onClick={handleLogout}>
            {t("dashboard.logout")}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage;
