# 📋 قائمة جميع الـ API Endpoints

## ✅ جميع الـ APIs جاهزة للعمل على السيرفر

### 🔐 Authentication APIs
- ✅ `POST /api/auth/register` - إنشاء حساب Admin (فقط عند عدم وجود مستخدمين)
- ✅ `POST /api/auth/login` - تسجيل الدخول
- ✅ `GET /api/auth/me` - الحصول على معلومات المستخدم الحالي

### 📁 Projects APIs
- ✅ `GET /api/projects` - جلب جميع المشاريع (عام)
- ✅ `GET /api/projects/:id` - جلب مشروع محدد
- ✅ `POST /api/projects` - إنشاء مشروع جديد (يتطلب مصادقة)
- ✅ `PUT /api/projects/:id` - تحديث مشروع (يتطلب مصادقة)
- ✅ `DELETE /api/projects/:id` - حذف مشروع (يتطلب مصادقة)

### 📧 Contact APIs
- ✅ `POST /api/contact` - إرسال رسالة من نموذج الاتصال (عام)
- ✅ `GET /api/contact` - جلب جميع الرسائل (للإدارة)

### 📄 Sections APIs

#### About Section
- ✅ `GET /api/sections/about` - جلب قسم About
- ✅ `PUT /api/sections/about` - تحديث قسم About (يتطلب مصادقة)
- ✅ `POST /api/sections/about/images` - إضافة صورة لقسم About (يتطلب مصادقة)
- ✅ `DELETE /api/sections/about/images/:imageId` - حذف صورة من قسم About (يتطلب مصادقة)

#### Education Section
- ✅ `GET /api/sections/education` - جلب جميع مدخلات Education
- ✅ `POST /api/sections/education` - إنشاء مدخل Education (يتطلب مصادقة)
- ✅ `PUT /api/sections/education/:id` - تحديث مدخل Education (يتطلب مصادقة)
- ✅ `DELETE /api/sections/education/:id` - حذف مدخل Education (يتطلب مصادقة)

#### Reviews Section
- ✅ `GET /api/sections/reviews` - جلب جميع Reviews
- ✅ `POST /api/sections/reviews` - إنشاء Review (يتطلب مصادقة)
- ✅ `PUT /api/sections/reviews/:id` - تحديث Review (يتطلب مصادقة)
- ✅ `DELETE /api/sections/reviews/:id` - حذف Review (يتطلب مصادقة)

### 📤 Upload APIs
- ✅ `POST /api/upload/image` - رفع صورة (يتطلب مصادقة)
- ✅ `DELETE /api/upload/image/:filename` - حذف صورة (يتطلب مصادقة)
- ✅ `POST /api/upload/resume` - رفع ملف السيرة الذاتية (يتطلب مصادقة)
- ✅ `GET /api/upload/resume` - جلب معلومات السيرة الذاتية (عام)
- ✅ `DELETE /api/upload/resume` - حذف السيرة الذاتية (يتطلب مصادقة)

### 🏥 Health Check
- ✅ `GET /api/health` - فحص حالة السيرفر وقاعدة البيانات
- ✅ `GET /health` - فحص حالة السيرفر (بدون /api)

---

## 🔗 المسارات المباشرة (بدون /api)

جميع الـ APIs متاحة أيضاً بدون بادئة `/api`:
- ✅ `/projects` → `/api/projects`
- ✅ `/contact` → `/api/contact`
- ✅ `/auth` → `/api/auth`
- ✅ `/sections` → `/api/sections`
- ✅ `/upload` → `/api/upload`

---

## 📊 استخدام الـ APIs في الـ Frontend

### ✅ جميع الـ APIs المستخدمة في الـ Frontend موجودة في الـ Backend:

1. **Dashboard.tsx**:
   - ✅ GET /projects
   - ✅ POST /projects
   - ✅ PUT /projects/:id
   - ✅ DELETE /projects/:id
   - ✅ POST /upload/image
   - ✅ GET /sections/about
   - ✅ PUT /sections/about
   - ✅ POST /sections/about/images
   - ✅ DELETE /sections/about/images/:id
   - ✅ DELETE /upload/image/:filename
   - ✅ GET /sections/education
   - ✅ POST /sections/education
   - ✅ PUT /sections/education/:id
   - ✅ DELETE /sections/education/:id
   - ✅ GET /sections/reviews
   - ✅ POST /sections/reviews
   - ✅ PUT /sections/reviews/:id
   - ✅ DELETE /sections/reviews/:id
   - ✅ GET /upload/resume
   - ✅ POST /upload/resume
   - ✅ DELETE /upload/resume

2. **Hero.tsx**:
   - ✅ GET /upload/resume

3. **About.tsx**:
   - ✅ GET /sections/about

4. **Education.tsx**:
   - ✅ GET /sections/education

5. **Reviews.tsx**:
   - ✅ GET /sections/reviews

6. **Projects.tsx**:
   - ✅ GET /projects

7. **Contact.tsx**:
   - ✅ POST /api/contact (يستخدم fetch مباشرة)

8. **AuthContext.tsx**:
   - ✅ POST /auth/login

---

## ✅ الخلاصة

**جميع الـ APIs (23 endpoint) جاهزة للعمل على السيرفر!**

- ✅ جميع الـ routes معرّفة في `backend/server.js`
- ✅ جميع الـ routes موجودة في ملفات `backend/routes/`
- ✅ جميع الـ APIs المستخدمة في الـ Frontend موجودة في الـ Backend
- ✅ جميع الـ APIs متاحة مع وبدون بادئة `/api`
- ✅ الـ Middleware للتحقق من قاعدة البيانات مطبق على جميع الـ routes
- ✅ الـ CORS مضبوط للسماح بجميع الطلبات من الـ Frontend

**العنوان الكامل للـ Backend:**
```
https://arwamohamedsalah.onrender.com/api
```

**مثال على استخدام API:**
```javascript
// في الـ Frontend
api.get('/projects') 
// سيتم استدعاء: https://arwamohamedsalah.onrender.com/api/projects
```

