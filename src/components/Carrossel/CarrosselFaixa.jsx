import { Children, useCallback, useEffect, useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import styles from './CarrosselFaixa.module.css'

const MINIMO_PARA_CARROSSEL = 3

/**
 * Carrossel em faixa: mostra vários itens lado a lado e avança/volta um item por clique nos botões,
 * mantendo o item atual centralizado. Não é circular: as setas ficam desabilitadas no primeiro e no último item.
 * Com menos de 3 itens, mostra-os fixos e centralizados (sem setas).
 * Cada filho é um item.
 * Props: `children`, `rotulo`.
 */
function CarrosselFaixa({ children, rotulo = 'Carrossel' }) {
    const itens = Children.toArray(children)
    const total = itens.length
    const primeiroRef = useRef(null)
    const janelaRef = useRef(null)
    const [posicao, setPosicao] = useState(0)
    const [passo, setPasso] = useState(0)
    const [larguraJanela, setLarguraJanela] = useState(0)
    const [animando, setAnimando] = useState(false)

    useEffect(() => {
        const medir = () => {
            if (primeiroRef.current) setPasso(primeiroRef.current.offsetWidth)
            if (janelaRef.current) setLarguraJanela(janelaRef.current.clientWidth)
        }
        medir()
        window.addEventListener('resize', medir)
        return () => window.removeEventListener('resize', medir)
    }, [])

    // ativa a transição só depois da medição inicial (evita deslizar ao carregar)
    useEffect(() => {
        const quadro = requestAnimationFrame(() => requestAnimationFrame(() => setAnimando(true)))
        return () => cancelAnimationFrame(quadro)
    }, [])

    const atual = Math.min(posicao, Math.max(total - 1, 0))
    const mover = useCallback(
        (direcao) => setPosicao(Math.max(0, Math.min(atual + direcao, total - 1))),
        [atual, total]
    )

    const aoTeclar = (evento) => {
        if (evento.key === 'ArrowRight') mover(1)
        if (evento.key === 'ArrowLeft') mover(-1)
    }

    // com menos de 3 itens não há o que navegar: exibe-os centralizados e fixos
    if (total < MINIMO_PARA_CARROSSEL) {
        return (
            <div className={styles.estatico} role="region" aria-label={rotulo}>
                {itens.map((item, indice) => (
                    <div className={styles.item} key={indice}>
                        {item}
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className={styles.carrossel} role="region" aria-roledescription="carrossel" aria-label={rotulo}>
            <div className={styles.janela} ref={janelaRef} tabIndex={0} onKeyDown={aoTeclar}>
                <div
                    className={`${styles.trilho} ${animando ? styles.animando : ''}`}
                    style={{ transform: `translateX(${(larguraJanela - passo) / 2 - atual * passo}px)` }}
                >
                    {itens.map((item, indice) => (
                        <div className={styles.item} key={indice} ref={indice === 0 ? primeiroRef : undefined}>
                            {item}
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.controles}>
                <button className={styles.seta} onClick={() => mover(-1)} disabled={atual === 0} aria-label="Anterior">
                    <FaChevronLeft />
                </button>
                <button
                    className={styles.seta}
                    onClick={() => mover(1)}
                    disabled={atual === total - 1}
                    aria-label="Próximo"
                >
                    <FaChevronRight />
                </button>
            </div>
        </div>
    )
}

export default CarrosselFaixa
