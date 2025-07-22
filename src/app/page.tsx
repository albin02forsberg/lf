'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import { OverviewChart } from "@/components/overview-chart";
import { LineChartComponent } from "@/components/line-chart";
import { PieChartComponent } from "@/components/pie-chart";
import { useState, useEffect } from 'react';
import { SkeletonCard } from "@/components/skeleton-card";
import { SkeletonChart } from "@/components/skeleton-chart";
import { CardData, ChartDataItem } from "@/lib/types";

export default function Home() {
  const [cardData, setCardData] = useState<CardData | null>(null);
  const [overviewChartData, setOverviewChartData] = useState<ChartDataItem[] | null>(null);
  const [lineChartData, setLineChartData] = useState<ChartDataItem[] | null>(null);
  const [pieChartData, setPieChartData] = useState<ChartDataItem[] | null>(null);

  const [loadingCards, setLoadingCards] = useState(true);
  const [loadingOverviewChart, setLoadingOverviewChart] = useState(true);
  const [loadingLineChart, setLoadingLineChart] = useState(true);
  const [loadingPieChart, setLoadingPieChart] = useState(true);

  useEffect(() => {
    const fetchCardData = async () => {
      setLoadingCards(true);
      try {
        const response = await fetch('/api/card-data');
        const data = await response.json();
        setCardData(data);
      } catch (error) {
        console.error("Failed to fetch card data:", error);
      } finally {
        setLoadingCards(false);
      }
    };

    const fetchOverviewChartData = async () => {
      setLoadingOverviewChart(true);
      try {
        const response = await fetch('/api/overview-chart-data');
        const data = await response.json();
        setOverviewChartData(data);
      } catch (error) {
        console.error("Failed to fetch overview chart data:", error);
      } finally {
        setLoadingOverviewChart(false);
      }
    };

    const fetchLineChartData = async () => {
      setLoadingLineChart(true);
      try {
        const response = await fetch('/api/line-chart-data');
        const data = await response.json();
        setLineChartData(data);
      } catch (error) {
        console.error("Failed to fetch line chart data:", error);
      } finally {
        setLoadingLineChart(false);
      }
    };

    const fetchPieChartData = async () => {
      setLoadingPieChart(true);
      try {
        const response = await fetch('/api/pie-chart-data');
        const data = await response.json();
        setPieChartData(data);
      } catch (error) {
        console.error("Failed to fetch pie chart data:", error);
      } finally {
        setLoadingPieChart(false);
      }
    };

    fetchCardData();
    fetchOverviewChartData();
    fetchLineChartData();
    fetchPieChartData();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      {loadingCards || !cardData ? (
        <>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </>
      ) : (
        <>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${cardData.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{cardData.subscriptions.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{cardData.sales.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{cardData.activeNow.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </>
      )}
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-2 col-span-full">
        {loadingOverviewChart || !overviewChartData ? (
          <SkeletonChart />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <OverviewChart data={overviewChartData} />
            </CardContent>
          </Card>
        )}
        {loadingLineChart || !lineChartData ? (
          <SkeletonChart />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Sales Trend</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <LineChartComponent data={lineChartData} />
            </CardContent>
          </Card>
        )}
        {loadingPieChart || !pieChartData ? (
          <SkeletonChart />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Customer Segments</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <PieChartComponent data={pieChartData} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
