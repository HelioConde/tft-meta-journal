"use strict";
const fs=require("node:fs"),assert=require("node:assert/strict");
const files=["index.html","styles.css","app.js","config.js","favicon.svg",".nojekyll","docs/DESIGN_SYSTEM.md"];
files.forEach(f=>assert.ok(fs.existsSync(f),"Missing "+f));
const html=fs.readFileSync("index.html","utf8"),js=fs.readFileSync("app.js","utf8"),css=fs.readFileSync("styles.css","utf8");
for(const id of ["form","entries","group","search","stage","backup-file","demo","export","import"])assert.ok(html.includes('id="'+id+'"'),"Missing id "+id);
assert.ok(js.includes("localStorage")&&js.includes("textContent")&&!js.includes("innerHTML"));
assert.ok(css.includes("prefers-reduced-motion"));
console.log("PASS static checks");