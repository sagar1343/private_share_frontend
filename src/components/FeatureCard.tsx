import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  Icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({
  Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <Card className="text-left pt-0 gap-0 border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="h-40 bg-gradient-to-br from-[#008CFC]/5 to-[#008CFC]/20 dark:from-[#008CFC]/10 dark:to-[#008CFC]/30 flex items-center justify-center">
        <Icon className="h-16 w-16 text-[#008CFC]" />
      </div>
      <CardHeader className="mt-6 pb-2">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
