import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import CardSkill from './CardSkill'
import styles from './CardCategoriaHabilidades.module.css'

const LIMITE_RECOLHIDO = 5
/** Quanto do item seguinte aparece (esmaecido) abaixo do limite, indicando que há mais. */
const ESPIADA_PX = 16

/**
 * Cartão de uma classificação de habilidades. Mostra até 5 itens; se houver mais, o restante fica
 * escondido sob um esmaecimento e um botão "Ver mais" expande somente este cartão.
 * Props: `titulo`, `icone` (elemento) e `habilidades`.
 */
function CardCategoriaHabilidades({ titulo, icone, habilidades }) {
    const idLista = useId()
    const listaRef = useRef(null)
    const [expandido, setExpandido] = useState(false)
    const [alturas, setAlturas] = useState({ recolhida: 0, total: 0 })
    const excede = habilidades.length > LIMITE_RECOLHIDO

    // mede a altura dos 5 primeiros itens (e a total) para animar a expansão
    useLayoutEffect(() => {
        const medir = () => {
            const lista = listaRef.current
            const quinto = lista?.children[LIMITE_RECOLHIDO - 1]
            if (!lista || !quinto) return
            setAlturas({
                recolhida: quinto.offsetTop + quinto.offsetHeight + ESPIADA_PX,
                total: lista.scrollHeight,
            })
        }
        medir()
        window.addEventListener('resize', medir)
        return () => window.removeEventListener('resize', medir)
    }, [habilidades])

    // os ícones podem terminar de carregar depois e alterar a altura dos itens
    useEffect(() => {
        const lista = listaRef.current
        if (!lista || typeof ResizeObserver === 'undefined') return undefined
        const observador = new ResizeObserver(() => {
            const quinto = lista.children[LIMITE_RECOLHIDO - 1]
            if (!quinto) return
            setAlturas({ recolhida: quinto.offsetTop + quinto.offsetHeight + ESPIADA_PX, total: lista.scrollHeight })
        })
        observador.observe(lista)
        return () => observador.disconnect()
    }, [habilidades])

    const alturaMaxima = !excede || alturas.total === 0 ? undefined : expandido ? alturas.total : alturas.recolhida

    return (
        <article className={styles.card}>
            <header className={styles.topo}>
                <span className={styles.icone} aria-hidden="true">{icone}</span>
                <h3 className={styles.titulo}>{titulo}</h3>
            </header>

            <div className={styles.janela} style={{ maxHeight: alturaMaxima }}>
                <ul className={styles.lista} id={idLista} ref={listaRef}>
                    {habilidades.map((habilidade) => (
                        <CardSkill key={habilidade.id} habilidade={habilidade} />
                    ))}
                </ul>
                {excede && !expandido && <div className={styles.sombra} aria-hidden="true" />}
            </div>

            {excede && (
                <button
                    className={styles.verMais}
                    onClick={() => setExpandido((atual) => !atual)}
                    aria-expanded={expandido}
                    aria-controls={idLista}
                >
                    {expandido ? (
                        <>Ver menos <FaChevronUp aria-hidden="true" /></>
                    ) : (
                        <>Ver mais ({habilidades.length - LIMITE_RECOLHIDO}) <FaChevronDown aria-hidden="true" /></>
                    )}
                </button>
            )}
        </article>
    )
}

export default CardCategoriaHabilidades
