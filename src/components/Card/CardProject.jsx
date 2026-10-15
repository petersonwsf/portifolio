import { listarTecnologias } from '../../utils/tecnologias'
import styles from './CardProject.module.css'

const MAX_TECNOLOGIAS_VISIVEIS = 3

/** Cartão de projeto. Props: `project` e `aoVerDetalhes` (callback ao clicar no botão). */
function CardProject({ project, aoVerDetalhes }) {
    const todas = listarTecnologias(project.technologies)
    const tecnologias = todas.slice(0, MAX_TECNOLOGIAS_VISIVEIS)
    const restantes = todas.length - tecnologias.length

    return (
        <article className={styles.card}>
            <div className={styles.imagem}>
                <img src={project.images[0]} alt={`Imagem do projeto ${project.name}`} />
                <span className={styles.categoria}>{project.categoria}</span>
            </div>

            <div className={styles.conteudo}>
                <div className={styles.titulo}>
                    <h3>{project.name}</h3>
                    <span className={styles.ano}>{project.ano}</span>
                </div>

                <ul className={styles.tecnologias} aria-label="Tecnologias">
                    {tecnologias.map((tecnologia) => (
                        <li key={tecnologia}>{tecnologia}</li>
                    ))}
                    {restantes > 0 && <li className={styles.mais}>Mais {restantes}...</li>}
                </ul>

                <button className={styles.botao} onClick={() => aoVerDetalhes(project)}>
                    Ver detalhes
                </button>
            </div>
        </article>
    )
}

export default CardProject
