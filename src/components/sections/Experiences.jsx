import experiences from '../../assets/consts/experiences'
import CardExperience from '../Card/CardExperience'
import Carrossel from '../Carrossel/Carrossel'
import styles from './Experiences.module.css'

function Experiences() {
    return (
        <section id="experiences" className={styles.secao}>
            <div className={styles.grade} aria-hidden="true" />
            <div className={styles.conteudo}>
                <div className={styles.cabecalhoSecao}>
                    <span className={styles.etiqueta}>&lt;trajetória /&gt;</span>
                    <h2 className={styles.titulo}>Experiências</h2>
                </div>
                <Carrossel rotulo="Experiências profissionais">
                    {experiences.map((experience) => (
                        <CardExperience key={`${experience.name}-${experience.startDate.getTime()}`} experience={experience} />
                    ))}
                </Carrossel>
            </div>
        </section>
    )
}

export default Experiences
