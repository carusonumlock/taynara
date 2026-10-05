import { useMemo, useState } from 'react'
import { buildWhatsAppMessage, whatsAppUrl } from '../lib/whatsapp'
import { Button } from './Button'
import { Lines } from './Lines'

const EVENTOS = ['Aniversário', 'Infantil', '15 anos', 'Casamento', 'Chá de bebê', 'Corporativo', 'Outro']
const SERVICOS = ['Personalizados', 'Decoração', 'Buffet']
const CONVIDADOS = ['Até 30', '30–60', '60–100', '100–150', '150+']
const TOTAL = 6

type State = {
  evento: string
  servicos: string[]
  convidados: string
  data: string
  semData: boolean
  tema: string
}

const todayISO = () => {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}

const formatDate = (iso: string) => {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

export function Wizard() {
  const [step, setStep] = useState(1)
  const [dir, setDir] = useState<1 | -1>(1)
  const [s, setS] = useState<State>({ evento: '', servicos: [], convidados: '', data: '', semData: false, tema: '' })

  const completa = s.servicos.length === SERVICOS.length
  const canNext =
    (step === 1 && !!s.evento) ||
    (step === 2 && s.servicos.length > 0) ||
    (step === 3 && !!s.convidados) ||
    step === 4 ||
    step === 5

  const go = (to: number) => {
    setDir(to > step ? 1 : -1)
    setStep(Math.max(1, Math.min(TOTAL, to)))
  }

  const pickAndAdvance = (patch: Partial<State>) => {
    setS((v) => ({ ...v, ...patch }))
    window.setTimeout(() => go(step + 1), 260)
  }

  const toggleServico = (name: string) =>
    setS((v) => ({
      ...v,
      servicos: v.servicos.includes(name) ? v.servicos.filter((x) => x !== name) : SERVICOS.filter((x) => x === name || v.servicos.includes(x)),
    }))

  const href = useMemo(
    () =>
      whatsAppUrl(
        buildWhatsAppMessage({
          evento: s.evento,
          data: s.semData ? '' : s.data,
          convidados: s.convidados,
          tema: s.tema,
          servicos: s.servicos,
        }),
      ),
    [s],
  )

  return (
    <section id="monte-sua-festa" className="wizard sheet sheet--light" data-header="light">
      <div className="wizard__head">
        <p className="eyebrow eyebrow--plum" data-reveal="fade">Monte sua festa</p>
        <Lines className="display wizard__title" lines={['Do primeiro detalhe', <em key="e">à festa completa.</em>]} />
        <p className="lead" data-reveal="fade">Algumas respostas rápidas e o seu pré-orçamento chega pronto no WhatsApp.</p>
      </div>

      <div className="wizard__card" data-reveal="fade">
        <div className="wizard__bar">
          <span>
            Etapa <b>{String(step).padStart(2, '0')}</b> de {String(TOTAL).padStart(2, '0')}
          </span>
          <div className="wizard__progress" aria-hidden="true">
            <i style={{ transform: `scaleX(${step / TOTAL})` }} />
          </div>
        </div>

        <div className={`wizard__panel wizard__panel--${dir > 0 ? 'fwd' : 'back'}`} key={step}>
          {step === 1 && (
            <fieldset>
              <legend className="wizard__q">Qual é o seu evento?</legend>
              <div className="chips">
                {EVENTOS.map((e) => (
                  <button key={e} type="button" className={`chip ${s.evento === e ? 'is-on' : ''}`} aria-pressed={s.evento === e} onClick={() => pickAndAdvance({ evento: e })}>
                    {e}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {step === 2 && (
            <fieldset>
              <legend className="wizard__q">Do que você precisa?</legend>
              <p className="wizard__hint">Pode escolher mais de um.</p>
              <div className="chips chips--services">
                {SERVICOS.map((x) => {
                  const on = s.servicos.includes(x)
                  return (
                    <button key={x} type="button" className={`chip chip--big ${on ? 'is-on' : ''}`} aria-pressed={on} onClick={() => toggleServico(x)}>
                      <span className="chip__check" aria-hidden="true">{on ? '✓' : '+'}</span>
                      {x}
                    </button>
                  )
                })}
              </div>
              <div className={`completa ${completa ? 'is-on' : ''}`} aria-live="polite">
                {completa && (
                  <>
                    <strong>✨ Festa completa</strong>
                    <span>Você deixa a ideia com a gente e nós cuidamos do restante.</span>
                  </>
                )}
              </div>
            </fieldset>
          )}

          {step === 3 && (
            <fieldset>
              <legend className="wizard__q">Quantos convidados?</legend>
              <div className="chips">
                {CONVIDADOS.map((c) => (
                  <button key={c} type="button" className={`chip ${s.convidados === c ? 'is-on' : ''}`} aria-pressed={s.convidados === c} onClick={() => pickAndAdvance({ convidados: c })}>
                    {c}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {step === 4 && (
            <fieldset>
              <legend className="wizard__q">Quando será?</legend>
              <label className="field">
                <span>Data do evento</span>
                <input
                  type="date"
                  min={todayISO()}
                  value={s.data}
                  disabled={s.semData}
                  onChange={(e) => setS((v) => ({ ...v, data: e.target.value }))}
                />
              </label>
              <label className="check">
                <input type="checkbox" checked={s.semData} onChange={(e) => setS((v) => ({ ...v, semData: e.target.checked }))} />
                <span>Ainda não tenho a data definida</span>
              </label>
            </fieldset>
          )}

          {step === 5 && (
            <fieldset>
              <legend className="wizard__q">Já escolheu o tema?</legend>
              <label className="field">
                <span>Tema ou ideia da festa</span>
                <input
                  type="text"
                  placeholder="Ex.: Jardim, Mickey Realeza, roxo e prata…"
                  value={s.tema}
                  maxLength={120}
                  onChange={(e) => setS((v) => ({ ...v, tema: e.target.value }))}
                  onKeyDown={(e) => e.key === 'Enter' && go(6)}
                />
              </label>
              <p className="wizard__hint">Se ainda não sabe, tudo bem — a gente ajuda a escolher.</p>
            </fieldset>
          )}

          {step === 6 && (
            <div className="summary">
              <p className="eyebrow eyebrow--plum">Sua festa</p>
              <dl>
                <div><dt>Evento</dt><dd>{s.evento} <button type="button" onClick={() => go(1)}>editar</button></dd></div>
                <div><dt>Data</dt><dd>{s.semData || !s.data ? 'A definir' : formatDate(s.data)} <button type="button" onClick={() => go(4)}>editar</button></dd></div>
                <div><dt>Convidados</dt><dd>{s.convidados} <button type="button" onClick={() => go(3)}>editar</button></dd></div>
                <div><dt>Tema</dt><dd>{s.tema.trim() || 'Ainda não escolhido'} <button type="button" onClick={() => go(5)}>editar</button></dd></div>
                <div className="summary__services">
                  <dt>Serviços</dt>
                  <dd>
                    <ul>{s.servicos.map((x) => <li key={x}>✓ {x}</li>)}</ul>
                    <button type="button" onClick={() => go(2)}>editar</button>
                  </dd>
                </div>
              </dl>
              {completa && <p className="summary__badge">✨ Festa completa</p>}
              <Button variant="gold" href={href} external className="btn--xl">Receber orçamento pelo WhatsApp</Button>
            </div>
          )}
        </div>

        {step < TOTAL && (
          <div className="wizard__nav">
            <button type="button" className="link-btn" onClick={() => go(step - 1)} disabled={step === 1}>
              ← Voltar
            </button>
            <Button variant="primary" onClick={() => go(step + 1)} disabled={!canNext} magnetic={false}>
              {step === 5 ? 'Ver resumo' : step === 4 && !s.data && !s.semData ? 'Pular' : 'Continuar'}
            </Button>
          </div>
        )}
        {step === TOTAL && (
          <div className="wizard__nav wizard__nav--end">
            <button type="button" className="link-btn" onClick={() => go(5)}>← Voltar</button>
          </div>
        )}
      </div>
    </section>
  )
}
