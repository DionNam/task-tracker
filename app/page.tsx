import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-sm text-blue-300">Claude Code Usage Tracker</span>
        </div>
        <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">Task Tracker</h1>
        <p className="text-lg text-slate-400 mb-10">팀의 Claude Code 사용량을 한눈에</p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/login"
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/25"
          >
            팀장 로그인
          </Link>
          <Link
            href="/dashboard"
            className="bg-white/10 text-white border border-white/20 px-8 py-3 rounded-xl font-medium hover:bg-white/20 transition-colors backdrop-blur-sm"
          >
            개인 대시보드
          </Link>
        </div>
      </div>
    </div>
  );
}
