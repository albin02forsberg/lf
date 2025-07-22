export function GET(request: Request) {
  return new Response("Hello, World!");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { weight, height } = body;
    
    // Validate inputs
    if (!weight || !height || isNaN(weight) || isNaN(height) || height <= 0 || weight <= 0) {
      return new Response(
        JSON.stringify({ error: "Please provide valid weight (kg) and height (m)" }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Calculate BMI (weight in kg, height in meters)
    const bmi = weight / (height * height);
    
    // Determine BMI category
    let category;
    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 25) category = "Normal weight";
    else if (bmi < 30) category = "Overweight";
    else category = "Obese";
    
    return new Response(
      JSON.stringify({ 
        bmi: bmi.toFixed(2),
        category,
        weight,
        height
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error processing request" }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}