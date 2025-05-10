export default function parseFileSize(sizeStr: string): number {
  const sizeRegex = /([\d.]+)\s*(B|kB|MB|GB|TB)/i;
  const match = sizeStr.match(sizeRegex);

  if (!match) return 0;

  const size = parseFloat(match[1]);
  const unit = match[2].toUpperCase();

  const multipliers: Record<string, number> = {
    B: 1,
    KB: 1024,
    MB: 1024 ** 2,
    GB: 1024 ** 3,
    TB: 1024 ** 4,
  };

  return size * (multipliers[unit] || 1);
}
