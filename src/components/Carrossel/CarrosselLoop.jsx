import { Children } from 'react'
import styles from './CarrosselLoop.module.css'

/**
 * Carrossel em loop contínuo (marquee). Os filhos são duplicados para o ciclo ser sem emendas.
 * Pausa ao passar o mouse/focar e fica estático (rolável) com `prefers-reduced-motion`.
 * Props: `children`, `rotulo`, `duracao` (segundos por ciclo completo).
 */
function CarrosselLoop({ children, rotulo = 'Carrossel', duracao = 40 }) {
    const filhos = Children.toArray(children)
    // repete os itens para que cada grupo seja sempre mais largo que a tela
    const repeticoes = Math.max(1, Math.ceil(8 / Math.max(filhos.length, 1)))
    const itens = Array.from({ length: repeticoes }).flatMap(() => filhos)

    return (
        <div className={styles.janela} role="region" aria-roledescription="carrossel" aria-label={rotulo}>
            <div className={styles.trilho} style={{ '--duracao': `${duracao}s` }}>
                {[0, 1].map((copia) => (
                    <div className={styles.grupo} key={copia} aria-hidden={copia === 1 ? 'true' : undefined}>
                        {itens.map((item, indice) => (
                            <div className={styles.item} key={`${copia}-${indice}`}>
                                {item}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CarrosselLoop
