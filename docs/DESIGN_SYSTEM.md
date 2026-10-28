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

## Fluxo científico da ficha
Cada experimento apresenta três etapas visuais: `01 Hipótese inicial`, `02 Observações do lobby` e `03 Próximo teste`. Dados manuais e inseridos via `textContent`. Fichas não prometem causalidade nem métricas oficiais. Playwright verifica a sequência por registro.

## Auditoria de capturas reais Playwright (28/10/2026)
Leitura da capa do caderno corrigida: camada de papel quase opaca protege o título e parágrafos contra as pautas decorativas. Cabeçalho compacto no mobile e link `Pular para o conteúdo` totalmente recortado fora de foco, revelado ao navegar por teclado. Incluído QA de foco do atalho e mantidos testes das fichas de experimentos.

## Accessibility QA (28/10/2026)
Playwright verifica navegação Tab/Shift+Tab, skip link com foco no main, contraste de texto e placeholders nos campos (4,5:1), rótulos e tamanho mínimo de 44px. Estilo independente em `a11y.css`, mantém o papel pautado e a camada de leitura. Não equivale a certificação integral de WCAG.
