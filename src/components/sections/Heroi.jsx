import { useEffect, useMemo, useState } from 'react'
import { FaGithub, FaArrowDown, FaCircle } from 'react-icons/fa'
import useDigitacao from '../../hooks/useDigitacao'
import useRodizio from '../../hooks/useRodizio'
import foto from '../../assets/img/eu.jpeg'
import { useConteudo } from '../../hooks/useConteudo'
import styles from './Heroi.module.css'

const PAPEIS = [
    'Engenheiro de Software',
    'Desenvolvedor Full-Stack',
    'Cibersegurança',
    'Analista de Sistemas',
    'DevOps',
    'Analista de Dados',
]

const saudacaoPorHora = (data) => {
    const hora = Number(
        new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', hour12: false, timeZone: 'America/Sao_Paulo' }).format(data)
    )
    if (hora < 6) return 'Boa madrugada'
    if (hora < 12) return 'Bom dia'
    if (hora < 18) return 'Boa tarde'
    return 'Boa noite'
}

function Heroi() {
    const [agora, setAgora] = useState(() => new Date())
    const papel = useDigitacao(PAPEIS)
    const { habilidades } = useConteudo()

    useEffect(() => {
        const intervalo = setInterval(() => setAgora(new Date()), 1000)
        return () => clearInterval(intervalo)
    }, [])

    const irParaSecao = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

    const todasTecnologias = useMemo(() => habilidades.filter((habilidade) => habilidade.imagem), [habilidades])
    const tecnologias = useRodizio(todasTecnologias, 8, 2500)

    return (
        <section id="hero" className={styles.heroi}>
            <div className={styles.grade} aria-hidden="true" />
            <div className={styles.brilho} aria-hidden="true" />

            <div className={styles.conteudo}>
                <div className={styles.texto}>
                    <p className={styles.saudacao}>
                        <FaCircle className={styles.status} aria-hidden="true" />
                        {saudacaoPorHora(agora)}, eu sou
                    </p>
                    <h1 className={styles.titulo}>
                        Peterson <span className={styles.destaque}>William</span>
                    </h1>
                    <p className={styles.papel} aria-live="off">
                        <span className={styles.prompt}>&gt;</span> {papel}
                        <span className={styles.cursor} aria-hidden="true" />
                    </p>
                    <p className={styles.descricao}>
                        Construo aplicações modernas, escaláveis, seguras e de alto desempenho, transformando
                        ideias complexas em código limpo e soluções de real impacto.
                    </p>
                    <div className={styles.acoes}>
                        <button className={styles.botaoPrimario} onClick={() => irParaSecao('projects')}>
                            Conheça meu trabalho <FaArrowDown />
                        </button>
                        <a
                            className={styles.botaoSecundario}
                            href="https://github.com/petersonwsf"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FaGithub /> GitHub
                        </a>
                    </div>
                </div>

                <aside className={styles.orbita} aria-label="Foto e tecnologias">
                    {tecnologias.length > 0 && (
                    <div className={styles.anel}>
                        {tecnologias.map((tecnologia, indice) => (
                            <span
                                key={indice}
                                className={styles.satelite}
                                style={{ '--angulo': `${(360 / tecnologias.length) * indice}deg` }}
                            >
                                <img key={tecnologia.id} src={tecnologia.imagem} alt={tecnologia.nome} title={tecnologia.nome} />
                            </span>
                        ))}
                    </div>
                    )}
                    <img src={foto} alt="Peterson William" className={styles.foto} />
                </aside>
            </div>

        </section>
    )
}

export default Heroi
