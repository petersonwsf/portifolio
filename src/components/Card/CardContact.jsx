import { FaArrowRight } from 'react-icons/fa'
import styles from './CardContact.module.css'

/** Link de contato externo. Props: `contact` ({ label, value, icone, link }). */
function CardContact({ contact }) {
    return (
        <a href={contact.link} target="_blank" rel="noopener noreferrer" className={styles.card}>
            <span className={styles.icone} aria-hidden="true">{contact.icone}</span>
            <span className={styles.texto}>
                <strong>{contact.label}</strong>
                <small>{contact.value}</small>
            </span>
            <FaArrowRight className={styles.seta} aria-hidden="true" />
        </a>
    )
}

export default CardContact
