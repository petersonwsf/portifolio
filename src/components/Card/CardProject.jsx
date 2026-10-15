import { useLayoutEffect, useRef, useState } from 'react'
import styles from './CardProject.module.css'

const MAX_LINHAS_TECNOLOGIAS = 2

/**
 * Lista de tecnologias que ocupa no máximo `MAX_LINHAS_TECNOLOGIAS` linhas:
 * o que não couber vira um chip "Mais x...".
 */
function TecnologiasCompactas({ tecnologias }) {
    const listaRef = useRef(null)
    const [visiveis, setVisiveis] = useState(tecnologias.length)

    // remove um chip por vez até que tudo (incluindo o "Mais x...") caiba no limite de linhas
    useLayoutEffect(() => {
        const lista = listaRef.current
        const primeiro = lista?.firstElementChild
        if (!primeiro || visiveis === 0) return
        const ultimo = lista.lastElementChild
        const espacoEntreLinhas = parseFloat(getComputedStyle(lista).rowGap) || 0
        const limite = primeiro.offsetHeight * MAX_LINHAS_TECNOLOGIAS + espacoEntreLinhas * (MAX_LINHAS_TECNOLOGIAS - 1) + 1
        const fimUltimo = ultimo.offsetTop - primeiro.offsetTop + ultimo.offsetHeight
        if (fimUltimo > limite) setVisiveis((atual) => atual - 1)
    }, [visiveis])

    const restantes = tecnologias.length - visiveis

    return (
        <ul className={styles.tecnologias} ref={listaRef} aria-label="Tecnologias">
            {tecnologias.slice(0, visiveis).map((tecnologia) => (
                <li key={tecnologia.id}>{tecnologia.nome}</li>
            ))}
            {restantes > 0 && <li className={styles.mais}>Mais {restantes}...</li>}
        </ul>
    )
}

/** Cartão de projeto. Props: `projeto` e `aoVerDetalhes` (callback ao clicar no botão). */
function CardProject({ projeto, aoVerDetalhes }) {
    return (
        <article className={styles.card}>
            <div className={styles.imagem}>
                {projeto.imagens[0] && <img src={projeto.imagens[0]} alt={`Imagem do projeto ${projeto.nome}`} />}
                <span className={styles.categoria}>{projeto.categoria}</span>
            </div>

            <div className={styles.conteudo}>
                <div className={styles.titulo}>
                    <h3>{projeto.nome}</h3>
                    <span className={styles.ano}>{projeto.ano}</span>
                </div>

                <TecnologiasCompactas tecnologias={projeto.tecnologias} />

                <button className={styles.botao} onClick={() => aoVerDetalhes(projeto)}>
                    Ver detalhes
                </button>
            </div>
        </article>
    )
}

export default CardProject
