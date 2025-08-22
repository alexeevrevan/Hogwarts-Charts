import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Извините, страница не найдена"
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Вернуться на главную
        </Button>
      }
    />
  );
};

export default NotFoundPage;
