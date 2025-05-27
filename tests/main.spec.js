import { expect, test } from "@playwright/test";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let page;

test.beforeAll(async ({ browser }) => {
  const htmlPath = path.resolve(__dirname, "../index.html");
  const htmlContent = fs.readFileSync(htmlPath, "utf-8");

  const cssPath = path.resolve(__dirname, "../style.css");
  const cssContent = fs.readFileSync(cssPath, "utf-8");

  const fullHtml = `
      <html>
        <head>
          <style>${cssContent}</style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `;

  page = await browser.newPage();
  await page.setContent(fullHtml, { waitUntil: "domcontentloaded" });
});

test("#header genişliği doğru olmalı", async () => {
  const headerWidth = await page.locator("#header").evaluate((el) =>
    el.offsetWidth
  );
  expect(headerWidth).toBe(750);
});

test("#header yatay hizalaması doğru olmalı", async () => {
  const display = await page.locator("#header").evaluate((el) =>
    getComputedStyle(el).display
  );
  expect(display).toBe("flex");
});

test("#header başlığı ve menü iki yana yaslı olmalı", async () => {
  const justifyContent = await page.locator("#header").evaluate((el) =>
    getComputedStyle(el).justifyContent
  );
  expect(justifyContent).toBe("space-between");
});

test("#header içeriği dikey olarak ortalanmalı", async () => {
  const alignItems = await page.locator("#header").evaluate((el) =>
    getComputedStyle(el).alignItems
  );
  expect(alignItems).toBe("center");
});

test("#menu esnek bir düzen kullanmalı", async () => {
  const display = await page.locator("#menu").evaluate((el) =>
    getComputedStyle(el).display
  );
  expect(display).toBe("flex");
});

test("#menu bir NAV tagi olmalı", async () => {
  const tagName = await page.locator("#menu").evaluate((el) => el.tagName);
  expect(tagName).toBe("NAV");
});

test("#menu linklerinin arka plan rengi doğru olmalı", async () => {
  const menuLinks = await page.locator("#menu a");
  const count = await menuLinks.count();

  if (count > 0) {
    const ilkLink = await menuLinks.nth(0);
    const backgroundColor = await ilkLink.evaluate((el) =>
      getComputedStyle(el).backgroundColor
    );
    expect(backgroundColor).toBe("rgb(119, 119, 119)");
  } else {
    console.warn("Uyarı: #menu a seçicisine eşleşen öğe bulunamadı.");
  }
});

test("#menu linklerinin arka plan rengi üzerine gelindiğinde değişmeli", async () => {
  const menuLinks = await page.locator("#menu a");
  const count = await menuLinks.count();

  if (count > 0) {
    const ilkLink = await menuLinks.nth(0);
    await ilkLink.hover();
    const backgroundColor = await ilkLink.evaluate((el) =>
      getComputedStyle(el).backgroundColor
    );
    expect(backgroundColor).toBe("rgb(0, 0, 0)");
  } else {
    console.warn("Uyarı: #menu a seçicisine eşleşen öğe bulunamadı.");
  }
});

test("#menu bağlantılarının iç boşluğu doğru olmalı", async () => {
  const menuLinks = await page.locator("#menu a");
  const count = await menuLinks.count();

  if (count > 0) {
    const ilkLink = await menuLinks.nth(0);
    await ilkLink.hover();
    const padding = await ilkLink.evaluate((el) =>
      getComputedStyle(el).padding
    );
    expect(padding).toBe("20px");
  } else {
    console.warn("Uyarı: #menu a seçicisine eşleşen öğe bulunamadı.");
  }
});

test("#hero display özelliği doğru olmalı", async () => {
  const display = await page.locator("#hero").evaluate((el) =>
    getComputedStyle(el).display
  );
  expect(display).toBe("flex");
});

test("#hero içeriği dikey olarak sıralı olmalı", async () => {
  const flexDirection = await page.locator("#hero").evaluate((el) =>
    getComputedStyle(el).flexDirection
  );
  expect(flexDirection).toBe("column");
});

test("#hero içeriği yatay ve dikey olarak ortalanmalı", async () => {
  const justifyContent = await page.locator("#hero").evaluate((el) =>
    getComputedStyle(el).justifyContent
  );
  expect(justifyContent).toBe("center");
});

test("#hero içeriği dikey olarak ortalanmalı", async () => {
  const alignItems = await page.locator("#hero").evaluate((el) =>
    getComputedStyle(el).alignItems
  );
  expect(alignItems).toBe("center");
});

test("#gallery genişliği doğru olmalı", async () => {
  const galleryWidth = await page.locator("#gallery").evaluate((el) =>
    el.offsetWidth
  );
  expect(galleryWidth).toBe(750);
});

test("#gallery display değeri doğru olmalı", async () => {
  const display = await page.locator("#gallery").evaluate((el) =>
    getComputedStyle(el).display
  );
  expect(display).toBe("flex");
});

test("#gallery ögeleri arasında eşit mesafe olmalı", async () => {
  const justifyContent = await page.locator("#gallery").evaluate((el) =>
    getComputedStyle(el).justifyContent
  );
  expect(justifyContent).toBe("space-between");
});

test("#footer butonu doğru metni içermeli", async () => {
  const text = await page.locator("#footer button").textContent();
  expect(text).toBe("Başa dön");
});
