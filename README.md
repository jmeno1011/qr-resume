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

## 저장소에 PDF 포함하기

`public/Copy of 03_2026_Doh_Kim_Resume.pdf` 파일을 추가해서 같이 커밋하면 앱이 시작될 때 자동으로 해당 PDF를 엽니다.

```text
resume-viewer/
├── public/
│   └── Copy of 03_2026_Doh_Kim_Resume.pdf
```

파일명은 현재 앱 코드 기준으로 `Copy of 03_2026_Doh_Kim_Resume.pdf`를 찾습니다.

## 사용 방법

1. 저장소에 `public/Copy of 03_2026_Doh_Kim_Resume.pdf`가 있으면 자동으로 뷰어에 표시
2. 없으면 PDF 파일을 드래그하거나 클릭해서 업로드
3. 우측 상단 **QR 코드** 버튼 클릭
4. 사이드바에 QR 코드 + 다운로드 버튼 표시

## 배포 시 주의

- 업로드한 파일은 로컬 `blob:` URL이라 기기 간 공유가 되지 않습니다.
- `public/Copy of 03_2026_Doh_Kim_Resume.pdf`처럼 정적으로 포함한 파일은 배포 후 실제 URL로 공유할 수 있습니다.
- 추천 옵션: Vercel + Supabase Storage, Firebase Storage, AWS S3

## 구조

```
resume-viewer/
├── index.html
├── main.tsx
├── App.tsx
├── index.css
├── public/
│   └── Copy of 03_2026_Doh_Kim_Resume.pdf
├── components/
│   ├── UploadZone.tsx   # 드래그&드롭 업로드
│   ├── PdfViewer.tsx    # iframe PDF 뷰어
│   └── QRCodeCanvas.tsx # QR 코드 렌더러
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── tsconfig.json
```
