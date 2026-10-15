# 🎬 Video Editor Portfolio (Ready to Launch)

Welcome to your brand-new video editor portfolio! It is custom-built for **9:16 vertical short-form videos** (Reels, Shorts, TikTok) and tailored for attracting clients in Gujarat (factories, showrooms, clinics, local shops, and creators).

---

## 🚀 How to View It Right Now on Your Computer
1. Open your File Explorer and go to `F:\Portfolio`.
2. Double-click **`index.html`**.
3. It will open instantly in your Chrome or browser! You can resize your browser window or press `F12` and click the mobile toggle icon to see how it looks on an iPhone/Android.

---

## ✏️ How to Change Your Info & Add New Videos (Zero Coding)

All your details and videos live in one single file: **[`videos.js`](file:///f:/Portfolio/videos.js)**.

### 1. Update Your WhatsApp Number & Name:
Open [`videos.js`](file:///f:/Portfolio/videos.js) in any text editor (Notepad, VS Code, etc.) and edit the top part:

```javascript
const PORTFOLIO_CONFIG = {
  editorName: "Your Name or Brand",
  whatsappNumber: "919876543210", // 91 + your 10-digit phone number
  whatsappDefaultMsg: "Hi! I saw your video portfolio...",
  instagramHandle: "your.instagram.handle",
  emailAddress: "your-email@gmail.com",
};
```
Whenever anyone clicks *any* WhatsApp button on your site, it will open a direct WhatsApp chat with you on their phone!

---

### 2. How to Add a New Video You Created for a Client:
1. Upload your vertical video as **Unlisted** to YouTube (or as a YouTube Short).
2. Look at the link. For example: `https://www.youtube.com/watch?v=dQw4w9WgXcQ` or `https://youtube.com/shorts/dQw4w9WgXcQ`. The ID is **`dQw4w9WgXcQ`**.
3. In [`videos.js`](file:///f:/Portfolio/videos.js), scroll to `VIDEOS_DATA` and paste a new block:

```javascript
{
  id: 13,
  title: "Tea Post / Cafe Promo Reel",
  client: "Tea Post Franchise",
  category: "lifestyle", // choose: 'factory', 'showroom', 'explainer', 'lifestyle', or 'motion'
  tag: "Food & Cafe",
  youtubeId: "dQw4w9WgXcQ", // Paste your video ID here
  thumbnail: "https://your-thumbnail-image-url.jpg",
  description: "Fast-paced brewing b-roll with rhythmic acoustic beat sync."
}
```
Save the file and refresh your browser. Your new video is live!

---

## 🌐 How to Host It for 100% Free (Forever)

When you're ready to share your link with clients on Instagram, WhatsApp, or cold emails:

### Method 1: Vercel (Easiest & Fastest - 2 minutes)
1. Go to [vercel.com](https://vercel.com) and create a free account.
2. Drag and drop the `f:\Portfolio` folder into Vercel.
3. You immediately get a live free link like `yourname-edits.vercel.app`.

### Method 2: GitHub Pages (100% Free Forever)
1. Create a free account at [github.com](https://github.com).
2. Create a repository named `portfolio`.
3. Upload the files in `f:\Portfolio`.
4. Go to Settings $\to$ Pages $\to$ Enable GitHub Pages.
5. Your site is live at `yourusername.github.io/portfolio`!
