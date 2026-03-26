import type { Metadata } from 'next';
import JinGardenSimulator from '@/components/JinGardenSimulator';

export const metadata: Metadata = {
  title: '진의 신비한 정원 시뮬레이터',
  description: '진의 신비한 정원 이벤트 주사위 시뮬레이터 - 최적 경로, 특수 주사위 추천, 빽도 메타, 성장 비료 계산기',
};

export default function JinGardenPage() {
  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-2">
      <JinGardenSimulator />
    </div>
  );
}
