import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { FaTimes } from 'react-icons/fa'
import styles from './ModalBase.module.css'

/**
 * Estrutura básica de modal (portal, fundo, fechar por Esc/clique fora, bloqueio de rolagem).
 * Props: `rotulo` (acessibilidade), `aoFechar`, `children` e `largura` (CSS, padrão 460px).
 */
function ModalBase({ rotulo, aoFechar, children, largura = '460px' }) {
    useEffect(() => {
        const aoTeclar = (evento) => {
            if (evento.key === 'Escape') aoFechar()
        }
        const overflowAnterior = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        document.addEventListener('keydown', aoTeclar)
        return () => {
            document.body.style.overflow = overflowAnterior
            document.removeEventListener('keydown', aoTeclar)
        }
    }, [aoFechar])

    return createPortal(
        <div className={styles.fundo} onClick={aoFechar}>
            <div
                className={styles.modal}
                style={{ width: `min(100%, ${largura})` }}
                role="dialog"
                aria-modal="true"
                aria-label={rotulo}
                onClick={(evento) => evento.stopPropagation()}
            >
                <button className={styles.fechar} onClick={aoFechar} aria-label="Fechar">
                    <FaTimes />
                </button>
                {children}
            </div>
        </div>,
        document.body
    )
}

export default ModalBase
