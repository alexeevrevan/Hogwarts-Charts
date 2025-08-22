import React from "react";
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
      <h2 className={styles.dateFilterTitle}>Фильтр по дате рождения</h2>

      <div className={styles.filterControls}>
        <div className={styles.dateInputs}>
          <div className={styles.inputGroup}>
            <label htmlFor="start-date">Дата рождения с:</label>
            <input
              id="start-date"
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              data-testid="start-date-input"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="end-date">по:</label>
            <input
              id="end-date"
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              data-testid="end-date-input"
            />
          </div>
        </div>

        <div className={styles.filterButtons}>
          <button
            type="button"
            onClick={onFilter}
            className={styles.filterBtn}
            data-testid="apply-filter-btn"
          >
            Применить фильтр
          </button>

          <button
            type="button"
            onClick={onReset}
            className={styles.resetBtn}
            data-testid="reset-filter-btn"
          >
            Сбросить фильтры
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateFilter;
