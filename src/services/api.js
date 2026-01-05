import axios from 'axios';
import { BASE_API_URL, API_ENDPOINTS } from '../constants';

const api = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'Accept': 'application/json',
  },
});

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('access_token');
};

/**
 * Upload image and perform OCR
 * @param {File} file - Image file to upload
 * @returns {Promise} OCR response with text and confidence
 */
export const performOCR = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post(API_ENDPOINTS.OCR_URL, formData, {
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
  const response = await api.post(API_ENDPOINTS.CLASSIFY_TEXT_URL, {
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

  const token = getAuthToken();

  const response = await api.post(API_ENDPOINTS.OCR_QUESTION_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`,
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

  const token = getAuthToken();

  const response = await api.post(API_ENDPOINTS.OCR_ANSWER_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`,
    },
  });

  return response.data;
};

/**
 * Evaluate question and answer
 * @param {string} question - Question text
 * @param {string} answer - Answer text
 * @returns {Promise} Evaluation response with marks, verdict, and feedback
 */
export const evaluateAnswer = async (question, answer) => {
  const token = getAuthToken();

  const response = await api.post(API_ENDPOINTS.EVALUATE_URL, {
    question: question,
    answer: answer,
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  return response.data;
};

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @param {string} userData.email - User email
 * @param {string} userData.password - User password
 * @param {string} userData.first_name - User first name
 * @param {string} userData.last_name - User last name
 * @returns {Promise} Registration response
 */
export const registerUser = async (userData) => {
  const response = await api.post(API_ENDPOINTS.REGISTER_URL, {
    email: userData.email,
    password: userData.password,
    first_name: userData.first_name,
    last_name: userData.last_name,
  }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};

/**
 * Login user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} Login response with tokens and user data
 */
export const loginUser = async (email, password) => {
  const response = await api.post(API_ENDPOINTS.LOGIN_URL, {
    email: email,
    password: password,
  }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};

/**
 * Evaluate question and answer with experimental marking scheme
 * @param {string} question - Question text
 * @param {string} answer - Answer text
 * @param {number} totalMarks - Total marks for the question
 * @param {Array} markingScheme - Array of marking scheme points
 * @returns {Promise} Experimental evaluation response with marking breakdown
 */
export const evaluateAnswerExperimental = async (question, answer, totalMarks, markingScheme) => {
  const token = getAuthToken();

  const response = await api.post(API_ENDPOINTS.EVALUATE_EXPERIMENTAL_URL, {
    question: question,
    answer: answer,
    marking_scheme: {
      total_marks: totalMarks,
      scheme: markingScheme,
    },
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  return response.data;
};

