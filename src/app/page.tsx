"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">BMI Calculator</h1>
        <BMICalculator />
      </div>
    </main>
  );
}

// Define types for the BMI result
interface BMIResult {
  bmi: string;
  category: string;
  weight: number;
  height: number;
}

function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<BMIResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const calculateBMI = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch("/api/hello", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          weight: parseFloat(weight),
          height: parseFloat(height),
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to calculate BMI");
      }
      
      setResult(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
      <form onSubmit={calculateBMI} className="space-y-6">
        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
            Weight (kg)
          </label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            step="0.1"
            min="0"
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., 70"
          />
        </div>
        
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-gray-700">
            Height (m)
          </label>
          <input
            type="number"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            step="0.01"
            min="0"
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., 1.75"
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? "Calculating..." : "Calculate BMI"}
        </button>
      </form>
      
      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}
      
      {result && !error && (
        <div className="mt-6 space-y-4">
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-md">
            <p className="text-lg font-bold">Your BMI: {result.bmi}</p>
            <p>Category: {result.category}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-medium text-gray-700">BMI Categories:</h3>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li>Underweight: BMI less than 18.5</li>
              <li>Normal weight: BMI 18.5 to 24.9</li>
              <li>Overweight: BMI 25 to 29.9</li>
              <li>Obese: BMI 30 or greater</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
