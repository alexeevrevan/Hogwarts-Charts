import React from "react";
import styles from "./ChartStatistics.module.css";

interface ChartStatisticsProps {
  totalStudents: number;
  totalStaff: number;
  totalFiltered: number;
}

export const ChartStatistics: React.FC<ChartStatisticsProps> = ({
  totalStudents,
  totalStaff,
  totalFiltered,
}) => (
  <div className={styles.statsContainer}>
    <h3 className={styles.statsTitle}>Статистика</h3>
    <div className={styles.statsGrid}>
      <div className={styles.statItem}>
        <span className={styles.statValue}>{totalStudents}</span>
        <span className={styles.statLabel}>Студентов</span>
      </div>
      <div className={styles.statItem}>
        <span className={styles.statValue}>{totalStaff}</span>
        <span className={styles.statLabel}>Преподавателей</span>
      </div>
      <div className={styles.statItem}>
        <span className={styles.statValue}>{totalFiltered}</span>
        <span className={styles.statLabel}>Всего в выбранном диапазоне</span>
      </div>
    </div>
  </div>
);
