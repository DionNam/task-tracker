import { Member } from '@/lib/types';

interface MemberTableProps {
  members: (Member & { inputTokens: number; outputTokens: number; promptCount: number })[];
}

export function MemberTable({ members }: MemberTableProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">이름</th>
            <th className="text-right px-5 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">Input Tokens</th>
            <th className="text-right px-5 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">Output Tokens</th>
            <th className="text-right px-5 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">프롬프트</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {members.map((m) => (
            <tr key={m.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-5 py-3.5 text-sm font-medium text-slate-700">{m.name}</td>
              <td className="px-5 py-3.5 text-sm font-mono text-right text-slate-600">{m.inputTokens.toLocaleString()}</td>
              <td className="px-5 py-3.5 text-sm font-mono text-right text-slate-600">{m.outputTokens.toLocaleString()}</td>
              <td className="px-5 py-3.5 text-sm font-mono text-right text-slate-600">{m.promptCount.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
