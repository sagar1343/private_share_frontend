import { CheckCircle2, Loader2 } from "lucide-react";

interface CircularProgressIndicatorProps {
  progress: number;
  fileName: string;
  complete: boolean;
}

export default function CircularProgressIndicator({ progress, fileName, complete }: CircularProgressIndicatorProps) {
  const size = 120;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const dash = (progress * circumference) / 100;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="transparent" stroke="currentColor" strokeWidth={strokeWidth} className="text-muted/20" />

          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - dash}
            strokeLinecap="round"
            className={`transition-all duration-300 ease-in-out ${complete ? "text-green-500" : "text-primary"}`}
            style={{
              transition: "stroke-dashoffset 0.5s ease-in-out",
            }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {complete ? (
            <CheckCircle2 className="w-12 h-12 text-green-500 animate-scale-in" />
          ) : (
            <>
              <span className="text-2xl font-bold">{progress}%</span>
              <Loader2 className="w-6 h-6 mt-1 animate-spin text-primary/70" />
            </>
          )}
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="font-medium text-sm truncate max-w-[200px]">{complete ? "Upload Complete!" : `Uploading ${fileName}...`}</p>
        {!complete && <p className="text-xs text-muted-foreground mt-1">Please wait while your file uploads</p>}
      </div>
    </div>
  );
}
