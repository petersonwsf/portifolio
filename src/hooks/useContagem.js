import { useEffect, useState } from 'react'

/** Anima um número de 0 até `alvo` ao longo de `duracao` ms. */
function useContagem(alvo, duracao = 1400) {
    const [valor, setValor] = useState(0)

    useEffect(() => {
        let quadro
        const inicio = performance.now()

        const animar = (agora) => {
            const progresso = Math.min((agora - inicio) / duracao, 1)
            const suavizado = 1 - Math.pow(1 - progresso, 3)
            setValor(Math.round(alvo * suavizado))
            if (progresso < 1) quadro = requestAnimationFrame(animar)
        }

        quadro = requestAnimationFrame(animar)
        return () => cancelAnimationFrame(quadro)
    }, [alvo, duracao])

    return valor
}

export default useContagem
