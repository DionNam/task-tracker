'use client';

interface DateRangePickerProps {
  value: 'today' | 'week' | 'month';
  onChange: (value: 'today' | 'week' | 'month') => void;
}

export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  const options = [
    { key: 'today' as const, label: '오늘' },
    { key: 'week' as const, label: '이번 주' },
    { key: 'month' as const, label: '이번 달' },
  ];

  return (
    <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
      {options.map((opt) => (
        <button
          key={opt.key}
          onClick={() => onChange(opt.key)}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
            value === opt.key
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
