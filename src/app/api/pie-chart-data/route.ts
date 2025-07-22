import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function getRandomDelay() {
  return Math.floor(Math.random() * (4000 - 500 + 1)) + 500;
}

export async function GET() {
  await new Promise(resolve => setTimeout(resolve, getRandomDelay()));

  const pieChartData = [
    { name: 'Group A', value: Math.floor(Math.random() * 500) },
    { name: 'Group B', value: Math.floor(Math.random() * 500) },
    { name: 'Group C', value: Math.floor(Math.random() * 500) },
    { name: 'Group D', value: Math.floor(Math.random() * 500) },
  ];
  return NextResponse.json(pieChartData);
}
