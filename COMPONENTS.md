# COMPONENTS.md — frontend

## Layout
- **Cabecalho** (`layout/Cabecalho.jsx`) — header fixo com efeito de vidro ao rolar, barra de progresso de leitura, destaque da seção ativa e menu hambúrguer no mobile. Sem props.
- **Container** (`layout/Container.jsx`) — wrapper do `<main>`. Props: `children`.

## Seções
- **Heroi** (`sections/Heroi.jsx`) — hero interativa: saudação por horário, papéis digitados, carrossel horizontal com 5 logos de tecnologias que giram, destacam o da frente por 2s e são trocados ao passar pelo fundo, selos de hora de Brasília e dados do GitHub, contadores animados. Sem props.
- **Experiences** (`sections/Experiences.jsx`) — experiências em `Carrossel` com `CardExperience`, fundo escuro com grade igual à hero (sem brilho do mouse) e sombras azuis.
- **Skills**, **Projects**, **AboutMe**, **Contacts** — seções da página.

## Cartões / Modal
- **Carrossel** (`Carrossel/Carrossel.jsx`) — carrossel genérico com snap, setas, indicadores, toque e teclado. Props: `children` (cada filho é um slide), `rotulo`.
- **CardExperience** (`Card/CardExperience.jsx`) — cartão de experiência: logo, empresa, cargo, período ("atual" se sem `endDate`), descrição e tecnologias como chips. Props: `experience`.
- **CardSkill**, **CardProject**, **CardContact**, **ModalProject** — apresentação de itens das seções.
