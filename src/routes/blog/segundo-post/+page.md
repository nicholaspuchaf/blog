---
title: 'Configurando um Blog com SvelteKit'
date: '2026-02-10'
author: 'Nicholas Pucharelli'
description: 'Aprenda como configurar um blog pessoal com SvelteKit, Bootstrap e Markdown'
---

# Configurando um Blog com SvelteKit

Neste post, vou mostrar como configurar um blog moderno usando SvelteKit, Bootstrap e Markdown.

## Stack Tecnológica

### SvelteKit
SvelteKit é um framework moderno para construir aplicações web. Principais vantagens:

- **Performance excepcional**: Compilação em tempo de build
- **Roteamento baseado em arquivos**: Fácil de organizar
- **SSR e SSG**: Suporte nativo para renderização no servidor
- **Developer Experience**: Hot Module Replacement instantâneo

### Bootstrap via CDN
Para o CSS, estamos usando Bootstrap via CDN:

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
```

**Vantagens:**
- Sem aumentar o bundle size
- Cache compartilhado entre sites
- Setup rápido e simples

### mdsvex
mdsvex permite escrever componentes Svelte em Markdown:

```javascript
import { mdsvex } from 'mdsvex';

const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [mdsvex()]
};
```

## Estrutura de Arquivos

```
src/
├── routes/
│   ├── +page.svelte          # Página inicial
│   ├── blog/
│   │   ├── primeiro-post/
│   │   │   └── +page.md      # Post em Markdown
│   │   └── segundo-post/
│   │       └── +page.md
│   └── +layout.svelte        # Layout global
└── lib/
    └── layouts/
        └── BlogPost.svelte   # Layout para posts
```

## Frontmatter

Cada post pode ter metadados no início do arquivo:

```yaml
---
title: 'Título do Post'
date: '2026-02-10'
author: 'Seu Nome'
description: 'Descrição curta'
---
```

## Próximos Passos

Algumas ideias para melhorar o blog:

1. **Sistema de tags**: Categorizar posts por tópicos
2. **Busca**: Implementar busca de posts
3. **RSS Feed**: Permitir assinantes
4. **Comentários**: Integrar sistema de comentários
5. **Analytics**: Adicionar Google Analytics ou similar

## Conclusão

Com SvelteKit, Bootstrap e mdsvex, você tem uma stack poderosa e simples para criar um blog moderno e performático.

Feliz blogging! 📝
