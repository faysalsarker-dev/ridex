/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { useGetDashboardQuery } from "@/redux/features/admin/admin.api";
import { TrendingUp, Users, Car, DollarSign, CheckCircle, XCircle } from "lucide-react";

const COLORS = ["#f87171", "#facc15", "#a78bfa"]; 

interface DashboardSummary {
  totalRides: number;
  totalCompletedRides: number;
  totalCancelledRides: number;
  totalRiders: number;
  totalDrivers: number;
  totalRevenue: number;
  cancellations?: {
    rider: { count: number; percentage: string };
    driver: { count: number; percentage: string };
    admin: { count: number; percentage: string };
  };
  weeklyStats: {
    _id: number;
    rides: number;
    completed: number;
    revenue: number;
  }[];
}

const StatCard = ({ title, value, icon: Icon, loading }: any) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
    </CardHeader>
    <CardContent>
      {loading ? (
        <Skeleton className="h-8 w-24" />
      ) : (
        <div className="text-2xl font-bold">{value}</div>
      )}
    </CardContent>
  </Card>
);

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-lg shadow-lg p-3">
        <p className="font-semibold">{payload[0].name}</p>
        <p className="text-sm text-muted-foreground">
          Count: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

const CustomBarTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-lg shadow-lg p-3">
        <p className="font-semibold mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.name === "Revenue" ? `$${entry.value.toFixed(2)}` : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Dashboard = () => {
  const { data, isLoading, isError } = useGetDashboardQuery({});
  const [summary, setSummary] = useState<DashboardSummary | null>(null);

  useEffect(() => {
    if (data?.data) {
      setSummary(data.data);
    }
  }, [data]);

  if (isError) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load dashboard data. Please try refreshing the page.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isLoading || !summary) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array(6)
            .fill(0)
            .map((_, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <Skeleton className="h-4 w-24" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-32" />
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    );
  }

  // Calculate cancellation data from backend if not provided
  const getCancellationData = () => {
    if (summary.cancellations) {
      return [
        { name: "Cancelled by Rider", value: summary.cancellations.rider.count },
        { name: "Cancelled by Driver", value: summary.cancellations.driver.count },
        { name: "Cancelled by Admin", value: summary.cancellations.admin.count },
      ].filter(item => item.value > 0);
    }
    // Fallback if backend doesn't provide breakdown
    return [
      { name: "Total Cancelled", value: summary.totalCancelledRides }
    ];
  };

  const cancelledPieData = getCancellationData();

  const weeklyBarData = summary.weeklyStats.map((w) => ({
    week: `Week ${w._id}`,
    rides: w.rides,
    completed: w.completed,
    revenue: w.revenue,
  }));

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const completionRate = summary.totalRides > 0 
    ? ((summary.totalCompletedRides / summary.totalRides) * 100).toFixed(1) 
    : 0;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Completion Rate: <span className="font-semibold text-foreground">{completionRate}%</span>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          title="Total Rides"
          value={summary?.totalRides?.toLocaleString()}
          icon={TrendingUp}
          loading={false}
        />
        <StatCard
          title="Completed Rides"
          value={summary?.totalCompletedRides?.toLocaleString()}
          icon={CheckCircle}
          loading={false}
        />
        <StatCard
          title="Cancelled Rides"
          value={summary?.totalCancelledRides?.toLocaleString()}
          icon={XCircle}
          loading={false}
        />
        <StatCard
          title="Total Riders"
          value={summary?.totalRiders?.toLocaleString()}
          icon={Users}
          loading={false}
        />
        <StatCard
          title="Total Drivers"
          value={summary?.totalDrivers?.toLocaleString()}
          icon={Car}
          loading={false}
        />
        <StatCard
          title="Total Revenue"
          value={formatCurrency(summary?.totalRevenue)}
          icon={DollarSign}
          loading={false}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart: Cancelled Rides */}
        {summary?.totalCancelledRides > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Cancelled Rides Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={cancelledPieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, percent }) => 
                      `${name}: ${(percent || 0 * 100).toFixed(0)}%`
                    }
                    labelLine={true}
                  >
                    {cancelledPieData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Bar Chart: Weekly Rides */}
        <Card className={summary.totalCancelledRides === 0 ? "lg:col-span-2" : ""}>
          <CardHeader>
            <CardTitle>Weekly Performance</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            {weeklyBarData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyBarData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="week" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip content={<CustomBarTooltip />} />
                  <Legend />
                  <Bar dataKey="rides" name="Total Rides" fill="#4ade80" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="completed" name="Completed" fill="#22d3ee" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="revenue" name="Revenue ($)" fill="#facc15" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No weekly data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      {summary.weeklyStats.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Week Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Latest Week</p>
                <p className="text-2xl font-bold">
                  Week {summary.weeklyStats[summary.weeklyStats.length - 1]._id}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rides This Week</p>
                <p className="text-2xl font-bold">
                  {summary.weeklyStats[summary.weeklyStats.length - 1].rides}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Revenue This Week</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(summary.weeklyStats[summary.weeklyStats.length - 1].revenue)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;