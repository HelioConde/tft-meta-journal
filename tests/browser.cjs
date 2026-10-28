"use strict";
const auditAccessibility=require("./accessibility-audit.cjs");
const {chromium}=require("playwright"),{spawn}=require("node:child_process"),fs=require("node:fs");
fs.mkdirSync("screenshots",{recursive:true});
const server=spawn("python3",["-m","http.server","8771","--bind","127.0.0.1"],{stdio:"ignore"});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 await sleep(900);
 const browser=await chromium.launch(process.env.BROWSER_CHANNEL==="chrome"?{channel:"chrome",headless:true}:{headless:true}),results=[];
 try{for(const width of [320,390,768,1366,1600]){
 const ctx=await browser.newContext({viewport:{width,height:width<500?720:850},reducedMotion:"reduce",acceptDownloads:true}),page=await ctx.newPage(),errors=[];
 page.on("pageerror",e=>errors.push(e.message));page.on("console",m=>{if(m.type()==="error")errors.push(m.text())});
 page.on("response",r=>{if(r.status()>=400&&r.url().startsWith("http://127.0.0.1:8771"))errors.push(r.status()+" "+r.url())});
 try{
 const res=await page.goto("http://127.0.0.1:8771/",{waitUntil:"load"});
 if(res.status()!==200)errors.push("HTTP "+res.status());await page.getByRole("heading",{level:1}).waitFor();
 await auditAccessibility(page,errors);
 const skip=page.locator("a.skip,a.skip-link");
 if(await skip.count()!==1)errors.push("Missing keyboard skip link");
 else{
  if(!(await skip.evaluate(el=>getComputedStyle(el).clipPath)).includes("inset"))errors.push("Skip link visible before keyboard focus");
  await skip.focus();
  if(await skip.evaluate(el=>getComputedStyle(el).clipPath)!=="none")errors.push("Focused skip link remains hidden");
  await skip.evaluate(el=>el.blur());
 }

 const entries=page.locator("#entries article"),expected=Number(await page.locator("body").getAttribute("data-demo-count"));
 if(await entries.count()!==0)errors.push("Empty state not empty");
 await page.getByRole("button",{name:"Carregar exemplos fictícios"}).click();
 if(await entries.count()!==expected)errors.push("Demo load incorrect");
 await page.reload();if(await entries.count()!==expected)errors.push("Persistence failed");
 if(await page.locator("#entries .experiment-flow").count()!==expected)errors.push("Experiment flow missing");
 if(await page.locator("#entries .experiment-step").count()!==expected*3)errors.push("Experiment pipeline must show hypothesis, observation, next test");
 const first=entries.first();await first.getByRole("button",{name:"Editar"}).click();
 const field=page.locator("#field-"+await page.locator("body").getAttribute("data-first-field"));
 const current=await field.inputValue();
 if(await field.getAttribute("type")==="text"){await field.fill(current+" QA")}else{const config=await page.evaluate(()=>window.APP_CONFIG);const textField=config.fields.find(f=>f.kind==="text");await page.locator("#field-"+textField.key).fill("Teste QA")}
 await page.getByRole("button",{name:"Atualizar registro"}).click();
 if(await entries.count()!==expected)errors.push("Edit should not add entry");
 const downloadPromise=page.waitForEvent("download");await page.getByRole("button",{name:"Exportar JSON"}).click();const download=await downloadPromise;
 if(!download.suggestedFilename().endsWith(".json"))errors.push("JSON export failed");
 await page.locator("#search").fill("código sem correspondência");
 if(await entries.count()!==0)errors.push("Search filter failed");
 await page.locator("#search").fill("");
 page.once("dialog",d=>d.accept());await entries.first().getByRole("button",{name:"Excluir"}).click();
 if(await entries.count()!==expected-1)errors.push("Delete failed");
 if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2)){
 const suspects=await page.evaluate(()=>[...document.querySelectorAll("body *")].filter(el=>{const r=el.getBoundingClientRect();return r.right>innerWidth+2&&getComputedStyle(el).position!=="fixed"}).slice(0,5).map(el=>el.tagName+"."+String(el.className||"")));
 errors.push("Overflow at "+width+": "+suspects.join(", "));
 }
 await page.screenshot({path:"screenshots/"+width+".png",fullPage:true,animations:"disabled"});
 results.push({width,ok:errors.length===0,errors});
 }catch(e){errors.push(String(e));results.push({width,ok:false,errors})}finally{await ctx.close()}
 }}finally{await browser.close();server.kill()}
 fs.writeFileSync("screenshots/qa.json",JSON.stringify(results,null,2));
 results.forEach(x=>console.log(JSON.stringify(x)));if(results.length!==5||results.some(x=>!x.ok))process.exitCode=1;
})().catch(e=>{server.kill();console.error(e);process.exitCode=1});