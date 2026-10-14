import { useEffect, useState } from 'react'

/**
 * Efeito de máquina de escrever que alterna entre várias frases.
 * Respeita `prefers-reduced-motion` exibindo a primeira frase estática.
 */
function useDigitacao(frases, { velocidade = 70, apagar = 35, pausa = 1600 } = {}) {
    const [texto, setTexto] = useState('')

    useEffect(() => {
        const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (reduzirMovimento) {
            setTexto(frases[0])
            return undefined
        }

        let indice = 0
        let posicao = 0
        let apagando = false
        let temporizador

        const passo = () => {
            const frase = frases[indice]
            posicao += apagando ? -1 : 1
            setTexto(frase.slice(0, posicao))

            let espera = apagando ? apagar : velocidade
            if (!apagando && posicao === frase.length) {
                apagando = true
                espera = pausa
            } else if (apagando && posicao === 0) {
                apagando = false
                indice = (indice + 1) % frases.length
                espera = 400
            }
            temporizador = setTimeout(passo, espera)
        }

        temporizador = setTimeout(passo, velocidade)
        return () => clearTimeout(temporizador)
    }, [frases, velocidade, apagar, pausa])

    return texto
}

export default useDigitacao
