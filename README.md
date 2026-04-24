# 📄 Resume Viewer

QR 코드로 공유 가능한 PDF 이력서 뷰어 웹앱.

## 기술 스택
- **React 18** + **TypeScript**
- **Tailwind CSS v3**
- **Vite** (번들러)
- **qrcodejs** (CDN, QR 생성)

## 시작하기

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:5173` 열기

## 빌드

```bash
npm run build
npm run preview
```

## 사용 방법

1. PDF 이력서 파일을 드래그하거나 클릭해서 업로드
2. 우측 상단 **QR 코드** 버튼 클릭
3. 사이드바에 QR 코드 + 다운로드 버튼 표시

## 배포 시 주의

- 로컬 `blob://` URL은 기기 간 공유가 되지 않습니다.
- 실제 공유를 위해서는 PDF를 서버에 업로드하고 `shareUrl`을 실제 URL로 교체하세요.
- 추천 옵션: Vercel + Supabase Storage, Firebase Storage, AWS S3

## 구조

```
resume-viewer/
├── index.html
├── main.tsx
├── App.tsx
├── index.css
├── components/
│   ├── UploadZone.tsx   # 드래그&드롭 업로드
│   ├── PdfViewer.tsx    # iframe PDF 뷰어
│   └── QRCodeCanvas.tsx # QR 코드 렌더러
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── tsconfig.json
```
