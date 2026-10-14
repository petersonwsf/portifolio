import { useEffect, useState } from 'react'

/**
 * Carrossel com `quantidade` itens visíveis de `lista`. A cada `intervalo` ms avança um passo
 * e troca por um item inédito o que acabou de ficar nos fundos do anel.
 * Parado com `prefers-reduced-motion`.
 */
function useCarrossel(lista, quantidade = 6, intervalo = 2000) {
    const total = Math.min(quantidade, lista.length)
    const [passo, setPasso] = useState(0)
    const [indices, setIndices] = useState(() => Array.from({ length: total }, (_, i) => i))

    useEffect(() => {
        const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (reduzirMovimento) return undefined

        const temporizador = setInterval(() => {
            setPasso((atual) => {
                const proximo = atual + 1
                if (lista.length > total) {
                    const fundo = (proximo + Math.floor(total / 2)) % total
                    setIndices((atuais) => {
                        const ausentes = lista.map((_, i) => i).filter((i) => !atuais.includes(i))
                        const novo = ausentes[Math.floor(Math.random() * ausentes.length)]
                        return atuais.map((indice, posicao) => (posicao === fundo ? novo : indice))
                    })
                }
                return proximo
            })
        }, intervalo)

        return () => clearInterval(temporizador)
    }, [lista, total, intervalo])

    return { passo, itens: indices.map((i) => lista[i]) }
}

export default useCarrossel
