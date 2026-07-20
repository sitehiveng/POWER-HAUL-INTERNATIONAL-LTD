# Power Haul International Ltd — Website

## How to use this
1. Unzip everything into one folder — keep the folder structure exactly as-is (css/, js/, assets/).
2. Upload the whole folder to GitHub (or any static host). If using GitHub Pages: push to a repo, then turn on Pages in repo Settings → Pages, root folder.
3. Open index.html locally to preview, or visit your GitHub Pages URL once deployed.

Note: the header/footer/menu are now written directly into every page (no separate files to move into folders) — this is deliberately simple so nothing can end up in the wrong place. If you ever need to change something in the nav or footer (like a phone number), you'll need to update it in each HTML file — search-and-replace across all files works well for this.

## Product photos
The 5 products on products.html and the homepage now use real photos and prices, cropped from your WhatsApp catalog screenshots (assets/images/products/). These are small thumbnails (~160x160px), so they'll look a little soft when enlarged — swap in the original higher-resolution photos from your phone/camera roll when you have them, using the same filenames in assets/images/products/ so nothing else needs to change.

## What still needs your input (search for these in the files)
- **Other photos**: every gray box labeled "PHOTO" / "logo" / "MAP EMBED" (hero, gallery, brands, about, industries) is still a placeholder. Drop real images into assets/images/ and swap the `<div class="card-media">...</div>` blocks for `<img src="assets/images/yourfile.jpg" alt="...">`.
- **More products**: only 5 items were in the catalog screenshots you sent. Add more product cards to products.html (copy an existing `.card` block) as your catalog grows.
- **Text in [brackets]**: mission, vision, founding story, leadership bios, real testimonials, legal text, job listings.
- **Contact details**: physical address, email address, and Google Maps embed code (components/footer.html, contact.html, index.html).
- **Social links**: the footer now has real Facebook/Instagram/TikTok/WhatsApp icons (not text letters). The URLs are best guesses from the handles you gave — open each on the live site and confirm they go to the right page. Since header/footer are now inline in every page, you'll need to fix the link in each HTML file if one's wrong (search for the wrong URL across all files and replace it).
- **WhatsApp number**: currently set to 2348038144331 in js/script.js (`WHATSAPP_NUMBER`) — used for the floating button and every form. It's also hardcoded a few places in the footer/nav of each page (WhatsApp icon, "WhatsApp Us" links) — if it's ever wrong, search-and-replace it across all files.
- **Legal pages**: privacy.html and terms.html are placeholder text only — have a lawyer review before publishing.

## How the forms work
There's no backend. Every form (Quote, Contact, Product Enquiry, Careers) packages what the visitor typed into a pre-filled WhatsApp message and opens wa.me with it — the visitor just hits send in WhatsApp. No server, database, or email service required.

## Product pages
product-details.html is a single template. Duplicate it per engine (e.g. product-perkins-1104d.html) and link to it from products.html's "View Details" buttons.

## Search box
The nav search bar currently sends the query to products.html?q=... as a starting point — wire up actual filtering in js/script.js once your full product list/catalog exists in code (currently products are hardcoded HTML, not data-driven).
