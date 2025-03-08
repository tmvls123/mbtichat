# MBTI 채팅 어시스턴트

MBTI 성격 유형별로 대화하며 나와 잘 맞는 MBTI 유형을 찾아볼 수 있는 웹 애플리케이션입니다.

## 주요 기능

- MBTI 유형 선택
- 각 MBTI 유형별 채팅 인터페이스
- 대화를 통한 성향 분석 및 추천
- MBTI 유형별 특징 및 궁합 정보 제공

## 기술 스택

- Next.js
- TypeScript
- Tailwind CSS
- OpenAI API
- Headless UI

## 시작하기

1. 저장소 클론
```bash
git clone [repository-url]
cd mbti-chat-assistant
```

2. 의존성 설치
```bash
npm install
```

3. 환경 변수 설정
- `.env` 파일을 생성하고 OpenAI API 키를 설정합니다:
```
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
```

4. 개발 서버 실행
```bash
npm run dev
```

5. 브라우저에서 확인
- http://localhost:3000 에서 애플리케이션을 확인할 수 있습니다.

## 사용 방법

1. MBTI 유형 선택
   - 드롭다운 메뉴에서 대화하고 싶은 MBTI 유형을 선택합니다.

2. 채팅
   - 선택한 MBTI 유형과 자유롭게 대화를 나눕니다.
   - 각 MBTI 유형의 특성에 맞는 답변을 받을 수 있습니다.

3. 성향 분석
   - 충분한 대화 후에는 사용자의 성향을 분석하여 잘 맞는 MBTI 유형을 추천받을 수 있습니다.

## 주의사항

- OpenAI API 사용량에 따라 비용이 발생할 수 있습니다.
- API 키는 절대로 공개되지 않도록 주의하세요.
