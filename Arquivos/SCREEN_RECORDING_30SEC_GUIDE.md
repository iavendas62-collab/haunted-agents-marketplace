# 🎬 Guia de Gravação - 30 Segundos: Specs + Testes

## 🎯 OBJETIVO
Mostrar o workflow completo: Requirements → Design → Properties → Tests rodando

---

## 📋 PREPARAÇÃO (ANTES DE GRAVAR)

### 1. Abrir Kiro IDE
- Abrir o projeto Haunted Agents Marketplace
- Fechar todas as abas abertas
- Limpar terminal

### 2. Configurar Tela
- Resolução: 1920x1080
- Zoom do editor: 125%
- Fonte do terminal: 16pt
- Tema: Dark (melhor contraste)

### 3. Preparar Arquivos
Ter esses arquivos prontos para abrir:
- `.kiro/specs/haunted-agents-marketplace/requirements.md`
- `.kiro/specs/haunted-agents-marketplace/design.md`

### 4. Preparar Terminal
```bash
cd skeleton/cli
npm test
```

---

## 🎬 ROTEIRO DETALHADO (30 SEGUNDOS)

### **0s - 2s: SIDEBAR**
**Ação:**
- Sidebar já aberta mostrando estrutura `.kiro/`
- Pasta `.kiro/specs/haunted-agents-marketplace/` expandida
- Arquivos visíveis: `requirements.md`, `design.md`, `tasks.md`

**Narração:**
*"Começamos com as especificações completas..."*

---

### **2s - 5s: ABRIR REQUIREMENTS**
**Ação:**
- Clicar em `requirements.md`
- Arquivo abre instantaneamente
- Scroll suave de cima para baixo (3 segundos)

**O que mostrar:**
- Título: "# Requirements Document"
- Seção: "## Glossary"
- Seção: "## Requirements"
- User Stories visíveis

**Narração:**
*"...com requisitos detalhados usando EARS pattern..."*

---

### **5s - 10s: SCROLL REQUIREMENTS**
**Ação:**
- Scroll suave mostrando:
  - Requirement 1 com User Story
  - Acceptance Criteria (1.1, 1.2, 1.3)
  - Requirement 2 começando

**Destacar:**
- User Stories formatadas
- Acceptance Criteria numerados
- Padrão EARS (WHEN/THEN)

**Narração:**
*"...cada um com acceptance criteria testáveis..."*

---

### **10s - 12s: ABRIR DESIGN**
**Ação:**
- Clicar na aba `design.md` (ou clicar no arquivo na sidebar)
- Arquivo abre
- Posição inicial: topo do documento

**O que mostrar:**
- Título: "# Design Document"
- Seções: Overview, Architecture

**Narração:**
*"...que se transformam em design completo..."*

---

### **12s - 15s: SCROLL ATÉ PROPERTIES**
**Ação:**
- Scroll rápido mas suave até seção "## Correctness Properties"
- Parar na seção de properties

**O que mostrar:**
```markdown
## Correctness Properties

*A property is a characteristic or behavior...*

### Property 1: Bundle Completeness
*For any* bundle manifest, all required fields...
**Validates: Requirements 1.1, 1.2**

### Property 2: Configuration Validity
*For any* configuration file...
**Validates: Requirements 2.1**
```

**Narração:**
*"...com correctness properties formais..."*

---

### **15s - 18s: DESTACAR PROPERTIES**
**Ação:**
- Selecionar/destacar texto:
  - "Property 1: Bundle Completeness"
  - Scroll suave
  - "Property 9: Component Installation"

**Técnica:**
- Use Ctrl+F para buscar "Property 1"
- Depois "Property 9"
- Ou simplesmente scroll mostrando várias properties

**O que mostrar:**
- Múltiplas properties visíveis
- Formato "For any..."
- Links "Validates: Requirements X.Y"

**Narração:**
*"...que validam os requisitos..."*

---

### **18s - 20s: ABRIR TERMINAL**
**Ação:**
- Pressionar Ctrl+` (ou clicar em Terminal)
- Terminal abre na parte inferior
- Já posicionado em `skeleton/cli`

**Terminal deve mostrar:**
```
PS C:\...\skeleton\cli>
```

**Narração:**
*"...e são testados automaticamente..."*

---

### **20s - 22s: RODAR TESTES**
**Ação:**
- Digitar: `npm test`
- Pressionar Enter
- Testes começam a rodar

**O que mostrar:**
```bash
> @haunted-agents/cli@1.0.0 test
> vitest --run

 RUN  v1.6.1

 ✓ src/core/registry.property.test.ts (9)
   ✓ Property 1: Bundle completeness (100 runs)
   ✓ Property 2: Configuration validity (100 runs)
