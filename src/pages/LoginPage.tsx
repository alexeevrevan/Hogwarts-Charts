import React from "react";
import { Form, Input, Button, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AuthService } from "../services/authService";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("common");

  const onFinish = (values: { username: string; password: string }) => {
    if (AuthService.login(values.username, values.password)) {
      navigate("/dashboard");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card title={t("login.title")} style={{ width: 300 }}>
        <Form onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: t("login.usernameRequired"),
              },
            ]}
          >
            <Input placeholder={t("login.username")} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: t("login.passwordRequired"),
              },
            ]}
          >
            <Input.Password placeholder={t("login.password")} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              {t("login.submit")}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
