import { useCallback, useState } from 'react'
import projects from '../../assets/consts/projects'
import CardProject from '../Card/CardProject'
import CarrosselFaixa from '../Carrossel/CarrosselFaixa'
import ModalProject from '../Modal/ModalProject'
import SecaoEscura from '../layout/SecaoEscura'

function Projects() {
    const [projetoSelecionado, setProjetoSelecionado] = useState(null)
    const fecharModal = useCallback(() => setProjetoSelecionado(null), [])

    return (
        <SecaoEscura id="projects" etiqueta="<projetos />" titulo="Projetos">
            <CarrosselFaixa rotulo="Projetos">
                {projects.map((project) => (
                    <CardProject key={project.id} project={project} aoVerDetalhes={setProjetoSelecionado} />
                ))}
            </CarrosselFaixa>

            {projetoSelecionado && <ModalProject project={projetoSelecionado} aoFechar={fecharModal} />}
        </SecaoEscura>
    )
}

export default Projects
