import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SkeletonCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          <div className="h-4 w-1/2 rounded bg-gray-200 animate-pulse"></div>
        </CardTitle>
        <div className="h-4 w-4 rounded-full bg-gray-200 animate-pulse"></div>
      </CardHeader>
      <CardContent>
        <div className="h-6 w-3/4 rounded bg-gray-200 animate-pulse mb-2"></div>
        <div className="h-3 w-1/2 rounded bg-gray-200 animate-pulse"></div>
      </CardContent>
    </Card>
  );
}
