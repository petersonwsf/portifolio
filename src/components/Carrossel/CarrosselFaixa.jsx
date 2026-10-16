import { Children, useCallback, useEffect, useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import styles from './CarrosselFaixa.module.css'

const MINIMO_PARA_CARROSSEL = 3

/**
 * Carrossel em faixa: mostra vários itens lado a lado e avança/volta um item por clique nos botões.
 * Começa alinhado à esquerda e para quando o último item encosta na borda direita (sem espaço vazio nas pontas).
 * Não é circular: cada seta fica desabilitada quando não há mais para onde andar.
 * Com menos de 3 itens, mostra-os fixos e centralizados (sem setas).
 * Cada filho é um item.
 * Props: `children`, `rotulo`.
 */
function CarrosselFaixa({ children, rotulo = 'Carrossel' }) {
    const itens = Children.toArray(children)
    const total = itens.length
    const primeiroRef = useRef(null)
    const janelaRef = useRef(null)
    const trilhoRef = useRef(null)
    const [posicao, setPosicao] = useState(0)
    const [passo, setPasso] = useState(0)
    const [larguraJanela, setLarguraJanela] = useState(0)
    const [larguraTrilho, setLarguraTrilho] = useState(0)
    const [animando, setAnimando] = useState(false)

    useEffect(() => {
        const medir = () => {
            if (primeiroRef.current) setPasso(primeiroRef.current.offsetWidth)
            if (janelaRef.current) setLarguraJanela(janelaRef.current.clientWidth)
            if (trilhoRef.current) setLarguraTrilho(trilhoRef.current.scrollWidth)
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

    // deslocamento máximo: o último item encosta na borda direita da janela
    const deslocamentoMaximo = Math.max(larguraTrilho - larguraJanela, 0)
    const ultimoIndice = passo > 0 ? Math.ceil(deslocamentoMaximo / passo) : Math.max(total - 1, 0)
    const atual = Math.min(posicao, ultimoIndice)
    const deslocamento =
        larguraTrilho > 0 && larguraTrilho < larguraJanela
            ? -(larguraJanela - larguraTrilho) / 2 // todos cabem: centraliza a faixa
            : Math.min(atual * passo, deslocamentoMaximo)

    const mover = useCallback(
        (direcao) => setPosicao(Math.max(0, Math.min(atual + direcao, ultimoIndice))),
        [atual, ultimoIndice]
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
            <div
                className={styles.janela}
                ref={janelaRef}
                tabIndex={0}
                onKeyDown={aoTeclar}
                // sem esmaecer a borda de onde não há mais itens (início/fim)
                style={{ '--borda-esq': atual === 0 ? 1 : 0, '--borda-dir': atual >= ultimoIndice ? 1 : 0 }}
            >
                <div
                    className={`${styles.trilho} ${animando ? styles.animando : ''}`}
                    ref={trilhoRef}
                    style={{ transform: `translateX(${-deslocamento}px)` }}
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
                    disabled={atual >= ultimoIndice}
                    aria-label="Próximo"
                >
                    <FaChevronRight />
                </button>
            </div>
        </div>
    )
}

export default CarrosselFaixa
