'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { Team, Member } from '@/lib/types';

function generateInviteKey(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let key = 'tk_';
  for (let i = 0; i < 32; i++) {
    key += chars[Math.floor(Math.random() * chars.length)];
  }
  return key;
}

export default function TeamSettingsPage() {
  const [team, setTeam] = useState<Team | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [teamName, setTeamName] = useState('');
  const [memberName, setMemberName] = useState('');
  const supabase = createClient();

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: teams } = await supabase
      .from('teams')
      .select('*')
      .eq('owner_id', user.id)
      .limit(1);

    if (teams && teams.length > 0) {
      setTeam(teams[0]);
      const { data: mems } = await supabase
        .from('members')
        .select('*')
        .eq('team_id', teams[0].id);
      setMembers(mems || []);
    }
  }

  async function createTeam() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !teamName) return;
    await supabase.from('teams').insert({ name: teamName, owner_id: user.id });
    await loadData();
    setTeamName('');
  }

  async function addMember() {
    if (!team || !memberName) return;
    const inviteKey = generateInviteKey();
    await supabase.from('members').insert({
      team_id: team.id,
      invite_key: inviteKey,
      name: memberName,
    });
    await loadData();
    setMemberName('');
  }

  async function deleteMember(id: string) {
    await supabase.from('members').delete().eq('id', id);
    await loadData();
  }

  if (!team) {
    return (
      <div className="max-w-md mx-auto p-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">팀 생성</h1>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-4">
          <input
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="팀 이름"
            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
          />
          <button onClick={createTeam} className="bg-blue-600 text-white px-6 py-3 rounded-xl w-full font-medium hover:bg-blue-500 transition-colors">
            생성
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">{team.name} — 설정</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h2 className="font-semibold text-slate-700 mb-4">팀원 추가</h2>
        <div className="flex gap-2">
          <input
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
            placeholder="팀원 이름"
            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 flex-1 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
          />
          <button onClick={addMember} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-500 transition-colors">
            추가
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">이름</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Invite Key</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">액션</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {members.map((m) => (
              <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 text-sm text-slate-700">{m.name}</td>
                <td className="px-4 py-3">
                  <span className="font-mono text-xs bg-slate-50 px-2 py-1 rounded border border-slate-200 text-slate-600">{m.invite_key}</span>
                </td>
                <td className="px-4 py-3 text-sm text-right">
                  <button
                    onClick={() => navigator.clipboard.writeText(m.invite_key)}
                    className="text-blue-500 hover:text-blue-600 font-medium mr-3 transition-colors"
                  >
                    복사
                  </button>
                  <button
                    onClick={() => deleteMember(m.id)}
                    className="text-red-500 hover:text-red-600 font-medium transition-colors"
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
