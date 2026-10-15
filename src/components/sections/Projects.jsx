import { useCallback, useState } from 'react'
import projects from '../../assets/consts/projects'
import CardProject from '../Card/CardProject'
import CarrosselLoop from '../Carrossel/CarrosselLoop'
import ModalProject from '../Modal/ModalProject'
import SecaoEscura from '../layout/SecaoEscura'

function Projects() {
    const [projetoSelecionado, setProjetoSelecionado] = useState(null)
    const fecharModal = useCallback(() => setProjetoSelecionado(null), [])

    return (
        <SecaoEscura id="projects" etiqueta="<projetos />" titulo="Projetos">
            <CarrosselLoop rotulo="Projetos" duracao={60}>
                {projects.map((project) => (
                    <CardProject key={project.id} project={project} aoVerDetalhes={setProjetoSelecionado} />
                ))}
            </CarrosselLoop>

            {projetoSelecionado && <ModalProject project={projetoSelecionado} aoFechar={fecharModal} />}
        </SecaoEscura>
    )
}

export default Projects
