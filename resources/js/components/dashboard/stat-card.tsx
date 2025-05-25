import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCardProps } from '@/types';

export default function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <Card className="flex flex-col justify-between aspect-video overflow-hidden border rounded-xl border-sidebar-border/70 dark:border-sidebar-border">
      <CardHeader className="pb-0 flex flex-row items-start justify-between space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
