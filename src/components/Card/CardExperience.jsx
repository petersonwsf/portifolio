import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import styles from './CardExperience.module.css'

const formatarMes = (data) => {
    // as datas chegam em UTC (meia-noite); formata em UTC para não recuar um dia/mês
    const referencia = new Date(data)
    const local = new Date(referencia.getUTCFullYear(), referencia.getUTCMonth(), referencia.getUTCDate())
    const texto = format(local, 'MMM/yyyy', { locale: ptBR })
    return texto.charAt(0).toUpperCase() + texto.slice(1)
}

/** Cartão de experiência. Props: `experiencia` ({ empresa, cargo, descricao, dataInicio, dataFim, imagem, tecnologias }). */
function CardExperience({ experiencia }) {
    const atual = !experiencia.dataFim

    return (
        <article
            className={styles.card}
            style={experiencia.imagem ? undefined : { gridTemplateColumns: '1fr' }}
        >
            {experiencia.imagem && (
                <div className={styles.imagem}>
                    <img src={experiencia.imagem} alt={`Logo ${experiencia.empresa}`} />
                </div>
            )}

            <div className={styles.conteudo}>
                <span className={`${styles.periodo} ${atual ? styles.periodoAtual : ''}`}>
                    {formatarMes(experiencia.dataInicio)} - {atual ? 'atual' : formatarMes(experiencia.dataFim)}
                </span>
                <h3 className={styles.empresa}>{experiencia.empresa}</h3>
                <p className={styles.cargo}>{experiencia.cargo}</p>
                <p className={styles.descricao}>{experiencia.descricao}</p>

                <ul className={styles.tecnologias} aria-label="Tecnologias">
                    {experiencia.tecnologias.map((tecnologia) => (
                        <li key={tecnologia.id}>{tecnologia.nome}</li>
                    ))}
                </ul>
            </div>
        </article>
    )
}

export default CardExperience
