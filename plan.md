# Lekha - AI-Powered CA Learning Platform
## Project Plan & Requirements

---

## 🎯 Project Overview

**Lekha** is an AI-powered, practice-first learning platform designed specifically for Chartered Accountancy (CA) students. The platform enables students to practice questions in multiple modes (concept-wise, chapter-wise, exam-wise) in a real exam-like environment, with AI-powered evaluation and personalized learning paths.

---

## 🚀 Core Features

### 1. **Question Practice Modes**
   - **Concept-wise**: Practice questions grouped by specific concepts
   - **Chapter-wise**: Practice questions organized by chapters/subjects
   - **Exam-wise**: 
     - PYQs (Previous Year Questions)
     - MTPs (Mock Test Papers)
     - RTPs (Revision Test Papers)

### 2. **Real Exam-like Environment**
   - Timed practice sessions
   - Exam-style interface
   - Question navigation
   - Answer submission workflow

### 3. **AI Evaluation Engine**
   - **For Descriptive Answers**:
     - Structure analysis
     - Presentation evaluation
     - Accuracy checking
     - Conceptual clarity assessment
   - Instant feedback on writing quality and reasoning

### 4. **AI-Driven Analytics**
   - Continuous identification of strong and weak areas
   - Performance tracking across concepts, chapters, and subjects
   - Progress visualization

### 5. **Personalized Learning**
   - Automatic generation of personalized test sets
   - Focus on improvement gaps
   - Adaptive difficulty
   - Systematic strengthening of weak concepts

---

## ❓ Targeted Questions for Clarification

### **Platform & User Management**
1. **User Authentication & Roles**:
   - Do we need multiple user roles (Student, Admin, Teacher/Instructor)?
   - Should we support social login (Google, Facebook) or only email/password?
   - Do we need student profile management (name, CA level, subjects enrolled)?

2. **CA Levels & Subjects**:
   - Which CA levels should we support? (Foundation, Intermediate, Final)
   - What subjects need to be included? (e.g., Accounts, Law, Taxation, Audit, etc.)
   - Should students be able to select multiple subjects/levels simultaneously?

### **Question Bank & Content**
3. **Question Types**:
   - What question formats do we need? (MCQ, Descriptive, Case Study, Numerical)
   - Should questions include images/diagrams?
   - Do we need support for mathematical equations/formulas?
   - Should questions have difficulty levels (Easy, Medium, Hard)?

4. **Question Sources**:
   - Do you have existing question banks/data?
   - Should admins be able to upload questions via CSV/Excel?
   - Do we need a question management interface for content creators?

5. **Answer Formats**:
   - For descriptive answers, should students type directly or upload images/documents?
   - Do we need support for handwritten answer evaluation (OCR)?
   - Should there be word/character limits for answers?

### **AI Evaluation Engine**
6. **Evaluation Criteria**:
   - What specific rubrics should the AI use for evaluation?
   - Should evaluation scores be numerical (0-100) or categorical (Excellent, Good, Needs Improvement)?
   - Do we need to compare student answers against model answers?
   - Should the AI provide line-by-line feedback or overall feedback?

7. **AI Model & Integration**:
   - Do you have a preferred AI service (OpenAI GPT, Claude, custom model)?
   - Should evaluation be real-time or batch processing?
   - What's the expected response time for AI evaluation?
   - Do we need to store evaluation history for retraining?

### **Exam Environment**
8. **Practice Session Configuration**:
   - Should students be able to customize practice sessions (number of questions, time limit)?
   - Do we need pause/resume functionality?
   - Should there be a "Review" mode after submission?
   - Do we need support for offline practice?

9. **Navigation & UI**:
   - Should students be able to skip questions and come back?
   - Do we need a question palette showing attempted/unattempted/review status?
   - Should there be a timer countdown with warnings?

### **Analytics & Personalization**
10. **Performance Tracking**:
    - What metrics should we track? (accuracy, time taken, concept mastery, improvement trends)
    - Should we show performance comparisons with peer averages?
    - Do we need detailed performance reports (daily, weekly, monthly)?

