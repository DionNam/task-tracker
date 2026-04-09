interface TokenSummaryProps {
  inputTokens: number;
  outputTokens: number;
  totalTime: string;
  promptCount: number;
}

export function TokenSummary({ inputTokens, outputTokens, totalTime, promptCount }: TokenSummaryProps) {
  const cards = [
    { label: '사용 시간', value: totalTime, icon: '⏱', color: 'from-blue-500 to-blue-600' },
    { label: 'Input Tokens', value: inputTokens.toLocaleString(), icon: '↓', color: 'from-indigo-500 to-indigo-600' },
    { label: 'Output Tokens', value: outputTokens.toLocaleString(), icon: '↑', color: 'from-violet-500 to-violet-600' },
    { label: '프롬프트 수', value: promptCount.toLocaleString(), icon: '💬', color: 'from-amber-500 to-amber-600' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div key={card.label} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{card.label}</p>
            <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center text-white text-sm`}>{card.icon}</span>
          </div>
          <p className="text-2xl font-mono font-semibold text-slate-900">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
