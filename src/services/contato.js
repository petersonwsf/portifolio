/**
 * Envia a mensagem do formulário de contato.
 *
 * TODO: integrar com o backend (rota que dispara o e-mail). Por enquanto apenas simula
 * o envio, sem enviar nada de fato.
 */
export async function enviarContato(dados) {
    await new Promise((resolver) => setTimeout(resolver, 900))
    return { sucesso: true, mensagem: 'Mensagem enviada com sucesso!', dados }
}
