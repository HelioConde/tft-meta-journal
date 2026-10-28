# DESIGN_SYSTEM — TFT Meta Journal

## Produto
Teste composições, anote hipóteses e contexto do lobby e compare experimentos do mesmo patch. Sem ranking global ou dados automáticos da Riot.

## Taste Skill — tokens
CSS `styles.css`: fundo `#19152c`, primária `#d7b4fc`, secundária `#9fe8c8`, tipografia do sistema, foco amarelo de alto contraste, espaçamentos de 4–64 px e raios 10/18/30 px.

## Web Design Guidelines
- Navegação com skip link, formulário rotulado e botões semânticos, resultados em `aria-live`.
- Teclado e foco visível; alvos móveis com altura de pelo menos 44px; layout a partir de 320px.
- Respeito a `prefers-reduced-motion`; excluir/importar backup substitutivo exige confirmação.
- Texto de usuário sempre inserido via `textContent`, nunca HTML não confiável.

## Awesome Design / Image-to-Code
O repositório original era apenas um README, portanto esta identidade visual foi criada de forma própria (ilustração CSS, emblema SVG), sem alegar que havia imagens/capturas convertidas. UI com cartões e resumos acessíveis.

## Dados e segurança
Armazenamento local `tft-meta-journal-local-v1`, schema `{version:1,product,entries}`, até 200 registros e importação JSON até 1 MiB. Validação de ID, data, strings, opções e inteiros. Sem API, chaves, sync, banco, login ou cookies de rastreamento. Backup deve ser guardado pelo usuário. Progresso é autodeclarado e dados fictícios só entram por escolha explícita.

## Revisão interpretativa
Colocação pertence ao tabuleiro e a médias de amostra manual; diferenças de patch, Set e lobby são contexto obrigatório. Não interpretar correlação como causa.

## QA
Workflow GitHub Actions executa validação estática e Playwright 5 resoluções com capturas, teste de criação, edição, persistência LocalStorage, exportação, busca, filtros, exclusão e overflow. A publicação usa apenas assets estáticos em `gh-pages/(root)`.

## Experiência exclusiva — caderno de laboratório
Visual de caderno de pesquisa: folhas pautadas, identificação de experimento, tipografia serifada e fichas de hipóteses. Layout intencionalmente diferente do quadro Kanban, álbum colecionável e planilha financeira.
