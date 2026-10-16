import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const formatarMes = (data) => {
    // as datas chegam em UTC (meia-noite); usa os campos UTC para não recuar um dia/mês
    const referencia = new Date(data)
    const local = new Date(referencia.getUTCFullYear(), referencia.getUTCMonth(), referencia.getUTCDate())
    const texto = format(local, 'MMM/yyyy', { locale: ptBR })
    return texto.charAt(0).toUpperCase() + texto.slice(1)
}

/** "Jul/2025 - atual" ou "Fev/2024 - Fev/2025". */
export function formatarPeriodo(dataInicio, dataFim) {
    return `${formatarMes(dataInicio)} - ${dataFim ? formatarMes(dataFim) : 'atual'}`
}
