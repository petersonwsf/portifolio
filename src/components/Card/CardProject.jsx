import styles from './CardProject.module.css'

/** Cartão de projeto. Props: `project` e `aoVerDetalhes` (callback ao clicar no botão). */
function CardProject({ project, aoVerDetalhes }) {
    const tecnologias = project.technologies.split(',').map((tecnologia) => tecnologia.trim())

    return (
        <article className={styles.card}>
            <div className={styles.imagem}>
                <img src={project.images[0]} alt={`Imagem do projeto ${project.name}`} loading="lazy" />
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
                </ul>

                <button className={styles.botao} onClick={() => aoVerDetalhes(project)}>
                    Ver detalhes
                </button>
            </div>
        </article>
    )
}

export default CardProject
