import { useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa'
import { enviarContato } from '../../services/contato'
import styles from './FormularioContato.module.css'

const VALORES_INICIAIS = { nome: '', email: '', assunto: '', mensagem: '' }
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validar = (valores) => {
    const erros = {}
    if (valores.nome.trim().length < 2) erros.nome = 'Informe seu nome.'
    if (!REGEX_EMAIL.test(valores.email.trim())) erros.email = 'Informe um e-mail válido.'
    if (valores.assunto.trim().length < 3) erros.assunto = 'Informe o assunto.'
    if (valores.mensagem.trim().length < 10) erros.mensagem = 'Escreva uma mensagem com pelo menos 10 caracteres.'
    return erros
}

/** Formulário de contato com validação no cliente. */
function FormularioContato() {
    const [valores, setValores] = useState(VALORES_INICIAIS)
    const [erros, setErros] = useState({})
    const [estado, setEstado] = useState('ocioso') // ocioso | enviando | sucesso | erro

    const aoAlterar = (evento) => {
        const { name, value } = evento.target
        setValores((atuais) => ({ ...atuais, [name]: value }))
        if (erros[name]) setErros((atuais) => ({ ...atuais, [name]: undefined }))
        if (estado === 'sucesso' || estado === 'erro') setEstado('ocioso')
    }

    const aoEnviar = async (evento) => {
        evento.preventDefault()
        const novosErros = validar(valores)
        setErros(novosErros)
        if (Object.keys(novosErros).length > 0) return

        setEstado('enviando')
        try {
            await enviarContato({
                nome: valores.nome.trim(),
                email: valores.email.trim(),
                assunto: valores.assunto.trim(),
                mensagem: valores.mensagem.trim(),
            })
            setValores(VALORES_INICIAIS)
            setEstado('sucesso')
        } catch {
            setEstado('erro')
        }
    }

    const campo = (nome, rotulo, props = {}) => (
        <div className={styles.campo}>
            <label htmlFor={`contato-${nome}`}>{rotulo}</label>
            {nome === 'mensagem' ? (
                <textarea
                    id={`contato-${nome}`}
                    name={nome}
                    rows={5}
                    value={valores[nome]}
                    onChange={aoAlterar}
                    aria-invalid={Boolean(erros[nome])}
                    {...props}
                />
            ) : (
                <input
                    id={`contato-${nome}`}
                    name={nome}
                    value={valores[nome]}
                    onChange={aoAlterar}
                    aria-invalid={Boolean(erros[nome])}
                    {...props}
                />
            )}
            {erros[nome] && <span className={styles.erro} role="alert">{erros[nome]}</span>}
        </div>
    )

    return (
        <form className={styles.formulario} onSubmit={aoEnviar} noValidate>
            <div className={styles.linha}>
                {campo('nome', 'Nome', { type: 'text', autoComplete: 'name', placeholder: 'Seu nome' })}
                {campo('email', 'E-mail', { type: 'email', autoComplete: 'email', placeholder: 'voce@email.com' })}
            </div>
            {campo('assunto', 'Assunto', { type: 'text', placeholder: 'Sobre o que você quer falar?' })}
            {campo('mensagem', 'Mensagem', { placeholder: 'Escreva sua mensagem...' })}

            <button type="submit" className={styles.botao} disabled={estado === 'enviando'}>
                <FaPaperPlane aria-hidden="true" />
                {estado === 'enviando' ? 'Enviando...' : 'Enviar mensagem'}
            </button>

            <p className={styles.status} role="status" aria-live="polite">
                {estado === 'sucesso' && <span className={styles.sucesso}>Mensagem enviada! Responderei em breve.</span>}
                {estado === 'erro' && <span className={styles.erro}>Não foi possível enviar. Tente novamente.</span>}
            </p>
        </form>
    )
}

export default FormularioContato
