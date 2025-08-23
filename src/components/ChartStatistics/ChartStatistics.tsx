import React from "react";
import { useTranslation } from "react-i18next";
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
}) => {
  const { t } = useTranslation("common");

  return (
    <div className={styles.statsContainer}>
      <h3 className={styles.statsTitle}>{t("chartStatistics.title")}</h3>
      <div className={styles.statsGrid}>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{totalStudents}</span>
          <span className={styles.statLabel}>
            {t("chartStatistics.totalStudents")}
          </span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{totalStaff}</span>
          <span className={styles.statLabel}>
            {t("chartStatistics.totalStaff")}
          </span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{totalFiltered}</span>
          <span className={styles.statLabel}>
            {t("chartStatistics.filteredStudents")}
          </span>
        </div>
      </div>
    </div>
  );
};
