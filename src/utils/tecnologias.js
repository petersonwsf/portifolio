import habilidades from '../assets/consts/skills'

const normalizar = (texto) => texto.toLowerCase().replace(/\s+/g, '')

/** Retorna a imagem da habilidade correspondente ao nome da tecnologia, ou `null` se não houver. */
export function buscarIconeTecnologia(nome) {
    const alvo = normalizar(nome)
    const habilidade = habilidades.find((item) => normalizar(item.name) === alvo)
    return habilidade ? habilidade.urlImage : null
}

/** Converte a string "A, B, C" de tecnologias em uma lista de nomes. */
export function listarTecnologias(texto) {
    return texto.split(',').map((tecnologia) => tecnologia.trim()).filter(Boolean)
}
