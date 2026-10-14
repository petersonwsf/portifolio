import { useEffect, useMemo, useRef, useState } from 'react'
import { FaGithub, FaArrowDown, FaCircle } from 'react-icons/fa'
import { formatDistanceToNowStrict } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import useDigitacao from '../../hooks/useDigitacao'
import useContagem from '../../hooks/useContagem'
import useGithub from '../../hooks/useGithub'
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
    const secaoRef = useRef(null)
    const [agora, setAgora] = useState(() => new Date())
    const papel = useDigitacao(PAPEIS)
    const github = useGithub()

    useEffect(() => {
        const intervalo = setInterval(() => setAgora(new Date()), 1000)
        return () => clearInterval(intervalo)
    }, [])

    const aoMoverMouse = (evento) => {
        const secao = secaoRef.current
        if (!secao) return
        const caixa = secao.getBoundingClientRect()
        const x = evento.clientX - caixa.left
        const y = evento.clientY - caixa.top
        secao.style.setProperty('--mouse-x', `${x}px`)
        secao.style.setProperty('--mouse-y', `${y}px`)
        secao.style.setProperty('--inclinacao-x', `${(x / caixa.width - 0.5) * 8}deg`)
        secao.style.setProperty('--inclinacao-y', `${(0.5 - y / caixa.height) * 8}deg`)
    }

    const irParaSecao = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

    const tecnologias = useMemo(() => habilidades.map((habilidade) => habilidade.name), [])
    const ultimaAtividade = github?.ultimoPush
        ? formatDistanceToNowStrict(new Date(github.ultimoPush), { addSuffix: true, locale: ptBR })
        : null

    return (
        <section id="hero" ref={secaoRef} className={styles.heroi} onMouseMove={aoMoverMouse}>
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

                <aside className={styles.painel} aria-label="Painel dinâmico">
                    <div className={styles.painelTopo}>
                        <span className={styles.ponto} />
                        <span className={styles.ponto} />
                        <span className={styles.ponto} />
                        <span className={styles.aoVivo}><FaCircle aria-hidden="true" /> ao vivo</span>
                    </div>
                    <div className={styles.painelCorpo}>
                        <p>
                            <span className={styles.chave}>horario</span>: <span className={styles.valor}>{formatadorHora.format(agora)}</span>
                            <span className={styles.dica}> // Brasília</span>
                        </p>
                        <p>
                            <span className={styles.chave}>status</span>: <span className={styles.valor}>"disponível para projetos"</span>
                        </p>
                        <p>
                            <span className={styles.chave}>repositorios</span>:{' '}
                            <span className={styles.valor}>{github ? github.repositorios : '...'}</span>
                        </p>
                        <p>
                            <span className={styles.chave}>ultimoCommit</span>:{' '}
                            <span className={styles.valor}>
                                {github?.ultimoRepositorio ? `"${github.ultimoRepositorio}" ${ultimaAtividade}` : '"..."'}
                            </span>
                        </p>
                        <p className={styles.tecnologias}>
                            <span className={styles.chave}>stack</span>:
                        </p>
                        <ul className={styles.listaTecnologias}>
                            {tecnologias.map((nome) => (
                                <li key={nome}>{nome}</li>
                            ))}
                        </ul>
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
