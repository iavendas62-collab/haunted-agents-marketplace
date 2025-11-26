# Como Rodar as Aplicações

Este skeleton suporta rodar duas aplicações diferentes do mesmo código base.

## 🚀 Início Rápido

### Opção 1: Usando npm scripts (Recomendado)

**Rodar App 1 (Kiro Agents Marketplace):**
```bash
npm run dev:app1
```
Abre em **http://localhost:4000**

**Rodar App 2 (DevOps Automation Hub):**
```bash
npm run dev:app2
```
Abre em **http://localhost:4001**

**Rodar ambas ao mesmo tempo:**
```bash
npm run dev:both
```

### Opção 2: Manual (Windows)

**Para App 1:**
```cmd
scripts\copy-config.cmd app1
cd skeleton\web
npm run dev -- --port 4000
```

**Para App 2:**
```cmd
scripts\copy-config.cmd app2
cd skeleton\web
npm run dev -- --port 4001
```

## ✅ Como Verificar se Está Correto

Depois de iniciar, você deve ver:

**App 1 (localhost:4000):**
- ✅ Título: "**Kiro Agents Marketplace**"
- ✅ Tagline: "Supercharge your Kiro IDE with specialized AI agents"
- ✅ Categorias: Frontend Development, Backend Development, Testing
- ✅ Agentes: React + Supabase Expert, API Documentation Wizard, TDD Coach

**App 2 (localhost:4001):**
- ✅ Título: "**DevOps Automation Hub**"
- ✅ Tagline: "Automate your infrastructure with specialized DevOps agents"
- ✅ Categorias: CI/CD, Infrastructure, Monitoring
- ✅ Agentes: CI/CD Pipeline Template, Kubernetes Monitor, Terraform Helper

## 🔧 Como Funciona

1. Cada aplicação tem sua própria configuração:
   - `app1-kiro-marketplace/config/` → Config do App 1
   - `app2-devops-hub/config/` → Config do App 2

2. O script copia a configuração correta para `skeleton/web/public/config/`

3. O React carrega a configuração e mostra o conteúdo apropriado

## ❌ Problema: Ambas mostram "Haunted Agents Marketplace"

**Causa:** Você está rodando `npm run dev` diretamente no skeleton/web

**Solução:** Use os scripts npm do diretório raiz:
```bash
# Pare o servidor atual (Ctrl+C)
# Volte para o diretório raiz
cd ../..

# Rode o script correto
npm run dev:app1  # ou dev:app2
```

## 📝 Arquivos de Configuração

Cada app tem:
- **branding.json** - Nome, logo, cores, tagline
- **categories.json** - Filtros de categoria
- **agents.json** - Bundles de agentes disponíveis
- **public/images/** - Imagens de preview

## 🎯 Demonstração do Skeleton

Este é o poder do skeleton! O mesmo código React serve duas aplicações completamente diferentes:

| Aspecto | App 1 | App 2 |
|---------|-------|-------|
| **Nome** | Kiro Agents Marketplace | DevOps Automation Hub |
| **Foco** | Agentes de desenvolvimento | Automação DevOps |
| **Cores** | Roxo/Rosa (Indigo) | Verde (Emerald) |
| **Categorias** | Frontend, Backend, Testing | CI/CD, Infrastructure, Monitoring |
| **Agentes** | React, API, TDD | Pipeline, K8s, Terraform |

Tudo isso sem mudar uma linha de código React! 🎉
