'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface UsageChartProps {
  data: { date: string; inputTokens: number; outputTokens: number }[];
}

export function UsageChart({ data }: UsageChartProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
      <h3 className="text-sm font-semibold text-slate-700 mb-4">일별 토큰 사용량</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barCategoryGap="20%">
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => v >= 1000000 ? `${(v/1000000).toFixed(1)}M` : v >= 1000 ? `${(v/1000).toFixed(0)}K` : v} />
          <Tooltip
            contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
            formatter={(value, name) => [Number(value).toLocaleString(), String(name)]}
          />
          <Bar dataKey="inputTokens" name="Input" fill="#3B82F6" radius={[4, 4, 0, 0]} stackId="tokens" />
          <Bar dataKey="outputTokens" name="Output" fill="#93C5FD" radius={[4, 4, 0, 0]} stackId="tokens" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
