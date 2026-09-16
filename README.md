▲
▲ ▲    🌌 MERCADO INTERGALÁCTICO — SETOR 7-G
▲ ▲ ▲   ------------------
[ TRANSMISSÃO CRIPTOGRAFADA V3.1.4 ]

<div align="center">

# 🛸 MERCADO INTERGALÁCTICO 🛸
### *A Maior Rede de Artefatos Alienígenas e Tecnologia Extraterrestre da Galáxia*

![React](https://img.shields.io/badge/REACT-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TYPESCRIPT-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TAILWIND_CSS-3.4-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Status](https://img.shields.io/badge/SETOR_7--G-ATIVO-00FF99?style=for-the-badge)
![Nível de Acesso](https://img.shields.io/badge/SISTEMA-ALTAMENTE_LUMINOSO-FF0055?style=for-the-badge)

<p align="center">
  <a href="#-sinopse">Sinopse</a> •
  <a href="#-recursos-tecnológicos">Recursos</a> •
  <a href="#-pré-requisitos-de-embarque">Instalação</a> •
  <a href="#-estrutura-do-sistema">Estrutura</a> •
  <a href="#-solução-de-anomalias">Troubleshooting</a>
</p>

---

</div>

## 🎬 Sinopse

> *"No ano de 2142, após o Tratado de Paz de Proxima Centauri, os estaleiros de Orion abriram o maior entreposto comercial da história da humanidade. Das profundezas de nebulosas distantes aos escombros de civilizações extintas, o **Mercado Intergaláctico** é o destino número um para capitães, exploradores e mercenários que buscam equipar suas frotas com tecnologia de ponta."*

Esta aplicação é uma vitrine de e-commerce e-pica construída em **React 18**, **TypeScript** e **Tailwind CSS**, trazendo um design *Dark/Futurista/Cyber-Alien* com animações fluidas, modal de análise de artefatos e um carrinho de compras estilo *Hangar Espacial*.

---

## ⚡ Recursos Tecnológicos

| Módulo do Sistema | Tecnologia React | Descrição Estelar |
| :--- | :--- | :--- |
| **Grid de Artefatos** | `React.FC` & Hooks | Exibição responsiva de cards com efeito de brilho e raridade em tempo real. |
| **Carrinho (Hangar)** | State Management | Drawer lateral retrátil com cálculo de Créditos Galácticos e controle de quantidade. |
| **Scanner de Item** | Modals & Portals | Janela de análise detalhada com especificação técnica e lore de cada item. |
| **Radar de Busca** | `useMemo` Filter | Filtro de busca instantâneo por nome e categorias (Energia, Sensores, etc.). |
| **Interface de Luz** | Tailwind CSS v3 | Paleta escura com ciano espacial, roxo vibrante e desfoques neon (*backdrop-blur*). |

---

## 🚀 Pré-requisitos de Embarque

Antes de iniciar a sequência de propulsão, certifique-se de ter os seguintes módulos em seu computador:

- **Node.js** `>= 18.0.0`
- **npm** `>= 9.0.0` (ou **yarn** / **pnpm**)

---

## 🔧 Sequência de Inicialização (Instalação)

### 1. Clonar o Repositório

```bash
git clone [https://github.com/seu-usuario/mercado-intergalactico.git](https://github.com/seu-usuario/mercado-intergalactico.git)
cd mercado-intergalactico
2. Instalar Módulos de Tração (Dependências)
Bash
npm install
Atenção Capitão: Certifique-se de que a biblioteca lucide-react foi instalada corretamente:
Bash
npm install lucide-react
3. Executar o Motor de Desenvolvimento
Bash
npm run dev
Acesse a frequência de rádio local: http://localhost:5173
📁 Estrutura do Sistema
mercado-intergalactico/
├── src/
│   ├── components/
│   │   └── ProductCard.tsx   # Card individual com raridade e hover neon
│   ├── types/
│   │   └── index.ts          # Interfaces TypeScript (Product, CartItem)
│   ├── App.tsx               # Plataforma principal, filtros e Hangar
│   ├── main.tsx              # Ponto de entrada
│   └── index.css             # Tailwind Directives & Animações Cósmicas
├── index.html
├── tailwind.config.js
├── tsconfig.json
└── package.json
🛡️ Solução de Anomalias Espaciais (Troubleshooting)
❌ Erro: Failed to resolve import "lucide-react"
Execute no seu terminal:
Bash
npm install lucide-react
❌ Linhas vermelhas no tsconfig.json ou Cannot find module
Certifique-se de que o seu tsconfig.json possui a opção moduleResolution configurada para bundler ou node:
JSON
{
  "compilerOptions": {
    "target": "ES2020",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "skipLibCheck": true
  }
}
E instale as definições de tipos do React:
Bash
npm install -D @types/react @types/react-dom
```

🌌 Transmissão Encerrada 🌌

*Desenvolvido pelos Estaleiros de Orion • Todos os direitos reservados para a Frota Unificada de 2142*
