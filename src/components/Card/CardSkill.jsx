import styles from './CardSkill.module.css'

const NIVEIS = { 'Básico': 1, 'Intermediário': 2, 'Avançado': 3 }

/** Item de habilidade: ícone, nome e nível (3 círculos + rótulo). Props: `habilidade` ({ nome, imagem, nivel }). */
function CardSkill({ habilidade }) {
    const preenchidos = NIVEIS[habilidade.nivel] ?? 0

    return (
        <li className={styles.item}>
            <span className={styles.icone}>
                {habilidade.imagem && <img src={habilidade.imagem} alt="" />}
            </span>
            <span className={styles.texto}>
                <span className={styles.rotulo}>{habilidade.nome}</span>
                <span className={styles.nivel}>
                    <span className={styles.circulos} aria-hidden="true">
                        {[1, 2, 3].map((posicao) => (
                            <span
                                key={posicao}
                                className={`${styles.circulo} ${posicao <= preenchidos ? styles.circuloPreenchido : ''}`}
                            />
                        ))}
                    </span>
                    <span className={styles.nivelRotulo}>{habilidade.nivel}</span>
                </span>
            </span>
        </li>
    )
}

export default CardSkill
