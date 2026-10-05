import { WHATSAPP_NUMBER } from '../config'

export type Pedido = {
  evento?: string
  data?: string
  convidados?: string
  tema?: string
  servicos: string[]
}

const formatDate = (iso?: string) => {
  if (!iso) return 'A definir'
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

export function buildWhatsAppMessage(p: Pedido) {
  const servicos = p.servicos.length ? p.servicos.map((s) => `• ${s}`).join('\n') : '• Ainda estou decidindo'
  return [
    'Olá, Tayná Festas! Gostaria de solicitar um orçamento.',
    '',
    `Evento: ${p.evento || 'A definir'}`,
    `Data: ${formatDate(p.data)}`,
    `Convidados: ${p.convidados || 'A definir'}`,
    `Tema: ${p.tema?.trim() || 'Ainda não escolhi'}`,
    '',
    'Tenho interesse em:',
    servicos,
    '',
    'Encontrei vocês pelo site.',
  ].join('\n')
}

/** Gera o link do WhatsApp com a mensagem codificada. */
export function whatsAppUrl(message: string) {
  const number = WHATSAPP_NUMBER.replace(/\D/g, '')
  const text = encodeURIComponent(message)
  return number ? `https://wa.me/${number}?text=${text}` : `https://wa.me/?text=${text}`
}

export const quickQuoteUrl = () =>
  whatsAppUrl('Olá, Tayná Festas! Gostaria de solicitar um orçamento. Encontrei vocês pelo site.')
