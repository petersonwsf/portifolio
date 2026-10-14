import { useEffect, useState } from 'react'

/** Incrementa um contador de passos a cada `intervalo` ms (parado com `prefers-reduced-motion`). */
function useCarrossel(intervalo = 2000) {
    const [passo, setPasso] = useState(0)

    useEffect(() => {
        const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (reduzirMovimento) return undefined

        const temporizador = setInterval(() => setPasso((atual) => atual + 1), intervalo)
        return () => clearInterval(temporizador)
    }, [intervalo])

    return passo
}

export default useCarrossel
