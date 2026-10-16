import { useCallback, useState } from 'react'
import { useConteudo } from '../../hooks/useConteudo'
import CardExperience from '../Card/CardExperience'
import CarrosselFaixa from '../Carrossel/CarrosselFaixa'
import ModalExperience from '../Modal/ModalExperience'
import EstadoConteudo from '../layout/EstadoConteudo'
import SecaoEscura from '../layout/SecaoEscura'

function Experiences() {
    const { experiencias, carregando, erro } = useConteudo()
    const [experienciaSelecionada, setExperienciaSelecionada] = useState(null)
    const fecharModal = useCallback(() => setExperienciaSelecionada(null), [])

    return (
        <SecaoEscura id="experiences" etiqueta="<trajetória />" titulo="Experiências">
            <EstadoConteudo
                carregando={carregando}
                erro={erro}
                vazio={experiencias.length === 0}
                mensagemVazia="Nenhuma experiência cadastrada."
            >
                <CarrosselFaixa rotulo="Experiências profissionais e acadêmicas">
                    {experiencias.map((experiencia) => (
                        <CardExperience
                            key={experiencia.id}
                            experiencia={experiencia}
                            aoVerDetalhes={setExperienciaSelecionada}
                        />
                    ))}
                </CarrosselFaixa>
            </EstadoConteudo>

            {experienciaSelecionada && <ModalExperience experiencia={experienciaSelecionada} aoFechar={fecharModal} />}
        </SecaoEscura>
    )
}

export default Experiences
