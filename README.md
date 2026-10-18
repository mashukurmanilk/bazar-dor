# 🛒 বাজার দর (Bazar Dor)

**বাজার দর** হলো বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজার মূল্যের একটি আধুনিক, রিয়েল-টাইম প্ল্যাটফর্ম। এখানে ক্রেতারা প্রতিদিনের সবজি, চাল, ডাল, মাছ, মাংস, তেলসহ অন্যান্য নিত্যপণ্যের দামের সর্বশেষ হালনাগাদ দেখতে পারবেন।

---

## 🚀 প্রধান বৈশিষ্ট্যসমূহ (Key Features)

1. **🔝 প্রিমিয়াম নেভবার ও ব্র্যান্ড আইডেন্টিটি (Modern Navbar & Identity)**
   - কাস্টম গ্রিন শপিং কার্ট লোগো এবং বোল্ড বাংলা টাইপোগ্রাফি (`বাজার দর`)।
   - রিয়েল-টাইম বাংলা তারিখ ফরম্যাটিং (যেমন: `শুক্রবার, ৩ অক্টোবর ২০২৫`)।
   
2. **🏷️ ক্যাটাগরি ফিল্টারিং ও নেভিগেশন (Dynamic Category Navigation)**
   - সবজি (🥬), চাল (🍚), তেল (🛢️), পেঁয়াজ (🧅), মাছ (🐟), মাংস (🥩), ডিম/দুধ (🥚), মসলা (🌶️) সহ বিভিন্ন ক্যাটাগরি ব্রাউজিং।
   - সক্রিয় ক্যাটাগরি হাইলাইটেড গ্রিন পিল স্টাইলে স্পষ্টভাবে প্রদর্শিত।
   - মোবাইল ও ট্যাবলেটে স্মুথ অনুভূমিক স্ক্রোলিং (Horizontal Scrolling)।

3. **📈 ইনফিনিট প্রাইস টিকার / মারকুই (Real-time Infinite Price Ticker)**
   - নেভবারের নিচে স্বয়ংক্রিয়ভাবে অবিরাম স্ক্রোল হওয়া লাইভ মার্কেট স্ট্রিপ।
   - পণ্যভিত্তিক ইমোজি, নাম, মূল্য/একক এবং মূল্য পরিবর্তনের শতাংশ (`▲` বৃদ্ধি লাল রঙে এবং `▼` হ্রাস সবুজ রঙে)।
   - কার্সার রাখলে (Hover) টিকার স্বয়ংক্রিয়ভাবে থেমে যায় যাতে সহজে পড়া যায়।

4. **🔐 অথেনটিকেশন ও প্রোফাইল সিস্টেম (Better Auth Authentication & Profile)**
   - Better Auth ও MongoDB ইন্টিগ্রেশন।
   - সাইন ইন (`সাইন ইন`) ও সাইন আপ (`সাইন আপ`) এর বাংলা ইউজার ইন্টারফেস।
   - লগইন অবস্থায় ইউজার এভারটার, নাম এবং ড্রপডাউন প্রোফাইল ও সাইন আউট ব্যবস্থা।

5. **📱 শতভাগ রেসপন্সিভ ডিজাইন (100% Fully Responsive Layout)**
   - মোবাইল, ট্যাবলেট এবং ডেস্কটপ সব ডিভাইসেই নির্বিঘ্নে ব্যবহারের উপযোগী।
   - টেলউইন্ড সিএসএস (Tailwind CSS v4) ও ডেইজিইউআই (DaisyUI) ভিত্তিক আধুনিক ইউআই আর্কিটেকচার।
   - বাংলা ফন্ট Hind Siliguri এর মাধ্যমে পরিচ্ছন্ন ও দৃষ্টিনন্দন ভিজ্যুয়াল উপস্থাপনা।

---

## 🛠️ ব্যবহৃত প্রযুক্তিসমূহ (Technologies Used)

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4, DaisyUI
- **Icons:** Lucide React
- **Fonts:** Hind Siliguri (Google Fonts), Geist Sans
- **Authentication:** Better Auth
- **Database:** MongoDB Atlas

---

## 💻 রান করার নিয়মাবলী (Getting Started)

১. ডিপেন্ডেন্সি ইন্সটল করুন:
```bash
npm install
```

২. ডেভেলপমেন্ট সার্ভার চালু করুন:
```bash
npm run dev
```

৩. ব্রাউজারে ওপেন করুন: [http://localhost:3000](http://localhost:3000)

---

## ⚙️ এনভায়রনমেন্ট ভেরিয়েবল ও ডিপ্লয়মেন্ট গাইড (Deployment & Environment Setup)

প্রজেক্টটি Vercel / Netlify / Render ইত্যাদিতে ডিপ্লয় করার সময় Environment Variables সেট করতে হবে:

```env
BETTER_AUTH_SECRET=CO9qzg34RSJGT99hfjSm9DrNAWQRyGUu
BETTER_AUTH_URL=https://your-domain.vercel.app
NEXT_PUBLIC_BETTER_AUTH_URL=https://your-domain.vercel.app
BETTER_AUTH_DB_URL=mongodb://mashukurmanik_6561:aKnHFqDjvIV7r1gF@ac-s0yaqn0-shard-00-00.jcsvfv3.mongodb.net:27017,ac-s0yaqn0-shard-00-01.jcsvfv3.mongodb.net:27017,ac-s0yaqn0-shard-00-02.jcsvfv3.mongodb.net:27017/?ssl=true&replicaSet=atlas-rza791-shard-0&authSource=admin
```

> **গুরুত্বপূর্ণ (MongoDB Atlas Network Access):**
> Vercel বা ক্লাউড সার্ভারলেস প্ল্যাটফর্ম থেকে MongoDB কানেক্ট করতে MongoDB Atlas এর **Network Access** সেকশনে গিয়ে `0.0.0.0/0` (Allow Access from Anywhere) যুক্ত করতে হবে, অন্যথায় সার্ভারলেস ফাংশন ডাটাবেসে কানেক্ট করতে না পেরে সাইন-ইন/সাইন-আপের সময় টাইমআউট বা এরর দেখাবে।

---

## 📦 প্রোডাকশন বিল্ড (Production Build)

```bash
npm run build
npm start
```

