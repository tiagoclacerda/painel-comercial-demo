# Painel Comercial — Demonstração

Dashboard responsivo para análise comercial, com indicadores de faturamento,
atingimento de metas, desconto comercial, ranking de agências, top clientes/setores
e retenção de base (NRR).

> ⚠ Aviso de confidencialidade:
> Todos os dados deste repositório (`data/sample-data.json`) são fictícios e
> sintéticos. Nenhuma informação comercial, financeira, cadastral ou estratégica
> real está incluída neste projeto.

## Estrutura

```
index.html      → página principal
css/styles.css  → estilos
js/app.js       → lógica dos gráficos (Chart.js)
data/sample-data.json → dados de demonstração
assets/logo.png → marca
```

## Execução local

Abra `index.html` diretamente no navegador, ou publique via GitHub Pages.

## Uso com dados reais

Para uso com dados reais, mantenha o arquivo de dados fora do controle de versão
(veja `.gitignore`) e substitua apenas localmente o conteúdo de
`data/sample-data.json` por uma cópia não versionada.
