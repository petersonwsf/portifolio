import { useEffect, useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import logo from '../../assets/img/logo.png'
import styles from './Cabecalho.module.css'

const LINKS = [
    { id: 'hero', rotulo: 'Início' },
    { id: 'experiences', rotulo: 'Experiências' },
    { id: 'skills', rotulo: 'Habilidades' },
    { id: 'projects', rotulo: 'Projetos' },
    { id: 'aboutme', rotulo: 'Sobre mim' },
]

function Cabecalho() {
    const [rolou, setRolou] = useState(false)
    const [progresso, setProgresso] = useState(0)
    const [secaoAtiva, setSecaoAtiva] = useState('hero')
    const [menuAberto, setMenuAberto] = useState(false)

    useEffect(() => {
        const aoRolar = () => {
            const alturaTotal = document.documentElement.scrollHeight - window.innerHeight
            setRolou(window.scrollY > 24)
            setProgresso(alturaTotal > 0 ? (window.scrollY / alturaTotal) * 100 : 0)
        }
        aoRolar()
        window.addEventListener('scroll', aoRolar, { passive: true })
        return () => window.removeEventListener('scroll', aoRolar)
    }, [])

    useEffect(() => {
        const observador = new IntersectionObserver(
            (entradas) => {
                entradas.forEach((entrada) => {
                    if (entrada.isIntersecting) setSecaoAtiva(entrada.target.id)
                })
            },
            { rootMargin: '-45% 0px -50% 0px' }
        )
        LINKS.forEach(({ id }) => {
            const secao = document.getElementById(id)
            if (secao) observador.observe(secao)
        })
        return () => observador.disconnect()
    }, [])

    const irParaSecao = (id) => {
        setMenuAberto(false)
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <header className={`${styles.cabecalho} ${rolou ? styles.rolou : ''}`}>
            <div className={styles.barra}>
                <button className={styles.logo} onClick={() => irParaSecao('hero')} aria-label="Ir para o início">
                    <img src={logo} alt="Logo" className={styles.imagemLogo} />
                </button>

                <nav
                    id="menu-principal"
                    className={`${styles.menu} ${menuAberto ? styles.menuAberto : ''}`}
                    aria-label="Navegação principal"
                >
                    {LINKS.map(({ id, rotulo }) => (
                        <button
                            key={id}
                            className={`${styles.link} ${secaoAtiva === id ? styles.ativo : ''}`}
                            onClick={() => irParaSecao(id)}
                            aria-current={secaoAtiva === id ? 'true' : undefined}
                        >
                            {rotulo}
                        </button>
                    ))}
                    <button className={styles.contato} onClick={() => irParaSecao('contacts')}>
                        Contato
                    </button>
                </nav>

                <button
                    className={styles.botaoMenu}
                    onClick={() => setMenuAberto((aberto) => !aberto)}
                    aria-expanded={menuAberto}
                    aria-controls="menu-principal"
                    aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
                >
                    {menuAberto ? <FaTimes /> : <FaBars />}
                </button>
            </div>
            <div className={styles.progresso} style={{ width: `${progresso}%` }} />
        </header>
    )
}

export default Cabecalho
