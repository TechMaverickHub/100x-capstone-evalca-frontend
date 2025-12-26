import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/json',
  },
});

/**
 * Upload image and perform OCR
 * @param {File} file - Image file to upload
 * @returns {Promise} OCR response with text and confidence
 */
export const performOCR = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post('/ocr', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

/**
 * Classify text into question and answer
 * @param {string} text - Text to classify
 * @returns {Promise} Classification response with question and answer
 */
export const classifyText = async (text) => {
  const response = await api.post('/classify-text', {
    text: text,
  }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};

/**
 * Upload question images and perform OCR (max 2 files)
 * @param {File[]} files - Array of image files (max 2)
 * @returns {Promise} OCR response with individual and combined results
 */
export const performQuestionOCR = async (files) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('files', file);
  });

  const response = await api.post('/ocr-question', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });


  return response.data;
};

/**
 * Upload answer images and perform OCR (max 5 files)
 * @param {File[]} files - Array of image files (max 5)
 * @returns {Promise} OCR response with individual and combined results
 */
export const performAnswerOCR = async (files) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('files', file);
  });

  const response = await api.post('/ocr-answer', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};


