import styles from './EstadoConteudo.module.css'

/**
 * Mostra "carregando", erro ou "vazio" no lugar do conteúdo de uma seção.
 * Props: `carregando`, `erro`, `vazio` (boolean), `mensagemVazia` e `children`.
 */
function EstadoConteudo({ carregando, erro, vazio, mensagemVazia = 'Nada por aqui ainda.', children }) {
    if (carregando) return <p className={styles.estado} role="status">Carregando...</p>
    if (erro) return <p className={`${styles.estado} ${styles.erro}`} role="alert">{erro}</p>
    if (vazio) return <p className={styles.estado}>{mensagemVazia}</p>
    return children
}

export default EstadoConteudo
