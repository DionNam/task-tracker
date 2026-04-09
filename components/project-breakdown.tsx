'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface ProjectBreakdownProps {
  data: { project: string; tokens: number }[];
}

const COLORS = ['#3B82F6', '#6366F1', '#8B5CF6', '#F59E0B', '#10B981'];

export function ProjectBreakdown({ data }: ProjectBreakdownProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
      <h3 className="text-sm font-semibold text-slate-700 mb-4">프로젝트별 사용량</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="tokens" nameKey="project" cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} label={({ name, percent }: { name?: string; percent?: number }) => `${(name || '').split('/').pop()} ${((percent || 0) * 100).toFixed(0)}%`}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => Number(value).toLocaleString()} contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
