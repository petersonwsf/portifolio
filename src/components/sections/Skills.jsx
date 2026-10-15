import { FaDesktop, FaServer, FaInfinity, FaDatabase, FaToolbox } from 'react-icons/fa'
import skills from '../../assets/consts/skills'
import CardCategoriaHabilidades from '../Card/CardCategoriaHabilidades'
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
    return (
        <SecaoEscura id="skills" etiqueta="<stack />" titulo="Habilidades">
            <div className={styles.categorias}>
                {CATEGORIAS.map(({ nome, icone }) => {
                    const habilidades = skills.filter((skill) => skill.categoria === nome)
                    if (habilidades.length === 0) return null
                    return (
                        <CardCategoriaHabilidades
                            key={nome}
                            titulo={nome}
                            icone={icone}
                            habilidades={habilidades}
                        />
                    )
                })}
            </div>
        </SecaoEscura>
    )
}

export default Skills
