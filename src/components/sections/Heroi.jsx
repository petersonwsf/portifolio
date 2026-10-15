import { useEffect, useMemo, useState } from 'react'
import { FaGithub, FaArrowDown, FaCircle } from 'react-icons/fa'
import { formatDistanceToNowStrict } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import useDigitacao from '../../hooks/useDigitacao'
import useContagem from '../../hooks/useContagem'
import useGithub from '../../hooks/useGithub'
import useCarrossel from '../../hooks/useCarrossel'
import projetos from '../../assets/consts/projects'
import habilidades from '../../assets/consts/skills'
import experiencias from '../../assets/consts/experiences'
import styles from './Heroi.module.css'

const PAPEIS = [
    'Engenheiro de Software',
    'Desenvolvedor Full-Stack',
    'Cibersegurança',
    'Analista de Sistemas',
    'DevOps',
    'Analista de Dados',
]

const formatadorHora = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'America/Sao_Paulo',
})

const saudacaoPorHora = (data) => {
    const hora = Number(
        new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', hour12: false, timeZone: 'America/Sao_Paulo' }).format(data)
    )
    if (hora < 6) return 'Boa madrugada'
    if (hora < 12) return 'Bom dia'
    if (hora < 18) return 'Boa tarde'
    return 'Boa noite'
}

const mesesDeExperiencia = () => {
    const inicios = experiencias.map((item) => item.startDate.getTime())
    if (inicios.length === 0) return 0
    const inicio = new Date(Math.min(...inicios))
    const agora = new Date()
    return (agora.getFullYear() - inicio.getFullYear()) * 12 + (agora.getMonth() - inicio.getMonth())
}

function Estatistica({ valor, rotulo }) {
    const contado = useContagem(valor)
    return (
        <div className={styles.estatistica}>
            <strong>{contado}</strong>
            <span>{rotulo}</span>
        </div>
    )
}

function Heroi() {
    const [agora, setAgora] = useState(() => new Date())
    const papel = useDigitacao(PAPEIS)
    const github = useGithub()

    useEffect(() => {
        const intervalo = setInterval(() => setAgora(new Date()), 1000)
        return () => clearInterval(intervalo)
    }, [])

    const irParaSecao = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

    const todasTecnologias = useMemo(() => habilidades.filter((habilidade) => habilidade.urlImage && habilidade.name !== 'GitHub'), [])
    const { passo, itens: tecnologias } = useCarrossel(todasTecnologias, 5, 2000)
    const total = tecnologias.length
    const indiceFrontal = ((passo % total) + total) % total
    const frontal = tecnologias[indiceFrontal]

    const estiloSatelite = (indice) => {
        const angulo = ((indice - passo) * 2 * Math.PI) / total
        const profundidade = Math.cos(angulo)
        const destaque = indice === indiceFrontal
        const escala = destaque ? 1.8 : 0.55 + 0.35 * ((profundidade + 1) / 2)
        return {
            transform: `translate(calc(-50% + var(--raio-x) * ${Math.sin(angulo).toFixed(4)}), calc(-50% + var(--raio-y) * ${profundidade.toFixed(4)})) scale(${escala.toFixed(3)})`,
            opacity: destaque ? 1 : 0.25 + 0.5 * ((profundidade + 1) / 2),
            zIndex: destaque ? 20 : Math.round((profundidade + 1) * 5),
        }
    }
    const ultimaAtividade = github?.ultimoPush
        ? formatDistanceToNowStrict(new Date(github.ultimoPush), { addSuffix: true, locale: ptBR })
        : null

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
                            href="https://github.com/petersonwilliam-dev"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FaGithub /> GitHub
                        </a>
                    </div>
                </div>

                <aside className={styles.orbita} aria-label="Tecnologias que utilizo">
                    <div className={styles.carrossel}>
                        {tecnologias.map((tecnologia, indice) => (
                            <span
                                key={indice}
                                className={`${styles.satelite} ${indice === indiceFrontal ? styles.frontal : ''}`}
                                style={estiloSatelite(indice)}
                            >
                                <img key={tecnologia.name} src={tecnologia.urlImage} alt={tecnologia.name} title={tecnologia.name} />
                            </span>
                        ))}
                    </div>
                    <p className={styles.nomeTecnologia} aria-live="off">{frontal.name}</p>
                    <div className={`${styles.selo} ${styles.seloHora}`}>
                        <span>{formatadorHora.format(agora)}</span>
                        <small>Brasília</small>
                    </div>
                    <div className={`${styles.selo} ${styles.seloGithub}`}>
                        <FaGithub aria-hidden="true" />
                        <span>{github ? `${github.repositorios} repositórios` : 'GitHub'}</span>
                        {github?.ultimoRepositorio && <small>{github.ultimoRepositorio} · {ultimaAtividade}</small>}
                    </div>
                </aside>
            </div>

            <div className={styles.estatisticas}>
                <Estatistica valor={projetos.length} rotulo="Projetos" />
                <Estatistica valor={habilidades.length} rotulo="Tecnologias" />
                <Estatistica valor={mesesDeExperiencia()} rotulo="Meses de experiência" />
            </div>
        </section>
    )
}

export default Heroi
