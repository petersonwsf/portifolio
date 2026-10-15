import experiences from '../../assets/consts/experiences'
import CardExperience from '../Card/CardExperience'
import Carrossel from '../Carrossel/Carrossel'

function Experiences() {
    return (
        <section id="experiences" className='section_black'>
            <h2 className='display-6 title_white'>Experiências</h2>
            <Carrossel rotulo="Experiências profissionais">
                {experiences.map((experience) => (
                    <CardExperience key={`${experience.name}-${experience.startDate.getTime()}`} experience={experience} />
                ))}
            </Carrossel>
        </section>
    )
}

export default Experiences
