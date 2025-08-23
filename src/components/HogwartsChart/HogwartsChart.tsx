import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./HogwartsChart.module.css";
import loadingStyles from "./LoadingError.module.css";
import { ChartStatistics } from "../ChartStatistics/ChartStatistics";
import DateFilter from "../DateFilter/DateFilter";
import { HousesPieChart } from "../HousesPieChart/HousesPieChart";
import { useHogwartsData } from "../../hooks/useHogwartsData";

const HogwartsChart: React.FC = () => {
  const { t } = useTranslation("common");
  const {
    startDate,
    endDate,
    loading,
    error,
    setStartDate,
    setEndDate,
    handleFilter,
    handleReset,
    prepareChartData,
    totalStudents,
    totalStaff,
    filteredStudents,
  } = useHogwartsData();

  if (loading) {
    return (
      <div className={loadingStyles.loadingContainer}>
        {t("hogwartsChart.loading")}
      </div>
    );
  }

  if (error) {
    return (
      <div className={loadingStyles.errorContainer}>
        {t("common.error")}: {error}
      </div>
    );
  }

  const chartData = prepareChartData();

  return (
    <div className={styles.chartContainer}>
      <header className={styles.appHeader}>
        <h1 className={styles.appHeaderTitle}>{t("hogwartsChart.title")}</h1>
        <p className={styles.appHeaderSubtitle}>
          {t("hogwartsChart.subtitle")}
        </p>
      </header>

      <DateFilter
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onFilter={handleFilter}
        onReset={handleReset}
      />

      <HousesPieChart chartData={chartData} />

      <ChartStatistics
        totalStudents={totalStudents}
        totalStaff={totalStaff}
        totalFiltered={filteredStudents.length}
      />
    </div>
  );
};

export default HogwartsChart;
