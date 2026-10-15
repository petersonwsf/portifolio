import styles from './SecaoEscura.module.css'

/** Seção de fundo escuro com grade sutil e cabeçalho padrão (etiqueta + título). */
function SecaoEscura({ id, etiqueta, titulo, children }) {
    return (
        <section id={id} className={styles.secao}>
            <div className={styles.grade} aria-hidden="true" />
            <div className={styles.conteudo}>
                <div className={styles.cabecalhoSecao}>
                    <span className={styles.etiqueta}>{etiqueta}</span>
                    <h2 className={styles.titulo}>{titulo}</h2>
                </div>
                {children}
            </div>
        </section>
    )
}

export default SecaoEscura
