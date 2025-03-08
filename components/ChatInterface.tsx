import { useState, useRef, useEffect } from 'react';
import { MBTIType, Message } from '../types/mbti';
import { generateMBTIResponse, analyzeMBTICompatibility } from '../utils/openai';

interface ChatInterfaceProps {
  mbtiType?: MBTIType; // Optional now as we'll show all responses
}

const allMBTITypes: MBTIType[] = [
  'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
  'ISTP', 'ISFP', 'INFP', 'INTP',
  'ESTP', 'ESFP', 'ENFP', 'ENTP',
  'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
];

interface MBTIResponse {
  mbtiType: MBTIType;
  content: string;
  timestamp: Date;
}

interface ExtendedMessage extends Message {
  mbtiResponses?: MBTIResponse[];
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<ExtendedMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [compatibility, setCompatibility] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage: ExtendedMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // 모든 MBTI 유형의 응답을 병렬로 가져오기
      const responses = await Promise.all(
        allMBTITypes.map(async (mbtiType) => {
          const response = await generateMBTIResponse(
            inputMessage,
            mbtiType,
            messages.map(({ role, content }) => ({ role, content }))
          );
          return {
            mbtiType,
            content: response || '',
            timestamp: new Date(),
          };
        })
      );

      const assistantMessage: ExtendedMessage = {
        role: 'assistant',
        content: '', // 실제 내용은 mbtiResponses에 있음
        timestamp: new Date(),
        mbtiResponses: responses,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // 메시지가 5개 이상 쌓였을 때 성향 분석
      if (messages.length >= 4) {
        const compatibilityAnalysis = await analyzeMBTICompatibility(
          [...messages, newMessage].map(({ role, content }) => ({ role, content }))
        );
        setCompatibility(compatibilityAnalysis);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[800px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className="space-y-4">
            {/* 사용자 메시지 */}
            {message.role === 'user' && (
              <div className="flex justify-end">
                <div className="max-w-[70%] rounded-lg p-3 bg-blue-500 text-white">
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            )}
            
            {/* MBTI 응답들 */}
            {message.role === 'assistant' && message.mbtiResponses && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {message.mbtiResponses.map((response) => (
                  <div key={response.mbtiType} className="flex justify-start">
                    <div className="max-w-full rounded-lg p-3 bg-gray-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-bold text-gray-700">
                          {response.mbtiType}
                        </span>
                        <span className="text-xs text-gray-500">
                          {response.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-800">{response.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 rounded-lg p-3">
              <p className="text-gray-500">16가지 MBTI 유형이 답변을 작성중입니다...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {compatibility && (
        <div className="p-4 bg-yellow-50 border-t border-yellow-100">
          <p className="text-sm text-yellow-800">{compatibility}</p>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex space-x-4">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="질문을 입력하면 16가지 MBTI 유형이 모두 답변합니다..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            전송
          </button>
        </div>
      </form>
    </div>
  );
} 