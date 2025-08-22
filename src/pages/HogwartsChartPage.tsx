import React from "react";
import { Card, Layout } from "antd";
import HogwartsChart from "../components/HogwartsChart/HogwartsChart";

const { Content } = Layout;

const HogwartsChartPage: React.FC = () => {
  return (
    <Content
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 24,
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 1400,
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        <HogwartsChart />
      </Card>
    </Content>
  );
};

export default HogwartsChartPage;
