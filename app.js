"use strict";
(()=>{
const C=window.APP_CONFIG,KEY=C.repo+"-local-v1",LIMIT=200,fields=C.fields,byId=id=>document.getElementById(id);
const e={form:byId("form"),list:byId("entries"),empty:byId("empty"),groups:byId("group"),search:byId("search"),stage:byId("stage"),message:byId("feedback")};
let rows=[],editId=null;
const node=(tag,cls,value)=>{const x=document.createElement(tag);if(cls)x.className=cls;if(value!==undefined)x.textContent=String(value);return x};
function announce(s){e.message.textContent=s;}
function validate(r){
 if(!r||typeof r!=="object"||typeof r.id!=="string"||!r.id||r.id.length>100||typeof r.updatedAt!=="string"||!Number.isFinite(Date.parse(r.updatedAt)))return false;
 return fields.every(f=>{
  const v=r[f.key];if(f.kind==="number")return Number.isInteger(v)&&v>=f.min&&v<=f.max;
  if(typeof v!=="string"||v.length>(f.max||110))return false;
  if(f.required&&!v.trim())return false;
  if(f.kind==="select"&&!f.options.includes(v))return false;
  if(f.kind==="date"&&!/^\d{4}-\d{2}-\d{2}$/.test(v))return false;
  return true;
 });
}
function load(){try{
 const raw=localStorage.getItem(KEY);if(!raw)return [];
 const data=JSON.parse(raw);
 if(data.version!==1||data.product!==C.repo||!Array.isArray(data.entries)||data.entries.length>LIMIT||!data.entries.every(validate)||new Set(data.entries.map(r=>r.id)).size!==data.entries.length)throw Error("Dados incompatíveis");
 return data.entries;
}catch{announce("O histórico local não pôde ser lido. Importe um backup válido para recuperar.");return [];}}
function persist(){try{localStorage.setItem(KEY,JSON.stringify({version:1,product:C.repo,entries:rows}));return true;}
catch{announce("Não foi possível salvar no armazenamento local. Exporte um backup.");return false;}}
function populateForm(){
 for(const f of fields){const wrap=node("div","field"),label=node("label","",f.label);
 label.htmlFor="field-"+f.key;let input;
 if(f.kind==="textarea"){input=node("textarea");input.rows=3;input.maxLength=f.max;}
 else if(f.kind==="select"){input=node("select");for(const val of f.options){let o=node("option","",val);o.value=val;input.append(o);}}
 else {input=node("input");input.type=f.kind;if(f.max)input.maxLength=f.max;if(f.kind==="number"){input.min=f.min;input.max=f.max;input.step="1";input.value=String(f.min);}if(f.kind==="date")input.value=new Date().toISOString().slice(0,10);}
 input.id=label.htmlFor;input.name=f.key;input.required=!!f.required;if(f.placeholder)input.placeholder=f.placeholder;
 wrap.append(label,input);e.form.insertBefore(wrap,byId("form-buttons"));
 }
}
function formRecord(){const data={id:editId||crypto.randomUUID(),updatedAt:new Date().toISOString()};
 for(const f of fields){const v=byId("field-"+f.key).value;data[f.key]=f.kind==="number"?Number(v):v.trim();}
 return data;}
function reset(){editId=null;e.form.reset();byId("save").textContent="Salvar registro";byId("cancel").hidden=true;for(const f of fields){if(f.kind==="date")byId("field-"+f.key).value=new Date().toISOString().slice(0,10);}}
function card(r){
 const article=node("article","record");
 const head=node("div","record-head");head.append(node("h3","",r[C.titleField]),node("span","state",r.status));article.append(head);
 const meta=node("dl","record-meta");
 for(const f of fields.filter(f=>f.key!==C.titleField&&f.kind!=="textarea")){
  const div=node("div","meta-item");div.append(node("dt","",f.label),node("dd","",r[f.key]));meta.append(div);
 }article.append(meta);
 const sequence=node("div","experiment-flow");
 for(const [i,key,title] of [[1,"hypothesis","Hipótese inicial"],[2,"observation","Observações do lobby"],[3,"next","Próximo teste"]]){
  const part=node("section","experiment-step");part.dataset.step=String(i);
  const label=node("div","experiment-step-title");label.append(node("span","experiment-number",String(i).padStart(2,"0")),node("strong","",title));
  part.append(label,node("p","",r[key]));sequence.append(part);
 }
 article.append(sequence);
 const controls=node("div","record-buttons");
 for(const [action,label] of [["edit","Editar"],["delete","Excluir"]]){
  const b=node("button",action==="delete"?"warn":"",label);b.type="button";b.dataset.action=action;b.dataset.id=r.id;controls.append(b);
 }
 article.append(controls);return article;
}
function insights(){
 const groups=[...new Set(rows.map(r=>r[C.groupBy]))].sort((a,b)=>a.localeCompare(b,"pt-BR")),select=e.groups,old=select.value;
 select.replaceChildren();const all=node("option","","Todos os grupos");all.value="";select.append(all);
 for(const group of groups){const option=node("option","",group);option.value=group;select.append(option);}
 select.value=groups.includes(old)?old:"";
 const insightsEl=byId("insights");insightsEl.replaceChildren();
 for(const group of groups){
  const rs=rows.filter(r=>r[C.groupBy]===group),box=node("article","insight");
  box.append(node("strong","",group),node("p","",rs.length+" registro"+(rs.length===1?"":"s")));
  if(C.repo==="lol-role-mastery"){
   box.append(node("small","", "Autoavaliação média: "+(rs.reduce((a,b)=>a+b.rating,0)/rs.length).toFixed(1).replace(".",",")+" / 5 (manual)"));
  }else if(C.repo==="ow-improvement-roadmap"){
   box.append(node("small","",rs.filter(r=>r.status==="Concluído").length+" tarefa(s) concluída(s) no seu plano"));
  }else{
   box.append(node("small","", "Média de colocação do tabuleiro: "+(rs.reduce((a,b)=>a+b.placement,0)/rs.length).toFixed(1).replace(".",",")+" (amostra manual)"));
  }
  insightsEl.append(box);
 }
 if(!groups.length)insightsEl.append(node("p","muted","Crie ou importe registros para visualizar grupos."));
 byId("stat-groups").textContent=groups.length;
}
function render(){
 insights();const query=e.search.value.trim().toLocaleLowerCase("pt-BR"),group=e.groups.value,stage=e.stage.value;
 const filtered=[...rows].sort((a,b)=>b.updatedAt.localeCompare(a.updatedAt)).filter(r=>
  (!group||r[C.groupBy]===group)&&(!stage||r.status===stage)&&(!query||fields.some(f=>String(r[f.key]||"").toLocaleLowerCase("pt-BR").includes(query)))
 );
 e.list.replaceChildren(...filtered.map(card));e.empty.hidden=rows.length>0;
 if(rows.length&&!filtered.length)e.list.append(node("p","muted","Nenhum registro encontrado com estes filtros."));
 byId("stat-total").textContent=rows.length;
 byId("stat-reviewed").textContent=rows.filter(r=>r.status===C.states.at(-1)).length;
 byId("count").textContent=filtered.length+(filtered.length===1?" registro exibido":" registros exibidos");
}
populateForm();
for(const status of C.states){const option=node("option","",status);option.value=status;e.stage.append(option);}
rows=load();reset();render();
e.form.addEventListener("submit",event=>{
 event.preventDefault();if(!e.form.reportValidity())return;
 const r=formRecord();if(!validate(r)){announce("Há campos inválidos. Confira os limites e as opções.");return;}
 const pos=rows.findIndex(x=>x.id===editId);
 if(pos>=0)rows[pos]=r;else{if(rows.length>=LIMIT){announce("Limite de 200 registros alcançado.");return;}rows.push(r);}
 persist();reset();render();announce("Registro salvo localmente.");
 byId("registros").scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});
});
byId("cancel").addEventListener("click",()=>{reset();announce("Edição cancelada.");});
e.list.addEventListener("click",event=>{
 const button=event.target.closest("button[data-action]");if(!button)return;
 const index=rows.findIndex(r=>r.id===button.dataset.id);if(index<0)return;
 const current=rows[index];
 if(button.dataset.action==="edit"){
  editId=current.id;for(const f of fields)byId("field-"+f.key).value=current[f.key];
  byId("save").textContent="Atualizar registro";byId("cancel").hidden=false;
  byId("novo").scrollIntoView({behavior:"instant"});byId("field-"+fields[0].key).focus({preventScroll:true});
 }else if(button.dataset.action==="delete"&&confirm("Excluir este registro do histórico local?")){
  rows.splice(index,1);if(editId===current.id)reset();persist();render();announce("Registro excluído.");
 }
});
for(const control of [e.groups,e.stage])control.addEventListener("change",render);
e.search.addEventListener("input",render);
byId("demo").addEventListener("click",()=>{
 if(rows.length&&!confirm("Substituir seus registros pelos exemplos fictícios?"))return;
 rows=C.demo.map((d,i)=>({...d,id:"demo-"+C.repo+"-"+i,updatedAt:new Date().toISOString()}));
 e.search.value="";e.stage.value="";e.groups.value="";reset();persist();render();announce("Exemplos fictícios carregados.");
});
byId("export").addEventListener("click",()=>{
 const blob=new Blob([JSON.stringify({product:C.repo,version:1,entries:rows},null,2)],{type:"application/json"});
 const u=URL.createObjectURL(blob),a=node("a");a.href=u;a.download=C.repo+"-backup.json";a.style.display="none";document.body.append(a);a.click();a.remove();
 setTimeout(()=>URL.revokeObjectURL(u),1500);announce("Backup JSON gerado. Guarde o arquivo em local seguro.");
});
byId("import").addEventListener("click",()=>byId("backup-file").click());
byId("backup-file").addEventListener("change",async event=>{
 const file=event.target.files?.[0];event.target.value="";if(!file)return;
 if(file.size>1048576){announce("Arquivo acima de 1 MB. Importação cancelada.");return;}
 try{
  const data=JSON.parse(await file.text());
  if(data.version!==1||data.product!==C.repo||!Array.isArray(data.entries)||data.entries.length>LIMIT||!data.entries.every(validate)||new Set(data.entries.map(x=>x.id)).size!==data.entries.length)throw Error("invalid");
  if(rows.length&&!confirm("Substituir TODOS os registros locais pelo conteúdo do backup?"))return;
  rows=data.entries.map(r=>({...r}));e.search.value="";e.groups.value="";e.stage.value="";reset();persist();render();announce("Backup importado.");
 }catch{announce("Arquivo inválido para este projeto. Dados anteriores preservados.");}
});
})();
