import { Children, useCallback, useEffect, useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import styles from './Carrossel.module.css'

/**
 * Carrossel genérico com rolagem por snap, botões, indicadores e suporte a toque/teclado.
 * Cada filho vira um slide que ocupa toda a largura.
 * Com `circular`, as setas voltam ao início/fim em vez de desabilitar.
 */
function Carrossel({ children, rotulo = 'Carrossel', circular = false }) {
    const trilhoRef = useRef(null)
    const [ativo, setAtivo] = useState(0)
    const slides = Children.toArray(children)
    const total = slides.length

    const irPara = useCallback((indice) => {
        const trilho = trilhoRef.current
        if (!trilho) return
        const limitado = circular ? (indice + total) % total : Math.max(0, Math.min(indice, total - 1))
        const destino = limitado
        trilho.scrollTo({ left: destino * trilho.clientWidth, behavior: 'smooth' })
    }, [total, circular])

    useEffect(() => {
        const trilho = trilhoRef.current
        if (!trilho) return undefined
        const aoRolar = () => setAtivo(Math.round(trilho.scrollLeft / trilho.clientWidth))
        trilho.addEventListener('scroll', aoRolar, { passive: true })
        return () => trilho.removeEventListener('scroll', aoRolar)
    }, [])

    const aoTeclar = (evento) => {
        if (evento.key === 'ArrowRight') irPara(ativo + 1)
        if (evento.key === 'ArrowLeft') irPara(ativo - 1)
    }

    return (
        <div className={styles.carrossel} role="region" aria-roledescription="carrossel" aria-label={rotulo}>
            <div className={styles.palco}>
                {total > 1 && (
                    <button
                        className={`${styles.seta} ${styles.anterior}`}
                        onClick={() => irPara(ativo - 1)}
                        disabled={!circular && ativo === 0}
                        aria-label="Anterior"
                    >
                        <FaChevronLeft />
                    </button>
                )}

                <div className={styles.trilho} ref={trilhoRef} tabIndex={0} onKeyDown={aoTeclar}>
                    {slides.map((slide, indice) => (
                        <div
                            key={indice}
                            className={styles.slide}
                            role="group"
                            aria-roledescription="slide"
                            aria-label={`${indice + 1} de ${total}`}
                        >
                            {slide}
                        </div>
                    ))}
                </div>

                {total > 1 && (
                    <button
                        className={`${styles.seta} ${styles.proximo}`}
                        onClick={() => irPara(ativo + 1)}
                        disabled={!circular && ativo === total - 1}
                        aria-label="Próximo"
                    >
                        <FaChevronRight />
                    </button>
                )}
            </div>

            {total > 1 && (
                <div className={styles.indicadores}>
                    {slides.map((_, indice) => (
                        <button
                            key={indice}
                            className={`${styles.ponto} ${indice === ativo ? styles.pontoAtivo : ''}`}
                            onClick={() => irPara(indice)}
                            aria-label={`Ir para o item ${indice + 1}`}
                            aria-current={indice === ativo ? 'true' : undefined}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Carrossel
