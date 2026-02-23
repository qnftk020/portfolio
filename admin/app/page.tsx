import { getProjects } from '@/lib/supabase'
import Link from 'next/link'
import LogoutButton from './LogoutButton'
import RebuildButton from './RebuildButton'

export const dynamic = 'force-dynamic'

const statusColors: Record<string, string> = {
  'Done': 'bg-green-100 text-green-700',
  'In-progress': 'bg-blue-100 text-blue-700',
  'Not started': 'bg-gray-100 text-gray-600',
}

export default async function AdminHome() {
  const projects = await getProjects()

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Portfolio Admin</h1>
        <div className="flex items-center gap-3">
          <RebuildButton />
          <LogoutButton />
        </div>
      </div>

      {/* Add new */}
      <div className="mb-6">
        <Link href="/projects/new" className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition">
          + 프로젝트 추가
        </Link>
      </div>

      {/* Projects list */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">제목</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">연도</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">상태</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Featured</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600"></th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p, i) => (
              <tr key={p.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                <td className="px-4 py-3 font-medium text-gray-900">{p.title}</td>
                <td className="px-4 py-3 text-gray-500">{p.year}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[p.status] ?? 'bg-gray-100 text-gray-600'}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">{p.featured ? '⭐' : '—'}</td>
                <td className="px-4 py-3">
                  <Link href={`/projects/${p.id}`} className="text-blue-600 hover:underline">수정</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {projects.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">프로젝트가 없습니다</div>
        )}
      </div>
    </div>
  )
}
