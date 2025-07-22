export interface CardData {
  totalRevenue: number;
  subscriptions: number;
  sales: number;
  activeNow: number;
}

export interface ChartDataItem {
  name: string;
  total?: number;
  uv?: number;
  pv?: number;
  amt?: number;
  value?: number;
}

export interface DashboardData {
  cardData: CardData;
  overviewChartData: ChartDataItem[];
  lineChartData: ChartDataItem[];
  pieChartData: ChartDataItem[];
}
