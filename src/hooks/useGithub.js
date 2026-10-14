import { useEffect, useState } from 'react'

const USUARIO = 'petersonwilliam-dev'

/** Busca dados públicos do GitHub; em caso de falha retorna `null` (a interface usa um fallback). */
function useGithub() {
    const [dados, setDados] = useState(null)

    useEffect(() => {
        const controlador = new AbortController()

        const carregar = async () => {
            try {
                const [perfil, repositorios] = await Promise.all([
                    fetch(`https://api.github.com/users/${USUARIO}`, { signal: controlador.signal }),
                    fetch(`https://api.github.com/users/${USUARIO}/repos?sort=pushed&per_page=1`, { signal: controlador.signal }),
                ])
                if (!perfil.ok || !repositorios.ok) return
                const dadosPerfil = await perfil.json()
                const [ultimo] = await repositorios.json()
                setDados({
                    repositorios: dadosPerfil.public_repos,
                    ultimoRepositorio: ultimo?.name ?? null,
                    ultimoPush: ultimo?.pushed_at ?? null,
                })
            } catch {
                // sem conexão ou limite da API: mantém o fallback
            }
        }

        carregar()
        return () => controlador.abort()
    }, [])

    return dados
}

export default useGithub
