const URL_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3333/api'

async function buscarJson(caminho) {
    let resposta
    try {
        resposta = await fetch(`${URL_BASE}${caminho}`)
    } catch {
        throw new Error('Não foi possível conectar ao servidor.')
    }
    if (!resposta.ok) throw new Error('Não foi possível carregar o conteúdo.')
    return resposta.json()
}

/** Carrega do backend o conteúdo exibido no site: projetos, experiências e habilidades. */
export async function carregarConteudo() {
    const [projetos, experiencias, habilidades] = await Promise.all([
        buscarJson('/projetos'),
        buscarJson('/experiencias'),
        buscarJson('/habilidades'),
    ])
    return { projetos, experiencias, habilidades }
}
