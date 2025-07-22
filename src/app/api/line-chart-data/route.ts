import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function getRandomDelay() {
  return Math.floor(Math.random() * (4000 - 500 + 1)) + 500;
}

export async function GET() {
  await new Promise(resolve => setTimeout(resolve, getRandomDelay()));

  const lineChartData = [
    { name: 'Page A', uv: Math.floor(Math.random() * 5000), pv: Math.floor(Math.random() * 5000), amt: Math.floor(Math.random() * 5000) },
    { name: 'Page B', uv: Math.floor(Math.random() * 5000), pv: Math.floor(Math.random() * 5000), amt: Math.floor(Math.random() * 5000) },
    { name: 'Page C', uv: Math.floor(Math.random() * 5000), pv: Math.floor(Math.random() * 5000), amt: Math.floor(Math.random() * 5000) },
    { name: 'Page D', uv: Math.floor(Math.random() * 5000), pv: Math.floor(Math.random() * 5000), amt: Math.floor(Math.random() * 5000) },
    { name: 'Page E', uv: Math.floor(Math.random() * 5000), pv: Math.floor(Math.random() * 5000), amt: Math.floor(Math.random() * 5000) },
    { name: 'Page F', uv: Math.floor(Math.random() * 5000), pv: Math.floor(Math.random() * 5000), amt: Math.floor(Math.random() * 5000) },
    { name: 'Page G', uv: Math.floor(Math.random() * 5000), pv: Math.floor(Math.random() * 5000), amt: Math.floor(Math.random() * 5000) },
  ];
  return NextResponse.json(lineChartData);
}
