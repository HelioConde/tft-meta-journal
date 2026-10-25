<div align="center">
  <h1>📓 TFT Meta Journal</h1>
  <p><strong>Registre os experimentos de composição que você testou no TFT e aprenda com o que mudou entre patches.</strong></p>
  <p><img alt="Status" src="https://img.shields.io/badge/status-concep%C3%A7%C3%A3o-64748b"></p>
</div>

> **Somente planejamento:** este repositório contém apenas o README, sem aplicação, API ou interface executável.

## O problema

Ao testar uma composição diferente a cada patch, é fácil esquecer **o contexto do lobby, os itens disponíveis e o motivo da escolha**. O Meta Journal propõe um diário de hipóteses e resultados, sem tratar cada colocação como evidência isolada de uma boa ou má composição.

## Experiência proposta

```text
Registrar patch e composição
            ↓
Anotar hipótese e situação
            ↓
Jogar e registrar observações
            ↓
Revisar o que funcionou
            ↓
Planejar novo experimento
```

### Dados mínimos do protótipo

| Campo | Por que existe |
| --- | --- |
| Set / patch | Contexto das mudanças |
| Composição e unidades | O que foi testado |
| Itens / augments | Condições importantes |
| Hipótese | O que se esperava da estratégia |
| Colocação e observações | Resultado e contexto |
| Próximo experimento | Aprendizado para a próxima partida |

## Primeiro MVP proposto

Uma **página mobile** com formulário de notas, lista pesquisável, filtros por patch e **armazenamento local**, com exportação JSON para evitar perda dos registros. A primeira versão não precisa de autenticação nem integração Riot.

**Critério de validação:** registrar três partidas de patches diferentes, encontrá-las pelos filtros e recuperar o histórico depois de atualizar a página.

## O que não deve ser prometido

- Nenhuma análise automática de meta ou win rate está implementada.
- Uma nota de partida não comprova relação causal.
- Atualização de patches, rankings globais e integração com a Riot seriam etapas separadas.

Projeto vinculado ao [Ideias IA Lab](https://github.com/HelioConde/ideias-ia-lab). Teamfight Tactics pertence aos respectivos titulares; este é um experimento independente.

Criado por [Hélio Conde](https://github.com/HelioConde).
