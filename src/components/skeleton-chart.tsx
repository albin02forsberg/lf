import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SkeletonChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="h-4 w-1/3 rounded bg-gray-200 animate-pulse"></div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-64 w-full rounded bg-gray-200 animate-pulse"></div>
      </CardContent>
    </Card>
  );
}