11. **Weak Area Identification**:
    - How should we define "weak areas"? (below threshold accuracy, repeated mistakes, time taken)
    - Should weak areas be identified at concept, chapter, or subject level?
    - How frequently should weak areas be recalculated?

12. **Personalized Test Generation**:
    - What percentage of questions should be from weak areas vs. strong areas?
    - Should personalized tests have a fixed number of questions or adaptive?
    - Do we need to ensure variety (not repeating same questions)?

### **Technical & Infrastructure**
13. **Technology Stack Preferences**:
    - Frontend: React, Vue, Angular, or Next.js?
    - Backend: Node.js, Python (Django/FastAPI), or other?
    - Database: PostgreSQL, MongoDB, or other?
    - Cloud hosting: AWS, Azure, GCP, or self-hosted?

14. **Scalability & Performance**:
    - Expected number of concurrent users?
    - Expected question bank size?
    - Do we need CDN for static assets?
    - Should we implement caching strategies?

15. **Data & Privacy**:
    - Do we need to comply with any data protection regulations (GDPR, etc.)?
    - Should student data be anonymized for analytics?
    - Do we need data export functionality for students?

### **Monetization & Access**
16. **Pricing Model**:
    - Free tier with limited features?
    - Subscription plans (monthly/yearly)?
    - Pay-per-exam or pay-per-subject?
    - Do we need trial periods?

17. **Feature Access**:
    - Should some features be premium-only?
    - Should AI evaluation be available in free tier or premium only?

### **Additional Features**
18. **Social & Gamification**:
    - Leaderboards?
    - Badges/achievements?
    - Study groups or peer comparison?
    - Discussion forums for questions?

19. **Notifications & Reminders**:
    - Email notifications for weak areas?
    - Reminders for practice sessions?
    - Performance milestone celebrations?

20. **Mobile Support**:
    - Do we need a mobile app (iOS/Android) or responsive web is sufficient?
    - Should mobile have full feature parity?

---

## 📋 Proposed Implementation Phases

### **Phase 1: Foundation (Weeks 1-4)**
- Project setup and architecture
- User authentication and basic profile management
- Database schema design
- Basic UI/UX framework
- Question bank structure and basic CRUD operations

### **Phase 2: Core Practice Features (Weeks 5-8)**
- Question practice modes (concept/chapter/exam-wise)
- Exam-like environment implementation
- Basic answer submission and storage
- Question navigation and timer functionality

### **Phase 3: AI Evaluation Engine (Weeks 9-12)**
- AI integration for descriptive answer evaluation
- Evaluation criteria implementation
- Feedback generation and display
- Evaluation history and analytics

### **Phase 4: Analytics & Personalization (Weeks 13-16)**
- Performance tracking and analytics dashboard
- Weak area identification algorithm
- Personalized test generation engine
- Progress visualization

### **Phase 5: Polish & Optimization (Weeks 17-20)**
- UI/UX refinements
- Performance optimization
- Testing and bug fixes
- Documentation and deployment

---

## 🎨 Key Design Considerations

### **User Experience**
- Clean, distraction-free exam interface
- Intuitive navigation
- Clear feedback and progress indicators
- Mobile-responsive design

### **Performance**
- Fast question loading
- Efficient AI evaluation (async processing)
- Optimized database queries
- Caching strategies

### **Scalability**
- Microservices architecture (if needed)
- Queue system for AI evaluation
- Horizontal scaling capability
- Efficient data storage

---

## 📝 Next Steps

1. **Answer the targeted questions above** to refine requirements
2. **Finalize technology stack** based on team expertise and requirements
3. **Create detailed wireframes/mockups** for key screens
4. **Set up development environment** and repository
5. **Begin Phase 1 implementation**

---

## 📚 Documentation to Create

- [ ] API Documentation
- [ ] Database Schema Documentation
- [ ] AI Evaluation Rubric Documentation
- [ ] User Guide
- [ ] Admin Guide
- [ ] Deployment Guide

---

**Last Updated**: [Current Date]
**Status**: Planning Phase


