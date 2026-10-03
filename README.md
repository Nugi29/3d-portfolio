# 🌌 3D Cinematic Scrollytelling Portfolio

A high-performance, Apple-style interactive 3D scrollytelling portfolio website built with **HTML5 Canvas**, **Vanilla CSS**, and **JavaScript**. Features ultra-smooth frame scrubbing tied to user scroll, rich cyberpunk neon lighting, glassmorphism UI components, and modern responsive layouts.

---

## ✨ Features & Highlights

- 🎬 **Cinematic Scrollytelling Engine**: Seamless 60FPS video scrubbing powered by HTML5 `<canvas>`, requestAnimationFrame, and linear interpolation (LERP) easing.
- ⚡ **Optimized Asset Pipeline**: Progressive frame loading and nearest-neighbor frame fallbacks prevent blank states while images load.
- 🎨 **Cyberpunk & Glassmorphism Aesthetic**: Dark burgundy backdrop, crimson & magenta rim lighting, translucent glass cards with backdrop filters.
- 📱 **Fully Responsive**: Dynamic canvas cover-scaling and adaptable grid layouts for Desktop, Tablet, and Mobile screens.
- 🚀 **Zero Heavy Frameworks**: Pure Vanilla Web Technologies — lightweight, zero bloated dependencies, ultra-fast load times.

---

## 🛠️ Complete Creation Pipeline & Guide

This website was built using a unique AI-to-Web Scrollytelling workflow combining Generative AI, Frame Extraction, and Intelligent Front-End Engineering. Follow the exact step-by-step guide below to create your own:

### 1️⃣ Step 1: Generate the Base Portrait (ChatGPT / Midjourney / DALL·E)

Start with a clear personal portrait photo and use an image generation AI with the following prompt:

> **Prompt (Image Generation):**
>
> ```text
> Transform this portrait into a cinematic neon portrait with deep black shadows, dramatic magenta and crimson rim lighting from both sides, soft low-key studio lighting, dark burgundy-to-black gradient background, high contrast, moody cyberpunk aesthetic, sharp facial details, subtle glow, premium editorial photography, realistic, ultra-detailed, 8K. Preserve the person's identity and facial features. Generate image in 16:9 ratio.
> ```

---

### 2️⃣ Step 2: Generate Cinematic Motion Video (Google Flow / Kling / Runway / Luma)

Feed the generated 16:9 portrait image into a Video Generation AI (such as Google Flow, Runway Gen-2/3, Luma Dream Machine, or Kling AI) to create a smooth 6–8 second motion clip.

> **Prompt (Video Generation):**
>
> ```text
> Create a smooth, cinematic 6–8 second professional portfolio animation using the provided portrait as the exact character reference.
>
> Preserve the subject's identity, facial structure, hairstyle, skin tone, body proportions, and realistic appearance throughout the entire shot.
>
> SHOT & MOTION:
> Start with the subject positioned toward the LEFT side of the frame, shown in a natural three-quarter side profile, looking slightly away from the camera.
>
> Very slowly and smoothly, the subject turns his head and upper body toward the camera until he faces directly forward. The movement should be subtle, confident, natural, and physically realistic — no sudden movements or exaggerated rotation.
>
> During the turn, he naturally puts on / adjusts a pair of stylish modern glasses with one hand, then looks directly into the camera.
>
> After facing the camera, hold the final pose for a moment with a calm, confident professional expression.
>
> CAMERA:
> Slow cinematic camera push-in with extremely subtle parallax.
> Keep the camera movement smooth and stable.
> No handheld movement.
> No sudden zoom.
> No camera shake.
> No cuts.
>
> LIGHTING & STYLE:
> Dark cinematic studio environment.
> Deep black shadows with subtle burgundy atmosphere.
> Soft magenta and crimson rim lighting from opposite sides.
> Subtle neon reflections on the glasses.
> High contrast but natural skin tones.
> Premium editorial photography.
> Modern cyberpunk-inspired portfolio aesthetic.
> Soft atmospheric haze and very subtle floating particles.
>
> COMPOSITION:
> 16:9 widescreen.
> Keep the subject primarily on the LEFT during the opening.
> Gradually bring the visual focus toward the CENTER as he turns toward the camera.
> Leave clean negative space around the subject.
> Professional composition suitable for a developer portfolio website hero section.
>
> MOTION QUALITY:
> Ultra-smooth realistic facial motion.
> Natural eye movement and blinking.
> Natural breathing.
> Realistic hand and finger movement.
> Realistic clothing movement.
> No warping.
> No facial distortion.
> No identity changes.
> No extra fingers.
> No duplicated body parts.
> No unnatural head rotation.
>
> ENDING:
> Finish with the subject facing directly toward the camera, wearing the glasses, with a subtle confident expression.
> Hold the final frame cleanly for approximately 1 second.
>
> Overall feeling:
> premium personal-brand portfolio, cinematic, minimal, confident, modern, high-end, professional, realistic, smooth.
> ```

