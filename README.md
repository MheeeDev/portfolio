# Portfolio — Sureeporn Kromthin

Automation engineering portfolio. Built with [Astro](https://astro.build), hosted on GitHub Pages.

## คำสั่งที่ใช้บ่อย

| คำสั่ง | ทำอะไร |
|---|---|
| `npm install` | ติดตั้งครั้งแรก (ครั้งเดียว) |
| `npm run dev` | เปิดเว็บในเครื่องที่ http://localhost:4321/ แก้ไฟล์แล้วเห็นผลทันที (บทความ draft ก็เห็น) |
| `npm run new-post -- uns-mqtt-ignition` | สร้างบทความใหม่จากแม่แบบ |
| `npm run new -- 2026-boiler-scada` | สร้างโปรเจคใหม่จากแม่แบบ |
| `npm run check` | ตรวจว่าทุกโปรเจคมีหัวข้อครบและรูปมีจริง |
| `npm run build` | ตรวจ + สร้างเว็บจริงลง `dist/` |
| `npm run pdf` | สร้าง `portfolio.pdf` รวมทุกโปรเจค (ใช้ Microsoft Edge ในเครื่อง) |

## เขียนบทความใหม่

1. `npm run new-post -- <ชื่อสั้นภาษาอังกฤษ>` → ได้ `src/content/posts/<ชื่อ>/index.mdx` (ชื่อนี้จะเป็น URL: `/blog/<ชื่อ>/`)
2. กรอกหัวไฟล์: `title`, `summary`, `date`, `category` (plc · scada · ot-it · ai-tools · career), `tags`, `lang` (th/en)
3. มีคลิปหลัก ใส่ `youtube: <รหัส 11 ตัวจากลิงก์ YouTube>` คลิปจะขึ้นบนหัวบทความและในหน้า `/videos/`
   คลิปเสริมกลางบทความ พิมพ์ `<YouTube id="..." title="..." />` ได้เลย ไม่ต้อง import
4. รูปวางในโฟลเดอร์เดียวกับบทความ แล้วใส่ `![อธิบายรูป](./screen-01.webp)`
5. `npm run dev` ดูผล แล้วเปลี่ยน `draft: true` เป็น `draft: false` เมื่อพร้อมเผยแพร่ บทความจะขึ้นหน้า Blog, หน้าแรก, RSS และ sitemap เอง

ตัวอย่างอยู่ที่ `src/content/posts/example-post/` (เป็น draft ลบได้เมื่อมีบทความจริง)

## เพิ่มโปรเจคใหม่

1. `npm run new -- <ปี>-<ชื่อสั้น>` → ได้โฟลเดอร์ `src/content/projects/<ชื่อ>/`
2. ใส่รูปที่**ปิดชื่อลูกค้าแล้ว**ในโฟลเดอร์เดียวกัน (`cover.webp`, `screen-01.webp`, …) — ดู checklist ใน `private/projects-inventory.md`
3. แก้ `index.md`: กรอกข้อมูลด้านบน (frontmatter) ให้ครบ และเขียน 6 หัวข้อตามลำดับ
   **Problem → My role & scope → Approach → Delivery → Result → Skills used**
4. เปลี่ยน `draft: true` เป็น `draft: false` แล้ว `npm run dev` ดูผล
5. `git add . && git commit -m "Add <project>" && git push` → เว็บอัปเดตเองในไม่กี่นาที

โปรเจคแบ่งเป็น 2 กลุ่มด้วย field `track` — `industry` (งานส่งมอบให้โรงงาน) และ `education` (งาน part-time กับอาจารย์: ชุดฝึก, digital twin, คอร์ส, cloud lab) หน้า Home / Projects / Print จะแยกหัวข้อให้เอง ถ้าไม่ใส่จะถือเป็น `industry`

ถ้ากรอก field ไม่ครบ หรือขาดหัวข้อ `npm run build` จะแจ้ง error ว่าขาดอะไร — นี่คือสิ่งที่ทำให้ทุกหน้าเป็น pattern เดียวกัน

## โครงสร้าง

```
src/content/projects/<project>/index.md   เนื้อหาแต่ละโปรเจค + รูป
src/content.config.ts                     รายการ field ที่บังคับ
src/site.ts                               ชื่อ อีเมล ลิงก์ ไฟล์ CV
src/content/posts/<slug>/index.mdx         บทความ + รูป
src/components/YouTube.astro              ตัวเล่นคลิป (โหลดจาก youtube-nocookie.com เมื่อกดเล่น)
src/pages/                                หน้า Home, Blog, Videos, Projects, About, Contact, Print, rss.xml
templates/project/, templates/post/        แม่แบบโปรเจคและบทความใหม่
private/                                  โน้ตส่วนตัว (ไม่ขึ้น git)
public/cv/                                ไฟล์ CV PDF (ตั้งชื่อใน src/site.ts)
```

## Deploy ครั้งแรก

1. สร้าง repo `portfolio` บน GitHub แล้ว push branch `main`
2. GitHub → Settings → Pages → Source: **GitHub Actions**
3. Settings → Pages → Custom domain: `iamautomationeng.com` (ไม่ต้องมีไฟล์ CNAME เพราะ deploy ด้วย Actions)
4. Cloudflare → DNS เพิ่ม A record `@` → 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   และ CNAME `www` → `mheeedev.github.io` ทุกรายการตั้งเป็น **DNS only** (เมฆสีเทา)
5. รอ DNS แล้วติ๊ก **Enforce HTTPS**

`astro.config.mjs` ตั้งไว้ที่ `https://iamautomationeng.com` และ base `/` แล้ว
ถ้าจะเปิดดูที่ `https://mheeedev.github.io/portfolio/` ก่อน ให้ build ด้วย `SITE_URL=https://mheeedev.github.io BASE_PATH=/portfolio`
