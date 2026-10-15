import { FaDesktop, FaServer, FaInfinity, FaDatabase, FaToolbox } from 'react-icons/fa'
import { useConteudo } from '../../hooks/useConteudo'
import CardCategoriaHabilidades from '../Card/CardCategoriaHabilidades'
import EstadoConteudo from '../layout/EstadoConteudo'
import SecaoEscura from '../layout/SecaoEscura'
import styles from './Skills.module.css'

const CATEGORIAS = [
    { nome: 'Frontend', icone: <FaDesktop /> },
    { nome: 'Backend', icone: <FaServer /> },
    { nome: 'DevOps', icone: <FaInfinity /> },
    { nome: 'Dados', icone: <FaDatabase /> },
    { nome: 'Outros', icone: <FaToolbox /> },
]

function Skills() {
    const { habilidades, carregando, erro } = useConteudo()

    return (
        <SecaoEscura id="skills" etiqueta="<stack />" titulo="Tecnologias">
            <EstadoConteudo
                carregando={carregando}
                erro={erro}
                vazio={habilidades.length === 0}
                mensagemVazia="Nenhuma tecnologia cadastrada."
            >
                <div className={styles.categorias}>
                    {CATEGORIAS.map(({ nome, icone }) => {
                        const doGrupo = habilidades.filter((habilidade) => habilidade.categoria === nome)
                        if (doGrupo.length === 0) return null
                        return (
                            <CardCategoriaHabilidades key={nome} titulo={nome} icone={icone} habilidades={doGrupo} />
                        )
                    })}
                </div>
            </EstadoConteudo>
        </SecaoEscura>
    )
}

export default Skills
