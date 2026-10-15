import { useLayoutEffect, useRef, useState } from 'react'
import { listarTecnologias } from '../../utils/tecnologias'
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
                <li key={tecnologia}>{tecnologia}</li>
            ))}
            {restantes > 0 && <li className={styles.mais}>Mais {restantes}...</li>}
        </ul>
    )
}

/** Cartão de projeto. Props: `project` e `aoVerDetalhes` (callback ao clicar no botão). */
function CardProject({ project, aoVerDetalhes }) {
    return (
        <article className={styles.card}>
            <div className={styles.imagem}>
                <img src={project.images[0]} alt={`Imagem do projeto ${project.name}`} />
                <span className={styles.categoria}>{project.categoria}</span>
            </div>

            <div className={styles.conteudo}>
                <div className={styles.titulo}>
                    <h3>{project.name}</h3>
                    <span className={styles.ano}>{project.ano}</span>
                </div>

                <TecnologiasCompactas tecnologias={listarTecnologias(project.technologies)} />

                <button className={styles.botao} onClick={() => aoVerDetalhes(project)}>
                    Ver detalhes
                </button>
            </div>
        </article>
    )
}

export default CardProject
