import { useEffect, useMemo, useState } from 'react'
import { carregarConteudo } from '../services/conteudo'
import { ContextoConteudo } from './conteudoContexto'

const VAZIO = { projetos: [], experiencias: [], habilidades: [] }

/** Busca o conteúdo do backend uma única vez e o compartilha com todas as seções. */
export function ProvedorConteudo({ children }) {
    const [dados, setDados] = useState(VAZIO)
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState(null)

    useEffect(() => {
        let ativo = true
        carregarConteudo()
            .then((conteudo) => {
                if (ativo) setDados(conteudo)
            })
            .catch((falha) => {
                if (ativo) setErro(falha.message)
            })
            .finally(() => {
                if (ativo) setCarregando(false)
            })
        return () => {
            ativo = false
        }
    }, [])

    const valor = useMemo(() => ({ ...dados, carregando, erro }), [dados, carregando, erro])
    return <ContextoConteudo.Provider value={valor}>{children}</ContextoConteudo.Provider>
}
