'use client';

import ChatInterface from '../components/ChatInterface';
import MBTICards from '../components/MBTICards';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              MBTI 멀티챗 어시스턴트
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
              하나의 질문에 16가지 MBTI 성격유형이 모두 답변합니다. 각 유형별 특징적인 답변을 비교해보세요!
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8">
          {/* Chat Interface */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <ChatInterface />
            </div>
          </div>

          {/* MBTI Cards */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">MBTI 유형별 특징</h2>
            <MBTICards />
          </div>
        </div>
      </div>
    </main>
  );
}
