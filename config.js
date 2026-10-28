window.APP_CONFIG={
  "repo": "tft-meta-journal",
  "title": "TFT Meta Journal",
  "fields": [
    {
      "key": "set",
      "label": "Set",
      "kind": "text",
      "max": 45,
      "required": true,
      "placeholder": "Ex.: Set de estudo"
    },
    {
      "key": "patch",
      "label": "Patch",
      "kind": "text",
      "max": 25,
      "required": true,
      "placeholder": "Ex.: demo.1"
    },
    {
      "key": "composition",
      "label": "Composição ou unidades",
      "kind": "text",
      "max": 95,
      "required": true,
      "placeholder": "Ex.: composição de teste"
    },
    {
      "key": "items",
      "label": "Itens e aprimoramentos",
      "kind": "text",
      "max": 160,
      "required": false,
      "placeholder": "Itens, augments e variações"
    },
    {
      "key": "hypothesis",
      "label": "Hipótese antes da partida",
      "kind": "textarea",
      "max": 500,
      "required": true,
      "placeholder": "O que você queria testar?"
    },
    {
      "key": "placement",
      "label": "Colocação final (1–8)",
      "kind": "number",
      "min": 1,
      "max": 8,
      "required": true
    },
    {
      "key": "observation",
      "label": "Lobby e observações",
      "kind": "textarea",
      "max": 500,
      "required": true,
      "placeholder": "Quais condições podem ter afetado o resultado?"
    },
    {
      "key": "next",
      "label": "Próximo experimento",
      "kind": "textarea",
      "max": 350,
      "required": true,
      "placeholder": "Que mudança você tentaria?"
    },
    {
      "key": "date",
      "label": "Data da partida",
      "kind": "date",
      "required": true
    },
    {
      "key": "status",
      "label": "Fase da revisão",
      "kind": "select",
      "options": [
        "Hipótese",
        "Testado",
        "Revisado"
      ],
      "required": true
    }
  ],
  "titleField": "composition",
  "groupBy": "patch",
  "states": [
    "Hipótese",
    "Testado",
    "Revisado"
  ],
  "demo": [
    {
      "set": "Demonstração",
      "patch": "demo.1",
      "composition": "Composição A",
      "items": "Itens fictícios",
      "hypothesis": "Testar estabilização no estágio 3.",
      "placement": 4,
      "observation": "Exemplo fictício: lobby competitivo.",
      "next": "Comparar com a mesma economia.",
      "date": "2026-10-27",
      "status": "Testado"
    },
    {
      "set": "Demonstração",
      "patch": "demo.2",
      "composition": "Composição B",
      "items": "Itens demonstrativos",
      "hypothesis": "Experimentar outra curva de nível.",
      "placement": 2,
      "observation": "Exemplo fictício: amostra pequena, sem conclusão causal.",
      "next": "Repetir mais partidas do mesmo patch.",
      "date": "2026-10-27",
      "status": "Revisado"
    },
    {
      "set": "Demonstração",
      "patch": "demo.1",
      "composition": "Composição C",
      "items": "",
      "hypothesis": "Comparar dois caminhos.",
      "placement": 6,
      "observation": "Exemplo fictício: o resultado é do tabuleiro inteiro.",
      "next": "Anotar decisões-chave.",
      "date": "2026-10-27",
      "status": "Hipótese"
    }
  ]
};
