import { FaLinkedin, FaGithub } from 'react-icons/fa'
import CardContact from '../Card/CardContact'
import FormularioContato from '../Form/FormularioContato'
import SecaoEscura from '../layout/SecaoEscura'
import styles from './Contacts.module.css'

const CONTATOS = [
    {
        label: 'LinkedIn',
        value: 'Peterson William',
        icone: <FaLinkedin />,
        link: 'https://www.linkedin.com/in/peterson-william-02ba87243/',
    },
    {
        label: 'GitHub',
        value: 'petersonwsf',
        icone: <FaGithub />,
        link: 'https://github.com/petersonwsf',
    },
]

function Contacts() {
    return (
        <SecaoEscura id="contacts" etiqueta="<contato />" titulo="Contato">
            <div className={styles.conteudo}>
                <div className={styles.formulario}>
                    <h3 className={styles.subtitulo}>Envie uma mensagem</h3>
                    <FormularioContato />
                </div>

                <div className={styles.redes}>
                    <h3 className={styles.subtitulo}>Acompanhe meu trbalho por aqui também</h3>
                    {CONTATOS.map((contato) => (
                        <CardContact key={contato.label} contact={contato} />
                    ))}
                </div>
            </div>
        </SecaoEscura>
    )
}

export default Contacts
