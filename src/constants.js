// Base API URL
export const BASE_API_URL = 'http://localhost:8000/';

// API Endpoints
export const API_ENDPOINTS = {
  LOGIN_URL: '/auth/login',
  REGISTER_URL: '/auth/user-signup',
  OCR_URL: 'ocr',
  CLASSIFY_TEXT_URL: 'classify-text',
  OCR_QUESTION_URL: '/ocr/ocr-question',
  OCR_ANSWER_URL: '/ocr/ocr-answer',
  EVALUATE_URL: '/evaluate/evaluate',
  EVALUATE_EXPERIMENTAL_URL: '/evaluate/evaluate-experimental',
};

// User Roles
export const USER_ROLES = {
  SUPERADMIN: 1,
  TEACHER: 2,
};

// Build full API URL helper
export const getApiUrl = (endpoint) => {
  return `${BASE_API_URL}${endpoint}`;
};

