import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import styles from './CardExperience.module.css'

const formatarMes = (data) => {
    const texto = format(data, 'MMM/yyyy', { locale: ptBR })
    return texto.charAt(0).toUpperCase() + texto.slice(1)
}

function CardExperience({ experience }) {
    const tecnologias = experience.technologies
        .split(',')
        .map((tecnologia) => tecnologia.trim())
        .filter(Boolean)
    const atual = !experience.endDate

    return (
        <article className={styles.card}>
            <div className={styles.imagem}>
                <img src={experience.image} alt={`Logo ${experience.name}`} />
            </div>

            <div className={styles.conteudo}>
                <span className={`${styles.periodo} ${atual ? styles.periodoAtual : ''}`}>
                    {formatarMes(experience.startDate)} - {atual ? 'atual' : formatarMes(experience.endDate)}
                </span>
                <h3 className={styles.empresa}>{experience.name}</h3>
                <p className={styles.cargo}>{experience.function}</p>
                <p className={styles.descricao}>{experience.description}</p>

                <ul className={styles.tecnologias} aria-label="Tecnologias">
                    {tecnologias.map((tecnologia) => (
                        <li key={tecnologia}>{tecnologia}</li>
                    ))}
                </ul>
            </div>
        </article>
    )
}

export default CardExperience
