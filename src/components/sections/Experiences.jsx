import { useConteudo } from '../../hooks/useConteudo'
import CardExperience from '../Card/CardExperience'
import Carrossel from '../Carrossel/Carrossel'
import EstadoConteudo from '../layout/EstadoConteudo'
import SecaoEscura from '../layout/SecaoEscura'

function Experiences() {
    const { experiencias, carregando, erro } = useConteudo()

    return (
        <SecaoEscura id="experiences" etiqueta="<trajetória />" titulo="Experiências">
            <EstadoConteudo
                carregando={carregando}
                erro={erro}
                vazio={experiencias.length === 0}
                mensagemVazia="Nenhuma experiência cadastrada."
            >
                <Carrossel rotulo="Experiências profissionais">
                    {experiencias.map((experiencia) => (
                        <CardExperience key={experiencia.id} experiencia={experiencia} />
                    ))}
                </Carrossel>
            </EstadoConteudo>
        </SecaoEscura>
    )
}

export default Experiences
