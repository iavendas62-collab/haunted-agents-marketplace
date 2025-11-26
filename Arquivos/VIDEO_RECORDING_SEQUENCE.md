# 🎬 SEQUÊNCIA DE GRAVAÇÃO - ARQUIVOS PARA ABRIR

## 📋 PREPARAÇÃO

### PASSO 1: FECHAR TUDO
**Feche TODAS as abas abertas no Kiro IDE**
- Ctrl+K W (fechar todas as abas)
- Ou feche manualmente uma por uma

### PASSO 2: LIMPAR TERMINAL
- Abra o terminal (Ctrl+`)
- Digite: `cls` (Windows) ou `clear` (Mac/Linux)
- Feche o terminal (Ctrl+`)

### PASSO 3: POSICIONAR SIDEBAR
- Certifique-se que a sidebar está aberta (Ctrl+B se necessário)
- Navegue até a pasta `.kiro/specs/haunted-agents-marketplace/`
- Expanda essa pasta para mostrar os 3 arquivos

---

## 🎯 ARQUIVOS PARA ABRIR (NA ORDEM)

### ✅ ARQUIVO 1: Requirements (0-10s)
**Caminho:** `.kiro/specs/haunted-agents-marketplace/requirements.md`

**Quando abrir:** Logo no início da gravação (2s)

**O que mostrar:**
- Título: "# Requirements Document"
- Seção Glossary
- Requirements com User Stories
- Acceptance Criteria

**Ação:** Scroll suave de cima para baixo

---

### ✅ ARQUIVO 2: Design (10-18s)
**Caminho:** `.kiro/specs/haunted-agents-marketplace/design.md`

**Quando abrir:** Aos 10 segundos

**O que mostrar:**
- Scroll direto até "## Correctness Properties"
- Property 1: Bundle Completeness
- Property 2: Configuration Validity
- ...
- Property 9: Component Installation

**Ação:** Scroll até properties, destacar algumas

---

### ✅ ARQUIVO 3: Property Test (Opcional - se quiser mostrar código)
**Caminho:** `skeleton/cli/src/core/registry.property.test.ts`

**Quando abrir:** Opcional, se tiver tempo extra

**O que mostrar:**
- Código de uma property test
- Comentário "**Feature: haunted-agents-marketplace, Property 1**"
- fc.assert() com 100 runs

---

## 🖥️ TERMINAL

### Quando abrir: 18 segundos

**COMANDOS PARA EXECUTAR (NA ORDEM):**

```bash
# 1. Navegar para a pasta do CLI (se não estiver lá)
cd skeleton/cli

# 2. Rodar os testes
npm test
```

**OU, se preferir rodar tudo de uma vez:**
```bash
cd skeleton/cli & npm test
```

**Preparação ANTES de gravar:**
- Abra o terminal (Ctrl+`)
- Execute: `cd skeleton/cli`
- Execute: `cls` para limpar
- Feche o terminal (Ctrl+`)
- Durante a gravação, abra novamente e digite: `npm test`

**Alternativa (mais rápido na gravação):**
- Deixe o terminal já posicionado em `skeleton/cli`
- Durante a gravação, só digite: `npm test`

---

## 📝 CHECKLIST DE GRAVAÇÃO

### Antes de Gravar:
- [ ] Todas as abas fechadas
- [ ] Terminal limpo
- [ ] Sidebar aberta em `.kiro/specs/haunted-agents-marketplace/`
- [ ] Zoom do editor: 125%
- [ ] Fonte do terminal: 16-18pt
- [ ] Tema dark ativado
- [ ] Notificações desabilitadas

### Arquivos que vão aparecer (na ordem):
1. [ ] `requirements.md` (0-10s)
2. [ ] `design.md` (10-18s)
3. [ ] Terminal com `npm test` (18-30s)

### Arquivos que NÃO precisa abrir:
- ❌ tasks.md
- ❌ Nenhum arquivo de código (a menos que queira mostrar)
- ❌ Nenhum arquivo de configuração
- ❌ Nenhum README

---

## 🎬 ROTEIRO SIMPLIFICADO

```
0s  → Sidebar visível (.kiro/specs/)
2s  → Clicar em requirements.md
5s  → Scroll mostrando requirements
10s → Clicar em design.md
12s → Scroll até "Correctness Properties"
15s → Destacar Property 1, Property 9
18s → Abrir terminal (Ctrl+`)
20s → Digitar: npm test
22s → Testes rodando
25s → Output: ✓ Property 1 (100 runs)
28s → Todos os testes passam (verde)
30s → FIM
```

---

## 💡 DICAS

### Para Scroll Suave:
- Use Page Down (mais suave que scroll do mouse)
- Ou use setas ↓ (ainda mais suave)

### Para Destacar Texto:
- Ctrl+F para buscar "Property 1"
- Enter para ir até o texto
- Esc para fechar busca
- Texto fica destacado

### Para Terminal:
- Ctrl+` abre/fecha terminal
- Terminal abre na parte inferior
- Certifique-se que está em `skeleton/cli`

---

## 🎯 ESTADO FINAL DA TELA

Ao final da gravação (30s), sua tela deve mostrar:

```
┌─────────────────────────────────────────┐
│ KIRO IDE                                │
├─────────────────────────────────────────┤
│ Sidebar │ Editor (design.md)            │
│         │                               │
│ .kiro/  │ ## Correctness Properties     │
│ └specs/ │                               │
│   ├req  │ Property 1: ...               │
│   ├des ←│ Property 9: ...               │
│   └tas  │                               │
│         │                               │
├─────────────────────────────────────────┤
│ TERMINAL                                │
│ $ npm test                              │
│ ✓ Property 1 (100 runs)                 │
│ ✓ Property 9 (100 runs)                 │
│ Test Files  9 passed (9)                │
│ Tests  45 passed (45)                   │
└─────────────────────────────────────────┘
```

---

## 🚀 PRONTO PARA GRAVAR!

**Resumo:**
1. Feche tudo
2. Abra sidebar em `.kiro/specs/`
3. Grave abrindo apenas 2 arquivos:
   - requirements.md
   - design.md
4. Abra terminal e rode `npm test`
5. Mostre testes passando

**Simples assim!** 🎬✨

