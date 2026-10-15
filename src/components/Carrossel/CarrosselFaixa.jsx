import { Children, useCallback, useEffect, useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import styles from './CarrosselFaixa.module.css'

const COPIAS = 3

/**
 * Carrossel em faixa contínua: mostra vários itens lado a lado e avança/volta um item
 * por clique nos botões, de forma circular (sem fim). Cada filho é um item.
 * Props: `children`, `rotulo`.
 */
function CarrosselFaixa({ children, rotulo = 'Carrossel' }) {
    const itens = Children.toArray(children)
    const total = itens.length
    const primeiroRef = useRef(null)
    const [posicao, setPosicao] = useState(total)
    const [passo, setPasso] = useState(0)
    const [animando, setAnimando] = useState(true)

    useEffect(() => {
        const medir = () => {
            if (primeiroRef.current) setPasso(primeiroRef.current.offsetWidth)
        }
        medir()
        window.addEventListener('resize', medir)
        return () => window.removeEventListener('resize', medir)
    }, [])

    // reativa a transição no quadro seguinte ao reposicionamento silencioso
    useEffect(() => {
        if (animando) return undefined
        const quadro = requestAnimationFrame(() => requestAnimationFrame(() => setAnimando(true)))
        return () => cancelAnimationFrame(quadro)
    }, [animando])

    const mover = useCallback((direcao) => setPosicao((atual) => atual + direcao), [])

    const aoTerminarTransicao = () => {
        if (posicao >= total * 2) {
            setAnimando(false)
            setPosicao(posicao - total)
        } else if (posicao < total) {
            setAnimando(false)
            setPosicao(posicao + total)
        }
    }

    const aoTeclar = (evento) => {
        if (evento.key === 'ArrowRight') mover(1)
        if (evento.key === 'ArrowLeft') mover(-1)
    }

    return (
        <div className={styles.carrossel} role="region" aria-roledescription="carrossel" aria-label={rotulo}>
            <div className={styles.janela} tabIndex={0} onKeyDown={aoTeclar}>
                <div
                    className={`${styles.trilho} ${animando ? styles.animando : ''}`}
                    style={{ transform: `translateX(${-posicao * passo}px)` }}
                    onTransitionEnd={aoTerminarTransicao}
                >
                    {Array.from({ length: COPIAS }).flatMap((_, copia) =>
                        itens.map((item, indice) => (
                            <div
                                className={styles.item}
                                key={`${copia}-${indice}`}
                                ref={copia === 0 && indice === 0 ? primeiroRef : undefined}
                                aria-hidden={copia !== 1 ? 'true' : undefined}
                            >
                                {item}
                            </div>
                        ))
                    )}
                </div>
            </div>

            {total > 1 && (
                <div className={styles.controles}>
                    <button className={styles.seta} onClick={() => mover(-1)} aria-label="Anterior">
                        <FaChevronLeft />
                    </button>
                    <button className={styles.seta} onClick={() => mover(1)} aria-label="Próximo">
                        <FaChevronRight />
                    </button>
                </div>
            )}
        </div>
    )
}

export default CarrosselFaixa
