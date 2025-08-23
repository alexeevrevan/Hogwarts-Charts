export interface IDateFilterProps {
  startDate?: string;
  endDate?: string;
  onStartDateChange?: (date: string) => void;
  onEndDateChange?: (date: string) => void;
  onFilter?: () => void;
  onReset?: () => void;
}