
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Define types for the BMI result
interface BMIResult {
  bmi: string;
  category: string;
  weight: number;
  height: number;
}

export function BMICalculator() {
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
    <Card>
      <CardHeader>
        <CardTitle>BMI Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={calculateBMI} className="space-y-6">
          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
              Weight (kg)
            </label>
            <Input
              type="number"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              step="0.1"
              min="0"
              required
              placeholder="e.g., 70"
            />
          </div>
          
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-gray-700">
              Height (m)
            </label>
            <Input
              type="number"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              step="0.01"
              min="0"
              required
              placeholder="e.g., 1.75"
            />
          </div>
          
          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? "Calculating..." : "Calculate BMI"}
          </Button>
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
      </CardContent>
    </Card>
  );
}
