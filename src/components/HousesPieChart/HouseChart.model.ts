export interface IChartData {
  name: string;
  count: number;
  color: string;
  percentage: number;
}

export interface IHousesPieChartProps {
  chartData: IChartData[];
}