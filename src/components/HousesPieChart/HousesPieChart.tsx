import React from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { useTranslation } from "react-i18next";
import styles from "./ChartWrapper.module.css";
import type { IHousesPieChartProps, IChartData } from "./HouseChart.model";

export const HousesPieChart: React.FC<IHousesPieChartProps> = ({
  chartData,
}) => {
  const { t } = useTranslation("common");

  const renderLabel = (props: Partial<IChartData>) => {
    const { name, percentage, count } = props;
    return `${name} (${count} - ${percentage}%)`;
  };

  return (
    <div className={styles.chartWrapper}>
      <h2 className={styles.chartTitle}>{t("pieChart.title")}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={150}
            fill="#8884d8"
            dataKey="count"
            label={renderLabel}
          >
            {chartData.map((entry: IChartData) => (
              <Cell key={`cell-${entry.name}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend layout="vertical" verticalAlign="middle" align="right" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