```

**Narração:**
*"...com property-based testing..."*

---

### **22s - 25s: TESTES RODANDO**
**Ação:**
- Output dos testes aparecendo
- Mostrar múltiplos testes passando

**O que mostrar:**
```
 ✓ src/core/registry.property.test.ts (9)
   ✓ Property 1: Bundle completeness (100 runs)
   ✓ Property 2: Configuration validity (100 runs)
   ✓ Property 3: Search functionality (100 runs)
   
 ✓ src/commands/install.test.ts (5)
   ✓ Property 9: Component installation (100 runs)
   ✓ Property 10: MCP merge correctness (100 runs)
```

**Destacar:**
- ✓ Verde (testes passando)
- "(100 runs)" - property-based testing
- Nomes das properties

**Narração:**
*"...rodando 100 casos aleatórios por property..."*

---

### **25s - 28s: TESTES PASSAM**
**Ação:**
- Scroll até o final do output
- Mostrar resumo final

**O que mostrar:**
```
 Test Files  9 passed (9)
      Tests  45 passed (45)
   Start at  10:30:15
   Duration  2.34s

 PASS  Waiting for file changes...
```

**Destacar:**
- Tudo verde ✓
- "45 passed"
- Tempo rápido (2.34s)

**Narração:**
*"...todos os testes passando!"*

---

### **28s - 30s: FADE OUT**
**Ação:**
- Manter tela com resultado final
- Fade out suave

**Texto overlay:**
```
✓ Requirements → Design → Properties → Tests
✓ 45 tests passed
✓ 100 runs per property

Built with Kiro IDE 🎃
```

**Narração:**
*"Do requisito ao código testado. Esse é o poder do Kiro."*

---

## 🎨 DICAS DE GRAVAÇÃO

### Velocidade
- **0-10s:** Ritmo moderado (mostrar specs)
- **10-18s:** Ritmo mais rápido (scroll até properties)
- **18-25s:** Ritmo normal (testes rodando)
- **25-30s:** Ritmo lento (resultado final)

### Cursor
- Movimentos suaves e deliberados
- Não muito rápido
- Destacar elementos importantes

### Scroll
- Suave e constante
- Não muito rápido
- Pausar em conteúdo importante

### Terminal
- Fonte grande (16-18pt)
- Cores vibrantes
- Output limpo

---

## 🎯 CHECKLIST PRÉ-GRAVAÇÃO

- [ ] Kiro IDE aberto
- [ ] Projeto carregado
- [ ] Sidebar expandida em `.kiro/specs/`
- [ ] Todas as outras abas fechadas
- [ ] Terminal limpo
- [ ] Zoom configurado (125%)
- [ ] Fonte do terminal aumentada
- [ ] Tema dark ativado
- [ ] Notificações desabilitadas
- [ ] Comando `npm test` testado previamente

---

## 🎬 COMANDOS PARA COPIAR

```bash
# Navegar para CLI
cd skeleton/cli

# Rodar testes
npm test

# Se quiser rodar só property tests
npm test registry.property.test.ts
```

---

## 📊 O QUE ISSO DEMONSTRA

✅ **Workflow Completo**
- Requirements → Design → Properties → Tests

✅ **Metodologia Formal**
- EARS pattern para requirements
- Correctness properties formais
- Property-based testing

✅ **Qualidade**
- 45 testes
- 100 runs por property
- Todos passando

✅ **Kiro Integration**
- Specs no Kiro
- Testes no Kiro
- Workflow integrado

---

## 💡 VARIAÇÕES

### Versão Mais Longa (60s)
Adicione:
- Mostrar mais properties no design.md
- Mostrar código de um teste
- Mostrar output mais detalhado

### Versão Mais Curta (15s)
Remova:
- Scroll detalhado nos requirements
- Foque só em: Design → Properties → Tests

### Versão com Código
Adicione:
- Abrir `registry.property.test.ts`
- Mostrar código de uma property
- Mostrar como property valida requirement

---

## 🚀 PRONTO PARA GRAVAR!

Este roteiro mostra o **diferencial técnico** do projeto:
- Metodologia formal
- Property-based testing
- Workflow completo
- Integração com Kiro

**Boa gravação!** 🎬🎃

