import styles from './CardSkill.module.css'

/** Item de habilidade: ícone + rótulo. */
function CardSkill({ skill }) {
    return (
        <li className={styles.item}>
            <span className={styles.icone}>
                <img src={skill.urlImage} alt="" />
            </span>
            <span className={styles.rotulo}>{skill.name}</span>
        </li>
    )
}

export default CardSkill
