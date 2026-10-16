import { useEffect, useState } from 'react'

/**
 * Exibe `quantidade` itens de `lista` e, a cada `intervalo` ms, troca um deles
 * (em sequência, pelas posições) por outro que não está visível.
 * Parado com `prefers-reduced-motion`.
 */
function useRodizio(lista, quantidade = 8, intervalo = 2500) {
    const total = Math.min(quantidade, lista.length)
    const [passo, setPasso] = useState(0)
    const [indices, setIndices] = useState(() => Array.from({ length: total }, (_, i) => i))
    const [listaBase, setListaBase] = useState(lista)

    // a lista pode chegar depois (dados vindos da API): reinicia a seleção quando ela mudar
    if (listaBase !== lista) {
        setListaBase(lista)
        setIndices(Array.from({ length: total }, (_, i) => i))
        setPasso(0)
    }

    useEffect(() => {
        if (lista.length <= total) return undefined
        const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (reduzirMovimento) return undefined

        const temporizador = setInterval(() => setPasso((atual) => atual + 1), intervalo)
        return () => clearInterval(temporizador)
    }, [lista, total, intervalo])

    useEffect(() => {
        if (passo === 0 || total === 0) return
        const posicao = (passo - 1) % total
        setIndices((atuais) => {
            const ausentes = lista.map((_, i) => i).filter((i) => !atuais.includes(i))
            const novo = ausentes[Math.floor(Math.random() * ausentes.length)]
            return atuais.map((indice, i) => (i === posicao ? novo : indice))
        })
    }, [passo, lista, total])

    return indices.map((i) => lista[i])
}

export default useRodizio
