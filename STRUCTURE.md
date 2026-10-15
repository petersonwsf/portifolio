# STRUCTURE.md — frontend

Site público do portfólio (React + Vite, CSS Modules + Bootstrap).

- `src/App.jsx` — composição das seções da página.
- `src/main.jsx` — ponto de entrada.
- `src/index.css` — variáveis globais e estilos base das seções.
- `src/hooks/` — hooks reutilizáveis.
  - `useDigitacao.js` — efeito de digitação que alterna frases.
  - `useContagem.js` — anima um número de 0 até o valor alvo.
  - `useRodizio.js` — exibe N itens de uma lista e troca um a cada intervalo.
  - `useConteudo.js` — acessa projetos, experiências e habilidades vindos do backend.
  - `useGithub.js` — busca dados públicos do GitHub (com fallback silencioso).
- `src/components/layout/` — `Cabecalho` (menu fixo), `Container`.
- `src/components/sections/` — seções da página (`Heroi`, `Experiences`, `Skills`, `Projects`, `Contacts`).
- `src/components/Carrossel/` — `Carrossel` (um slide por vez) e `CarrosselFaixa` (faixa com vários itens).
- `src/components/Card/`, `src/components/Modal/` — cartões e modal de projeto.
- `src/services/conteudo.js` — busca no backend (`VITE_API_URL`) os projetos, experiências e habilidades exibidos no site.
- `src/contexts/` — `ContextoConteudo.jsx` (provedor que carrega o conteúdo uma vez) e `conteudoContexto.js` (contexto); acesso via hook `useConteudo`.
- `src/services/contato.js` — envio do formulário de contato (simulado; falta integrar ao backend).
- `src/components/Form/` — `FormularioContato`.
- `src/assets/img/` — imagens.
