import { useCallback, useState } from 'react'
import { useConteudo } from '../../hooks/useConteudo'
import CardProject from '../Card/CardProject'
import CarrosselFaixa from '../Carrossel/CarrosselFaixa'
import ModalProject from '../Modal/ModalProject'
import EstadoConteudo from '../layout/EstadoConteudo'
import SecaoEscura from '../layout/SecaoEscura'

function Projects() {
    const { projetos, carregando, erro } = useConteudo()
    const [projetoSelecionado, setProjetoSelecionado] = useState(null)
    const fecharModal = useCallback(() => setProjetoSelecionado(null), [])

    return (
        <SecaoEscura id="projects" etiqueta="<projetos />" titulo="Projetos">
            <EstadoConteudo
                carregando={carregando}
                erro={erro}
                vazio={projetos.length === 0}
                mensagemVazia="Nenhum projeto cadastrado."
            >
                <CarrosselFaixa rotulo="Projetos">
                    {projetos.map((projeto) => (
                        <CardProject key={projeto.id} projeto={projeto} aoVerDetalhes={setProjetoSelecionado} />
                    ))}
                </CarrosselFaixa>
            </EstadoConteudo>

            {projetoSelecionado && <ModalProject projeto={projetoSelecionado} aoFechar={fecharModal} />}
        </SecaoEscura>
    )
}

export default Projects
