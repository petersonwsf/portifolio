# COMPONENTS.md — frontend

## Layout
- **Cabecalho** (`layout/Cabecalho.jsx`) — header fixo com efeito de vidro ao rolar, barra de progresso de leitura, destaque da seção ativa e menu hambúrguer no mobile. Sem props.
- **Container** (`layout/Container.jsx`) — wrapper do `<main>`. Props: `children`.

## Seções
- **Heroi** (`sections/Heroi.jsx`) — hero interativa: saudação por horário, papéis digitados, carrossel horizontal com 6 logos de tecnologias que giram, destacam o da frente por 2s e são trocados ao passar pelo fundo, selos de hora de Brasília e dados do GitHub, contadores animados e brilho que segue o mouse. Sem props.
- **Experiences**, **Skills**, **Projects**, **AboutMe**, **Contacts** — seções da página.

## Cartões / Modal
- **CardExperience**, **CardSkill**, **CardProject**, **CardContact**, **ModalProject** — apresentação de itens das seções.
