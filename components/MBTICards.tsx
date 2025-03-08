import { MBTIType, MBTIPersonality } from '../types/mbti';

const mbtiData: MBTIPersonality[] = [
  {
    type: 'ISTJ',
    description: '청렴결백한 논리주의자',
    traits: ['체계적', '신중함', '책임감', '현실적'],
    compatibleTypes: ['ESFP', 'ESTP']
  },
  {
    type: 'ISFJ',
    description: '용감한 수호자',
    traits: ['헌신적', '따뜻한', '섬세한', '충실함'],
    compatibleTypes: ['ENFP', 'ENTP']
  },
  {
    type: 'INFJ',
    description: '선의의 옹호자',
    traits: ['이상주의적', '통찰력', '성실함', '창의적'],
    compatibleTypes: ['ENFP', 'ENTP']
  },
  {
    type: 'INTJ',
    description: '용의주도한 전략가',
    traits: ['분석적', '독립적', '전략적 사고', '높은 기준'],
    compatibleTypes: ['ENFP', 'ENTP']
  },
  {
    type: 'ISTP',
    description: '만능 재주꾼',
    traits: ['적응력', '관찰력', '실용적', '논리적'],
    compatibleTypes: ['ESFJ', 'ENFJ']
  },
  {
    type: 'ISFP',
    description: '호기심 많은 예술가',
    traits: ['예술적', '탐험적', '유연한', '온화한'],
    compatibleTypes: ['ENTJ', 'ESTJ']
  },
  {
    type: 'INFP',
    description: '열정적인 중재자',
    traits: ['이상주의', '창의력', '공감능력', '적응력'],
    compatibleTypes: ['ENTJ', 'ESTJ']
  },
  {
    type: 'INTP',
    description: '논리적인 사색가',
    traits: ['창의적', '논리적', '객관적', '적응력 있는'],
    compatibleTypes: ['ENFJ', 'ENTJ']
  },
  {
    type: 'ESTP',
    description: '모험을 즐기는 사업가',
    traits: ['활동적', '현실적', '즉흥적', '대담한'],
    compatibleTypes: ['ISFJ', 'ISTJ']
  },
  {
    type: 'ESFP',
    description: '자유로운 영혼의 연예인',
    traits: ['즐거움 추구', '낙관적', '친근한', '자발적'],
    compatibleTypes: ['ISTJ', 'ISFJ']
  },
  {
    type: 'ENFP',
    description: '재기발랄한 활동가',
    traits: ['열정적', '창의적', '사교적', '자유로운'],
    compatibleTypes: ['INTJ', 'INFJ']
  },
  {
    type: 'ENTP',
    description: '뜨거운 논쟁을 즐기는 변론가',
    traits: ['혁신적', '활기찬', '지적인', '호기심 많은'],
    compatibleTypes: ['INTJ', 'INFJ']
  },
  {
    type: 'ESTJ',
    description: '엄격한 관리자',
    traits: ['체계적', '실용적', '지도력', '결단력'],
    compatibleTypes: ['ISFP', 'INFP']
  },
  {
    type: 'ESFJ',
    description: '사교적인 외교관',
    traits: ['친절한', '협조적', '헌신적', '사교적'],
    compatibleTypes: ['ISTP', 'INTP']
  },
  {
    type: 'ENFJ',
    description: '정의로운 사회운동가',
    traits: ['카리스마', '이타적', '공감능력', '사교성'],
    compatibleTypes: ['ISTP', 'INTP']
  },
  {
    type: 'ENTJ',
    description: '대담한 통솔자',
    traits: ['카리스마 있는', '효율적인', '전략적', '야망 있는'],
    compatibleTypes: ['INTP', 'INFP']
  }
];

export default function MBTICards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {mbtiData.map((mbti) => (
        <div
          key={mbti.type}
          className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {mbti.type}
            </h3>
            <p className="text-lg text-gray-600 mb-4">{mbti.description}</p>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  주요 특징
                </h4>
                <ul className="mt-2 space-y-1">
                  {mbti.traits.map((trait, index) => (
                    <li
                      key={index}
                      className="text-gray-600 flex items-center space-x-2"
                    >
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      <span>{trait}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  잘 맞는 유형
                </h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {mbti.compatibleTypes.map((type) => (
                    <span
                      key={type}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 