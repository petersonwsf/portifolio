# STRUCTURE.md — frontend

Site público do portfólio (React + Vite, CSS Modules + Bootstrap).

- `src/App.jsx` — composição das seções da página.
- `src/main.jsx` — ponto de entrada.
- `src/index.css` — variáveis globais e estilos base das seções.
- `src/hooks/` — hooks reutilizáveis.
  - `useDigitacao.js` — efeito de digitação que alterna frases.
  - `useContagem.js` — anima um número de 0 até o valor alvo.
  - `useCarrossel.js` — carrossel de N itens que gira em intervalo fixo e renova os itens do fundo.
  - `useGithub.js` — busca dados públicos do GitHub (com fallback silencioso).
- `src/components/layout/` — `Cabecalho` (menu fixo), `Container`.
- `src/components/sections/` — seções da página (`Heroi`, `Experiences`, `Skills`, `Projects`, `AboutMe`, `Contacts`).
- `src/components/Card/`, `src/components/Modal/` — cartões e modal de projeto.
- `src/assets/consts/` — dados estáticos (projetos, habilidades, experiências).
- `src/assets/img/` — imagens.
