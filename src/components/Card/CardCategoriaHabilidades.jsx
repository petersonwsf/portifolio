import CardSkill from './CardSkill'
import styles from './CardCategoriaHabilidades.module.css'

/** Cartão de uma classificação de habilidades. Props: `titulo`, `icone` (elemento) e `habilidades`. */
function CardCategoriaHabilidades({ titulo, icone, habilidades }) {
    return (
        <article className={styles.card}>
            <header className={styles.topo}>
                <span className={styles.icone} aria-hidden="true">{icone}</span>
                <h3 className={styles.titulo}>{titulo}</h3>
                <span className={styles.quantidade}>{habilidades.length}</span>
            </header>
            <ul className={styles.lista}>
                {habilidades.map((habilidade) => (
                    <CardSkill key={habilidade.name} skill={habilidade} />
                ))}
            </ul>
        </article>
    )
}

export default CardCategoriaHabilidades
