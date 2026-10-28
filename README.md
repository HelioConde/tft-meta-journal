# TFT Meta Journal

Teste composições, anote hipóteses e contexto do lobby e compare experimentos do mesmo patch. Sem ranking global ou dados automáticos da Riot.

## MVP funcional
- Criar, editar, excluir e pesquisar registros manuais.
- Filtrar por grupo (patch) e estado de revisão; visualizar resumos locais.
- Backup JSON com importação validada, versão e limite de 200 registros; exemplos **fictícios** opcionais.
- Persistência em LocalStorage, sem servidor, autenticação, API Riot/Blizzard nem banco de dados.
- Layout responsivo, teclado, foco visível e movimento reduzido.

## Executar
```bash
python -m http.server 8000
```
Abrir `http://localhost:8000`.

## GitHub Pages
Publicação estática a partir de `gh-pages/(root)`, com apenas `index.html`, `config.js`, `app.js`, `styles.css`, `favicon.svg` e `.nojekyll`. Se Pages ainda não estiver habilitado, ativar em Settings → Pages → Deploy from a branch → gh-pages / (root). A fonte de publicação não executa serviços externos.

## Qualidade e histórico
`docs/DESIGN_SYSTEM.md` contém os padrões Taste/Web Design Guidelines/Awesome Design. Workflow Playwright avalia 320, 390, 768, 1366 e 1600 px, capturando páginas e conferindo formulário, persistência, filtros, backup e fluxo de exclusão.

O README de concepção original está preservado na branch `archive/readme-only-20261027`.

Projeto independente e não afiliado aos donos de League of Legends, TFT ou Overwatch.
