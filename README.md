# n8n Automation Landing Page

Landing page gioi thieu dich vu tu dong hoa quy trinh bang n8n, duoc thiet ke theo phong cach SaaS dark UI, co bang gia, so sanh goi, loi ich, FAQ va form lien he ket noi Google Sheets.

![HTML](https://img.shields.io/badge/HTML-32%25-ff4f38?style=for-the-badge)
![CSS](https://img.shields.io/badge/CSS-59%25-6d5dfc?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-9%25-f1d34f?style=for-the-badge)
![Status](https://img.shields.io/badge/status-active-38b979?style=for-the-badge)

## Demo

- Website: [n8n-eight-pink.vercel.app](https://n8n-eight-pink.vercel.app/)

## Noi Dung Chinh

- Header phong cach n8n voi menu dieu huong va nut lien he tu van.
- Hero section nen toi, hinh anh lightning, khoi mau va vong sang chuyen dong.
- Bang gia dich vu gom Starter, Professional, Business va Enterprise.
- Bang so sanh tinh nang giua cac goi.
- Khu loi ich noi bat voi icon va card hien dai.
- FAQ dang accordion.
- CTA/form lien he co gui du lieu ve Google Sheets.
- Responsive cho desktop, tablet va mobile.

## Cong Nghe

- `HTML5` cho cau truc trang.
- `CSS3` cho giao dien, animation va responsive.
- `JavaScript` cho FAQ, scroll reveal, mobile menu, form submit va load du lieu bang gia tu Google Sheets.
- `Google Apps Script` lam API trung gian cho Google Sheets.
- `Vercel` de deploy website tu GitHub.

## Cau Truc Thu Muc

```text
n8n_pricing_landing/
|-- assets/
|   |-- hero-lightning-1600.jpg
|   `-- hero-lightning-960.jpg
|-- google-apps-script.js
|-- HUONG_DAN.md
|-- index.html
|-- script.js
|-- style.css
`-- README.md
```

## Chay Local

Mo terminal tai thu muc project va chay:

```bash
python -m http.server 4173
```

Sau do mo:

```text
http://localhost:4173
```

Neu dung Live Server trong VS Code thi co the mo truc tiep file `index.html`.

## Cap Nhat Du Lieu Bang Google Sheets

Du lieu co the quan ly qua Google Sheets theo cac tab:

- `Bang gia`: ten goi, gia, ghi chu, pho bien, nut bam, tinh nang.
- `So sanh`: danh sach tinh nang va gia tri theo tung goi.
- `Loi ich`: tieu de loi ich va mo ta ngan.
- `FAQ`: cau hoi va cau tra loi.
- `Lien he`: du lieu nguoi dung gui tu form.

Khi sua du lieu trong Google Sheets, website se lay lai noi dung thong qua `google-apps-script.js` va `script.js`.

## Quy Trinh Moi Lan Chinh Sua

1. Sua giao dien/noi dung trong cac file can thiet.
2. Kiem tra lai tren desktop va mobile.
3. Cap nhat muc **Nhat Ky Cap Nhat** ben duoi neu co thay doi dang chu y.
4. Push len GitHub:

```bash
git add .
git commit -m "Mo ta ngan gon thay doi"
git push
```

Sau khi push, Vercel se tu dong deploy ban moi neu project dang ket noi voi GitHub.

## Nhat Ky Cap Nhat

> Ghi ngan gon moi khi co thay doi lon de ca nhom de theo doi.

| Ngay | Nguoi sua | Noi dung |
| --- | --- | --- |
| 2026-06-11 | Nhom | Toi uu animation de trang load va cuon muot hon. |
| 2026-06-11 | Nhom | Toi uu hero image, responsive va phong cach n8n. |
| 2026-06-11 | Nhom | Them bang gia 4 goi va bang so sanh tinh nang. |

## Goi Y Cho Lan Nang Cap Tiep Theo

- Dong bo them `So sanh`, `Loi ich` va `FAQ` tu Google Sheets giong phan bang gia.
- Them anh chup man hinh trang web vao README.
- Them Lighthouse report de theo doi diem Performance/SEO/Accessibility.
- Toi uu them SEO: title, description, Open Graph image.
- Tao file checklist QA cho mobile truoc khi push.

## Thanh Vien

- Tran Ngoc Minh Quan
- PhuD22CNTT03
