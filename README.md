# Tayná Festas — site (experiência por scroll)

React + Vite + TypeScript + GSAP/ScrollTrigger. Sem backend, sem login, sem pagamento.

## Rodar

```bash
npm install
npm run dev       # desenvolvimento
npm run build     # gera a pasta dist/ para publicar
npm run preview   # testa o build localmente
```

A pasta `dist/` pode ser publicada em qualquer hospedagem estática (Netlify, Vercel, Hostinger, GitHub Pages…).
O build usa caminhos relativos, então funciona também dentro de uma subpasta.

## Onde mexer

| O quê | Onde |
|---|---|
| **Número do WhatsApp** | `src/config.ts` → `WHATSAPP_NUMBER` (só dígitos, ex.: `5521999999999`) |
| **Logo** | arquivo em `src/assets/otimizadas/logo/`; caminho em `LOGO_FILE` (`src/components/Logo.tsx`) |
| **Fotos do buffet** | coloque em `src/assets/buffet/` e preencha `image` em `BUFFET` (`src/config.ts`) |
| Ordem/legendas da galeria de decoração | `DECORACOES` em `src/config.ts` |
| Ordem/legendas dos personalizados | `PRODUTOS` em `src/config.ts` |

## Fotos e vídeos

Todas as fotos e vídeos estão dentro do código, em `src/assets/` (hero, logo, personalizados, decoracao,
posters dos vídeos e `otimizadas/` com as cópias WebP leves). Os arquivos têm nomes sem acentos nem espaços
para funcionar em qualquer hospedagem; o conteúdo é o original enviado, sem alteração.
No `npm run build`, o Vite copia tudo para `dist/assets/`. Para usar um arquivo novo, coloque em `src/assets/`
e informe o caminho relativo (ex.: `'decoracao/minha-foto.png'`) em `src/config.ts`.

## Estrutura

```
src/
  config.ts              inventário dos assets, textos curtos, WHATSAPP_NUMBER
  lib/gsap.ts            registro do ScrollTrigger e media queries (desktop / mobile)
  lib/whatsapp.ts        monta e codifica a mensagem do orçamento
  components/
    Header, Hero, Concept, Personalizados, Decoracao, Buffet, Conclusao, Wizard, Footer
    Button (hover + magnetismo leve), Picture, LazyVideo, Lines, Logo, Icons, BuffetArt
  styles/global.css
```

- Desktop (≥ 900px): cenas fixadas (pin) e scrub.
- Mobile (< 900px): sem pins pesados; cards empilhados, reveals curtos e swipe nativo no buffet.
- `prefers-reduced-motion`: todo o conteúdo aparece em layout estático, sem animações de scroll.
