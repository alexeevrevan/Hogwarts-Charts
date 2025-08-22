import React from "react";
import { Button, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/authService";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

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
        title="Панель управления"
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
            gap: 16, // Отступ между кнопками
          }}
        >
          <Button
            type="primary"
            size="large"
            block
            onClick={() => navigate("/chart")}
          >
            Перейти к графику
          </Button>
          <Button danger size="large" block onClick={handleLogout}>
            Выйти
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage;
