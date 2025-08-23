import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./DateFilter.module.css";

interface DateFilterProps {
  startDate?: string;
  endDate?: string;
  onStartDateChange?: (date: string) => void;
  onEndDateChange?: (date: string) => void;
  onFilter?: () => void;
  onReset?: () => void;
}

const DateFilter: React.FC<DateFilterProps> = ({
  startDate = "",
  endDate = "",
  onStartDateChange = () => {},
  onEndDateChange = () => {},
  onFilter = () => {},
  onReset = () => {},
}) => {
  const { t } = useTranslation("common");

  const handleStartDateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    onStartDateChange(e.target.value);
  };

  const handleEndDateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    onEndDateChange(e.target.value);
  };

  return (
    <div className={styles.dateFilter}>
      <h2 className={styles.dateFilterTitle}>
        {t("hogwartsChart.filterTitle")}
      </h2>

      <div className={styles.filterControls}>
        <div className={styles.dateInputs}>
          <div className={styles.inputGroup}>
            <label htmlFor="start-date">{t("dateFilter.startDate")}</label>
            <input
              id="start-date"
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="end-date">{t("dateFilter.endDate")}</label>
            <input
              id="end-date"
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
            />
          </div>
        </div>

        <div className={styles.filterButtons}>
          <button type="button" onClick={onFilter} className={styles.filterBtn}>
            {t("dateFilter.applyFilter")}
          </button>

          <button type="button" onClick={onReset} className={styles.resetBtn}>
            {t("dateFilter.resetFilter")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateFilter;
