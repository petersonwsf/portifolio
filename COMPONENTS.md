# COMPONENTS.md — frontend

## Layout
- **Cabecalho** (`layout/Cabecalho.jsx`) — header fixo com efeito de vidro ao rolar, barra de progresso de leitura, destaque da seção ativa e menu hambúrguer no mobile. Sem props.
- **SecaoEscura** (`layout/SecaoEscura.jsx`) — seção de fundo escuro com grade sutil e cabeçalho padrão (etiqueta + título). Props: `id`, `etiqueta`, `titulo`, `children`.
- **Container** (`layout/Container.jsx`) — wrapper do `<main>`. Props: `children`.

## Seções
- **Heroi** (`sections/Heroi.jsx`) — hero interativa: saudação por horário, papéis digitados, foto com 8 logos de tecnologias orbitando (um é trocado a cada 2,5s), selos de hora de Brasília e dados do GitHub, contadores animados. Sem props.
- **Experiences** (`sections/Experiences.jsx`) — experiências em `Carrossel` com `CardExperience`, fundo escuro com grade igual à hero (sem brilho do mouse) e sombras azuis.
- **AboutMe**, **Contacts** — seções da página.

## Cartões / Modal
- **Carrossel** (`Carrossel/Carrossel.jsx`) — carrossel genérico com snap, setas, indicadores, toque e teclado. Props: `children` (cada filho é um slide), `rotulo`, `circular` (setas dão a volta).
- **CardExperience** (`Card/CardExperience.jsx`) — cartão de experiência: logo, empresa, cargo, período ("atual" se sem `endDate`), descrição e tecnologias como chips. Props: `experience`.
**CardProject**, **CardContact** — apresentação de itens das seções.

- **Skills** (`sections/Skills.jsx`) — habilidades agrupadas por classificação (Frontend, Backend, DevOps, Dados, Outros) via campo `categoria` de `assets/consts/skills.js`.
- **CardCategoriaHabilidades** (`Card/CardCategoriaHabilidades.jsx`) — cartão de uma classificação com lista de habilidades. Props: `titulo`, `icone`, `habilidades`.
- **CardSkill** (`Card/CardSkill.jsx`) — item da lista: ícone + rótulo. Props: `skill`.
- **Projects** (`sections/Projects.jsx`) — projetos em `Carrossel` circular (setas e indicadores) com `CardProject`; gerencia o `ModalProject` aberto.
- **CardProject** (`Card/CardProject.jsx`) — imagem, categoria, ano, nome, tecnologias e botão "Ver detalhes". Props: `project`, `aoVerDetalhes`.
- **ModalProject** (`Modal/ModalProject.jsx`) — modal (portal) com galeria, descrição, tecnologias e links. Props: `project`, `aoFechar`.
