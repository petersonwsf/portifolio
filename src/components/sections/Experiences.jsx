import experiences from '../../assets/consts/experiences'
import CardExperience from '../Card/CardExperience'
import Carrossel from '../Carrossel/Carrossel'
import SecaoEscura from '../layout/SecaoEscura'

function Experiences() {
    return (
        <SecaoEscura id="experiences" etiqueta="<trajetória />" titulo="Experiências">
            <Carrossel rotulo="Experiências profissionais">
                {experiences.map((experience) => (
                    <CardExperience key={`${experience.name}-${experience.startDate.getTime()}`} experience={experience} />
                ))}
            </Carrossel>
        </SecaoEscura>
    )
}

export default Experiences