---

### 3️⃣ Step 3: Convert Video into Image Sequence (30 FPS PNGs)

To enable frame-accurate scrubbing via scroll:

1. Open [ezgif.com/video-to-png](https://ezgif.com/video-to-png) (or use `ffmpeg`).
2. Upload your 1080p / 2K generated video.
3. Configure settings:

   - **FPS**: `30`
   - **Width**: `1920px` (or `1080p`)
4. Convert and download the `.zip` archive containing the sequenced PNG images (e.g., ~240 frames for an 8-second video: `ezgif-frame-001.png` to `ezgif-frame-240.png`).
5. Extract all images into the project's `./img/` folder.

> 💡 *FFmpeg Alternative Command:*
>
> ```bash
> ffmpeg -i input.mp4 -vf "fps=30,scale=1920:-1" img/ezgif-frame-%03d.png
> ```

---

### 4️⃣ Step 4: Build the Scroll Animation Engine

Use Antigravity / AI assistant to initialize the core scroll-scrubber engine on an HTML5 `<canvas>`:

> **Prompt:**
>
> ```text
> Generate smooth, scroll animation with the provided file sequence in ./img/, animation should be smooth and don't add any other components on the element. Test after build it and check it is working properly.
> ```

The engine computes scroll progress (`window.scrollY / totalScrollableHeight`), interpolates the target frame index, and paints the frame to the canvas using viewport-cover dimensions. Verify that scrolling smoothly controls the video frames before adding UI components.

---

### 5️⃣ Step 5: Find & Download a Reference Portfolio Design Template

Before coding UI sections:

1. Search Google, Dribbble, or Pinterest for keywords like:
   `"modern developer portfolio website template design"` or `"dark glassmorphism portfolio UI"`.
1. Pick a clean design with strong section structure (Hero, About, Skills, Projects, Process, Contact).
1. Download/screenshot the template image to use as your visual reference.

---

### 6️⃣ Step 6: Overlay Glassmorphic Content Sections

Upload the downloaded template image into Antigravity / AI chat and provide this prompt:

> **Prompt:**
>
> ```text
> Add this sections on the scroll animation that we have created. Use the reference image for it. Generate as it is sections, remove background visuals and put all content on the scroll animation, make sure scroll animation also works properly.
> ```

The AI will generate matching semantic HTML/CSS cards with transparent glassmorphism (`backdrop-filter: blur()`), preserving the interactive 3D background animation underneath.

---

### 7️⃣ Step 7: Tailor Content & Personal Information

To easily populate all sections with your personal bio, projects, and skills without manual boilerplate writing:

1. Send the template image or section list to your AI (ChatGPT / Claude / Gemini) with:

   > **Prompt:**
   >
   > ```text
   > This is the template layout I chose for my 3D portfolio. I want my personal information tailored to these sections. Provide a structured prompt to collect and populate my skills, projects, and contact info.
   > ```
1. Answer the AI's questions with your details, then paste the generated content back into Antigravity to update the sections.
1. Review interactions, responsive styling on mobile, and fine-tune via conversation with Antigravity!

---

## 📁 Project Structure

```text
3d-portfolio/
│
├── index.html        # Main HTML markup and semantic layout structure
├── style.css         # Cyberpunk design system, tokens, typography & animations
├── script.js        # Canvas frame loader, LERP scroll controller & nav logic
│
├── img/              # Sequence of 30FPS extracted frames
│   ├── ezgif-frame-001.png
│   ├── ezgif-frame-002.png
│   └── ...
│
└── assets/           # Project screenshots, icons, and static assets
```

---

## 🚀 Getting Started Locally

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/3d-portfolio.git
   cd 3d-portfolio
   ```
1. **Open in Browser:**

   - Use VS Code **Live Server** extension, or run a local static server:

   ```bash
   npx serve .
   ```
1. Open `http://localhost:3000` (or `http://127.0.0.1:5500`) in your browser.

---

## ⚙️ How to Customize

| Element                 | File         | Description                                                               |
| :---------------------- | :----------- | :------------------------------------------------------------------------ |
| **Total Frames**        | `script.js`  | Change `START_FRAME` and `END_FRAME` to match your image sequence count.  |
| **Frame Rate / Easing** | `script.js`  | Adjust `LERP_FACTOR` (default `0.08`) for snappier or smoother scrolling. |
| **Theme Colors**        | `style.css`  | Edit CSS variables (`--accent-primary`, `--accent-magenta`, `--bg-dark`). |
| **Content & Bio**       | `index.html` | Update personal details, projects, tech stacks, and social links.         |

---

<p align="center">
  Crafted with ❤️ and AI by <a href="https://github.com/Nugi29">Nugitha Disas</a>
</p>
