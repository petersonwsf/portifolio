import { useContext } from 'react'
import { ContextoConteudo } from '../contexts/conteudoContexto'

/** Retorna `{ projetos, experiencias, habilidades, carregando, erro }`. */
export function useConteudo() {
    const valor = useContext(ContextoConteudo)
    if (!valor) throw new Error('useConteudo deve ser usado dentro de ProvedorConteudo')
    return valor
}
