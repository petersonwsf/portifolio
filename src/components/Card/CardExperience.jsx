import { formatarPeriodo } from '../../utils/periodo'
import styles from './CardExperience.module.css'

/**
 * Cartão compacto de experiência. Props: `experiencia` ({ categoria, empresa, cargo, dataInicio, dataFim, imagem })
 * e `aoVerDetalhes` (callback ao clicar no botão).
 */
function CardExperience({ experiencia, aoVerDetalhes }) {
    const atual = !experiencia.dataFim

    return (
        <article className={styles.card}>
            <div className={styles.topo}>
                {experiencia.imagem ? (
                    <img src={experiencia.imagem} alt={`Logo ${experiencia.empresa}`} className={styles.logo} />
                ) : (
                    <span className={styles.logo} aria-hidden="true" />
                )}
                {experiencia.categoria && <span className={styles.categoria}>{experiencia.categoria}</span>}
            </div>

            <h3 className={styles.empresa}>{experiencia.empresa}</h3>
            <p className={styles.cargo}>{experiencia.cargo}</p>

            <span className={`${styles.periodo} ${atual ? styles.periodoAtual : ''}`}>
                {formatarPeriodo(experiencia.dataInicio, experiencia.dataFim)}
            </span>

            <button className={styles.botao} onClick={() => aoVerDetalhes(experiencia)}>
                Ver detalhes
            </button>
        </article>
    )
}

export default CardExperience
