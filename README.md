# Lekha - AI-Powered CA Learning Platform

An AI-powered, practice-first learning platform designed specifically for Chartered Accountancy (CA) students.

## Features

- **Image Upload**: Upload handwritten question images with drag-and-drop support
- **Image Cropping**: Crop images before processing to focus on specific questions
- **OCR Processing**: Extract text from images using OCR with confidence scores
- **Text Classification**: Automatically classify extracted text into questions and answers
- **Real-time Processing**: Instant feedback on uploaded images

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Yarn package manager
- Backend API server running at `http://localhost:8000`

### Installation

1. Install dependencies:
```bash
yarn install
```

2. Start the development server:
```bash
yarn dev
```

3. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
yarn build
```

The built files will be in the `dist` directory.

## API Endpoints

The application expects the following backend endpoints:

### OCR Endpoint
- **URL**: `POST http://localhost:8000/ocr`
- **Content-Type**: `multipart/form-data`
- **Body**: Image file (form field: `file`)
- **Response**: 
```json
{
  "message": "Record retrieved successfully.",
  "data": {
    "text": "extracted text...",
    "confidence": 0.9
  },
  "status_code": 200
}
```

### Classify Text Endpoint
- **URL**: `POST http://localhost:8000/classify-text`
- **Content-Type**: `application/json`
- **Body**: 
```json
{
  "text": "text to classify..."
}
```
- **Response**:
```json
{
  "message": "Record retrieved successfully.",
  "data": {
    "question": "What is JavaScript?",
    "answer": "JavaScript is a programming language..."
  },
  "status_code": 200
}
```

## Project Structure

```
lekha-web/
├── src/
│   ├── components/
│   │   ├── FileUpload.jsx       # File upload component
│   │   ├── FileUpload.css
│   │   ├── ImageCropper.jsx     # Image cropping component
│   │   ├── ImageCropper.css
│   │   ├── OCRResult.jsx        # OCR results display
│   │   ├── OCRResult.css
│   │   ├── ClassifiedResult.jsx # Classified Q&A display
│   │   └── ClassifiedResult.css
│   ├── utils/
│   │   └── cropImage.js         # Image cropping utilities
│   ├── services/
│   │   └── api.js               # API service functions
│   ├── App.jsx                  # Main app component
│   ├── App.css
│   ├── main.jsx                 # Entry point
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client for API calls
- **react-easy-crop** - Image cropping component

## Development

The app uses Vite for fast development with hot module replacement. Any changes you make will be reflected immediately in the browser.

## License

Copyright © 2024 Lekha

