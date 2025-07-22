import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function getRandomDelay() {
  return Math.floor(Math.random() * (4000 - 500 + 1)) + 500;
}

export async function GET() {
  await new Promise(resolve => setTimeout(resolve, getRandomDelay()));

  const cardData = {
    totalRevenue: parseFloat((Math.random() * 100000).toFixed(2)),
    subscriptions: Math.floor(Math.random() * 5000),
    sales: Math.floor(Math.random() * 20000),
    activeNow: Math.floor(Math.random() * 1000),
  };
  return NextResponse.json(cardData);
}
