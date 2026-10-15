import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { FaTimes, FaCode, FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import styles from './ModalProject.module.css'

/** Modal de detalhes do projeto. Props: `projeto` e `aoFechar`. */
function ModalProject({ projeto, aoFechar }) {
    const [indiceImagem, setIndiceImagem] = useState(0)
    const total = projeto.imagens.length

    useEffect(() => {
        const aoTeclar = (evento) => {
            if (evento.key === 'Escape') aoFechar()
            if (total === 0) return
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
                aria-label={`Detalhes do projeto ${projeto.nome}`}
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
                        {total > 0 && (
                            <img src={projeto.imagens[indiceImagem]} alt={`${projeto.nome} - imagem ${indiceImagem + 1}`} />
                        )}
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
                            {projeto.imagens.map((imagem, indice) => (
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
                        <span className={styles.categoria}>{projeto.categoria}</span>
                        <span className={styles.ano}>{projeto.ano}</span>
                    </div>
                    <h3 className={styles.titulo}>{projeto.nome}</h3>
                    <p className={styles.descricao}>{projeto.descricao}</p>

                    <h4 className={styles.subtitulo}>Tecnologias</h4>
                    <ul className={styles.tecnologias}>
                        {projeto.tecnologias.map((tecnologia) => (
                            <li key={tecnologia.id}>
                                {tecnologia.imagem
                                    ? <img src={tecnologia.imagem} alt="" />
                                    : <FaCode aria-hidden="true" />}
                                {tecnologia.nome}
                            </li>
                        ))}
                    </ul>

                    <div className={styles.links}>
                        {projeto.urlPagina && (
                            <a href={projeto.urlPagina} target="_blank" rel="noreferrer" className={styles.primario}>
                                <FaExternalLinkAlt /> Ver projeto
                            </a>
                        )}
                        {projeto.urlCodigo && (
                            <a href={projeto.urlCodigo} target="_blank" rel="noreferrer" className={styles.secundario}>
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
