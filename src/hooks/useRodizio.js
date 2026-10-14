import { useEffect, useState } from 'react'

/**
 * Exibe `quantidade` itens de `lista` e troca um deles a cada `intervalo` ms,
 * em rodízio entre as posições. Retorna os itens visíveis e o último que entrou.
 */
function useRodizio(lista, quantidade = 8, intervalo = 2500) {
    const total = Math.min(quantidade, lista.length)
    const [indices, setIndices] = useState(() => Array.from({ length: total }, (_, i) => i))
    const [posicao, setPosicao] = useState(0)

    useEffect(() => {
        if (lista.length <= total) return undefined
        const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (reduzirMovimento) return undefined

        const temporizador = setInterval(() => {
            setIndices((atuais) => {
                const ausentes = lista.map((_, i) => i).filter((i) => !atuais.includes(i))
                const novo = ausentes[Math.floor(Math.random() * ausentes.length)]
                const proximos = [...atuais]
                proximos[posicao % total] = novo
                return proximos
            })
            setPosicao((atual) => (atual + 1) % total)
        }, intervalo)

        return () => clearInterval(temporizador)
    }, [lista, total, intervalo, posicao])

    const itens = indices.map((i) => lista[i])
    const ultimo = lista.length > total ? itens[(posicao + total - 1) % total] : itens[0]
    return { itens, ultimo }
}

export default useRodizio
