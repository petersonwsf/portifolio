import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { FaTimes, FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import styles from './ModalProject.module.css'

/** Modal de detalhes do projeto. Props: `project` e `aoFechar`. */
function ModalProject({ project, aoFechar }) {
    const [indiceImagem, setIndiceImagem] = useState(0)
    const total = project.images.length
    const tecnologias = project.technologies.split(',').map((tecnologia) => tecnologia.trim())

    useEffect(() => {
        const aoTeclar = (evento) => {
            if (evento.key === 'Escape') aoFechar()
            if (evento.key === 'ArrowRight') setIndiceImagem((atual) => (atual + 1) % total)
            if (evento.key === 'ArrowLeft') setIndiceImagem((atual) => (atual - 1 + total) % total)
        }
        const overflowAnterior = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        document.addEventListener('keydown', aoTeclar)
        return () => {
            document.body.style.overflow = overflowAnterior
            document.removeEventListener('keydown', aoTeclar)
        }
    }, [aoFechar, total])

    return createPortal(
        <div className={styles.fundo} onClick={aoFechar}>
            <div
                className={styles.modal}
                role="dialog"
                aria-modal="true"
                aria-label={`Detalhes do projeto ${project.name}`}
                onClick={(evento) => evento.stopPropagation()}
            >
                <button className={styles.fechar} onClick={aoFechar} aria-label="Fechar">
                    <FaTimes />
                </button>

                <div className={styles.galeria}>
                    <div className={styles.imagemPrincipal}>
                        {total > 1 && (
                            <button
                                className={`${styles.seta} ${styles.anterior}`}
                                onClick={() => setIndiceImagem((atual) => (atual - 1 + total) % total)}
                                aria-label="Imagem anterior"
                            >
                                <FaChevronLeft />
                            </button>
                        )}
                        <img src={project.images[indiceImagem]} alt={`${project.name} - imagem ${indiceImagem + 1}`} />
                        {total > 1 && (
                            <button
                                className={`${styles.seta} ${styles.proxima}`}
                                onClick={() => setIndiceImagem((atual) => (atual + 1) % total)}
                                aria-label="Próxima imagem"
                            >
                                <FaChevronRight />
                            </button>
                        )}
                    </div>

                    {total > 1 && (
                        <div className={styles.miniaturas}>
                            {project.images.map((imagem, indice) => (
                                <button
                                    key={indice}
                                    className={`${styles.miniatura} ${indice === indiceImagem ? styles.miniaturaAtiva : ''}`}
                                    onClick={() => setIndiceImagem(indice)}
                                    aria-label={`Ver imagem ${indice + 1}`}
                                >
                                    <img src={imagem} alt="" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className={styles.info}>
                    <div className={styles.meta}>
                        <span className={styles.categoria}>{project.categoria}</span>
                        <span className={styles.ano}>{project.ano}</span>
                    </div>
                    <h3 className={styles.titulo}>{project.name}</h3>
                    <p className={styles.descricao}>{project.details}</p>

                    <h4 className={styles.subtitulo}>Tecnologias</h4>
                    <ul className={styles.tecnologias}>
                        {tecnologias.map((tecnologia) => (
                            <li key={tecnologia}>{tecnologia}</li>
                        ))}
                    </ul>

                    <div className={styles.links}>
                        {project.urlPage && (
                            <a href={project.urlPage} target="_blank" rel="noreferrer" className={styles.primario}>
                                <FaExternalLinkAlt /> Ver projeto
                            </a>
                        )}
                        {project.urlCode && (
                            <a href={project.urlCode} target="_blank" rel="noreferrer" className={styles.secundario}>
                                <FaGithub /> Código fonte
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    )
}

export default ModalProject
