import React from "react";
import styles from "./HogwartsChart.module.css";
import loadingStyles from "./LoadingError.module.css";
import { ChartStatistics } from "../ChartStatistics/ChartStatistics";
import DateFilter from "../DateFilter/DateFilter";
import { HousesPieChart } from "../HousesPieChart/HousesPieChart";
import { useHogwartsData } from "../../hooks/useHogwartsData";

const HogwartsChart: React.FC = () => {
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
        Загрузка данных о студентах Хогвартса...
      </div>
    );
  }

  if (error) {
    return <div className={loadingStyles.errorContainer}>Ошибка: {error}</div>;
  }

  const chartData = prepareChartData();

  return (
    <div className={styles.chartContainer}>
      <header className={styles.appHeader}>
        <h1 className={styles.appHeaderTitle}>
          Студенты Хогвартса по факультетам
        </h1>
        <p className={styles.appHeaderSubtitle}>
          Используйте фильтры для отображения студентов по дате рождения
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
