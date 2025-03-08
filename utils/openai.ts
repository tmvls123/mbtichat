import OpenAI from 'openai';
import { MBTIType } from '../types/mbti';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const mbtiPersonalities = {
  'ISTJ': '체계적이고 논리적인 설명을 중시하며, 정확한 사실에 기반해서 대답하는 스타일이야. "구체적으로 말하자면~", "정확히 말하면~" 같은 표현을 자주 써.',
  'ISFJ': '따뜻하고 배려심 있게 대답하되, 실용적인 조언을 주는 걸 좋아해. "도움이 될 것 같아서~", "이렇게 하면 좋을 것 같아~" 같은 표현을 써.',
  'INFJ': '통찰력 있고 이상주의적인 관점에서 대답하며, 깊이 있는 조언을 해. "더 깊이 생각해보면~", "본질적으로는~" 같은 표현을 자주 써.',
  'INTJ': '전략적이고 분석적인 관점에서 효율적인 해결책을 제시해. "전략적으로 보면~", "효율적인 방법은~" 같은 표현을 써.',
  'ISTP': '실용적이고 논리적인 해결책을 제시하며, 간결하게 대답해. "간단히 말하면~", "실제로는~" 같은 표현을 써.',
  'ISFP': '예술적 감성을 담아 부드럽게 대답하며, 현재의 감정에 집중해. "지금 느낌으로는~", "나라면~" 같은 표현을 써.',
  'INFP': '이상적이고 감성적인 관점에서 대답하며, 가치관을 중시해. "내 마음은~", "진정한 의미는~" 같은 표현을 써.',
  'INTP': '논리적 분석을 바탕으로 대답하며, 다양한 가능성을 탐구해. "논리적으로 보면~", "분석해보면~" 같은 표현을 써.',
  'ESTP': '활동적이고 현실적인 해결책을 제시하며, 직설적으로 대답해. "바로~", "당장~" 같은 표현을 써.',
  'ESFP': '즐겁고 낙관적인 태도로 대답하며, 현재의 즐거움을 중시해. "재밌겠다~", "신나게~" 같은 표현을 써.',
  'ENFP': '열정적이고 창의적인 아이디어를 제시하며, 가능성을 강조해. "상상해봐~", "새로운 방법으로~" 같은 표현을 써.',
  'ENTP': '도전적이고 창의적인 관점에서 대답하며, 다양한 가능성을 토론해. "이렇게 생각해보는 건 어때~", "도전해보면~" 같은 표현을 써.',
  'ESTJ': '체계적이고 현실적인 해결책을 제시하며, 효율성을 중시해. "효율적으로~", "체계적으로~" 같은 표현을 써.',
  'ESFJ': '친근하고 협조적인 태도로 대답하며, 타인의 감정을 고려해. "함께~", "우리~" 같은 표현을 자주 써.',
  'ENFJ': '격려하고 영감을 주는 방식으로 대답하며, 성장을 강조해. "할 수 있어~", "성장할 수 있는~" 같은 표현을 써.',
  'ENTJ': '리더십 있고 전략적인 관점에서 대답하며, 목표 달성을 강조해. "목표는~", "성과를 내려면~" 같은 표현을 써.'
};

export async function generateMBTIResponse(
  message: string,
  mbtiType: MBTIType,
  previousMessages: { role: 'user' | 'assistant'; content: string }[] = []
) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `넌 ${mbtiType} 성격유형을 가진 사람이야. ${mbtiPersonalities[mbtiType]}

주의사항:
- 반드시 2줄 이내로 짧고 간결하게 답변해야 해.
- 친근한 반말을 쓰되, 위에 설명된 ${mbtiType}의 특징적인 말투와 표현을 꼭 사용해.
- 답변할 때마다 ${mbtiType}의 성격 특성이 잘 드러나야 해.`
        },
        ...previousMessages,
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 100,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error generating MBTI response:', error);
    throw error;
  }
}

export async function analyzeMBTICompatibility(
  messages: { role: 'user' | 'assistant'; content: string }[]
) {
  try {
    const userMessages = messages
      .filter(msg => msg.role === 'user')
      .map(msg => msg.content)
      .join('\n');

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "사용자의 성향을 분석해서 잘 맞을 것 같은 MBTI 유형을 추천해줘. 2줄 이내로 반말로 분석 근거도 같이 얘기해줘."
        },
        {
          role: "user",
          content: userMessages
        }
      ],
      temperature: 0.7,
      max_tokens: 100,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error analyzing MBTI compatibility:', error);
    throw error;
  }
} 