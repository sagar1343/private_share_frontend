interface StepCardProps {
  step: number;
  title: string;
  description: string;
}

export default function StepCard({ step, title, description }: StepCardProps) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <div className="absolute inset-0 bg-[#008CFC]/10 rounded-full blur-xl transform -translate-y-4"></div>
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#008CFC] to-[#0070CC] text-white text-2xl font-bold shadow-lg">
          {step}
        </div>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-slate-500 dark:text-slate-400">{description}</p>
      </div>
    </div>
  );
}
