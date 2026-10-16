import { FaCode } from 'react-icons/fa'
import { formatarPeriodo } from '../../utils/periodo'
import ModalBase from './ModalBase'
import styles from './ModalExperience.module.css'

/** Modal com todos os dados da experiência. Props: `experiencia` e `aoFechar`. */
function ModalExperience({ experiencia, aoFechar }) {
    return (
        <ModalBase rotulo={`Detalhes da experiência em ${experiencia.empresa}`} aoFechar={aoFechar}>
            <div className={styles.topo}>
                {experiencia.imagem && (
                    <img src={experiencia.imagem} alt={`Logo ${experiencia.empresa}`} className={styles.logo} />
                )}
                <div>
                    {experiencia.categoria && <span className={styles.categoria}>{experiencia.categoria}</span>}
                    <h3 className={styles.empresa}>{experiencia.empresa}</h3>
                    <p className={styles.cargo}>{experiencia.cargo}</p>
                </div>
            </div>

            <span className={`${styles.periodo} ${experiencia.dataFim ? '' : styles.periodoAtual}`}>
                {formatarPeriodo(experiencia.dataInicio, experiencia.dataFim)}
            </span>

            <p className={styles.descricao}>{experiencia.descricao}</p>

            {experiencia.tecnologias.length > 0 && (
                <>
                    <h4 className={styles.subtitulo}>Tecnologias</h4>
                    <ul className={styles.tecnologias}>
                        {experiencia.tecnologias.map((tecnologia) => (
                            <li key={tecnologia.id}>
                                {tecnologia.imagem ? <img src={tecnologia.imagem} alt="" /> : <FaCode aria-hidden="true" />}
                                {tecnologia.nome}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </ModalBase>
    )
}

export default ModalExperience
