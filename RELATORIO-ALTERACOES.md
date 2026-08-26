# Relatório de Alterações — Correção do `localStorage`

**Data:** 26/08/2026
**Responsável pela análise:** ajuste de configuração e dependências
**Situação anterior:** aplicação quebrando ao abrir a tela de tarefas
**Situação atual:** aplicação funcionando normalmente

---

## 1. Resumo rápido

A aplicação estava travando com o erro:

```
Uncaught TypeError: useLocalStorage is not a function
```

Por causa desse erro, o componente `TasksList` nem chegava a aparecer na
tela — inclusive o estado de "lista vazia" nunca era exibido.

O problema **não estava no código da aplicação**. Estava em uma
**biblioteca externa** (`use-local-storage`) que não é compatível com a
ferramenta de build usada neste projeto (Vite 8 com motor Rolldown).

A solução foi **parar de depender dessa biblioteca** e passar a usar uma
versão própria, escrita dentro do projeto, com o mesmo comportamento.

---

## 2. Por que o erro acontecia (explicação simples)

Existem dois "formatos" de código JavaScript que as bibliotecas podem usar:

| Formato | Nome técnico | Situação |
|---|---|---|
| Formato antigo | CommonJS | Usado pela biblioteca `use-local-storage` |
| Formato novo | ESM (módulos modernos) | Usado pelo projeto e pelas ferramentas atuais |

Quando o projeto usa uma biblioteca no formato antigo, a ferramenta de
build precisa fazer uma "tradução" de um formato para o outro.

Neste projeto, a ferramenta de build é o **Vite 8 com o motor Rolldown**,
que ainda é uma versão nova e em amadurecimento. Nessa tradução, ele
entregou para o projeto um **objeto** no lugar de uma **função**.

Ou seja: o código pedia uma função para chamar, e recebia uma "caixa"
que continha a função dentro. Ao tentar chamar a caixa como se fosse a
função, o JavaScript reclamava: *"isto não é uma função"*.

Trecho gerado automaticamente pela ferramenta de build, mostrando a
tradução incorreta:

```js
// esperado: exportar a função
// entregue:  exportar um objeto { default: função } no lugar da função
export default require_dist()
```

---

## 3. Arquivos alterados

### 3.1. Novo arquivo: `src/hooks/use-local-storage.ts`

**O que é:** um hook próprio do projeto que faz exatamente o que a
biblioteca externa fazia:

- lê um valor salvo no `localStorage` do navegador;
- salva automaticamente sempre que o valor muda;
- mantém o valor sincronizado entre abas abertas do navegador.

**Por que foi criado:** para o projeto não depender mais da biblioteca
`use-local-storage`, que era a origem do erro. O código é curto
(cerca de 55 linhas) e fácil de entender e manter.

**Detalhe importante:** a "assinatura" (a forma de usar) foi mantida
idêntica à da biblioteca antiga:

```ts
const [valor, setValor] = useLocalStorage<Tipo>('chave', valorPadrao)
```

Assim, nenhum outro código precisou ser reescrito além da linha de
importação.

---

### 3.2. Alterado: `src/hooks/use-tasks.ts`

**Mudança:** apenas a linha de importação.

| Antes | Depois |
|---|---|
| `import useLocalStorage from 'use-local-storage'` | `import useLocalStorage from './use-local-storage'` |

**Por quê:** apontar para o novo arquivo interno em vez da biblioteca
externa com defeito. O restante da lógica do arquivo permaneceu igual.

---

### 3.3. Alterado: `vite.config.ts`

**Mudança:** removido o bloco abaixo, que tinha sido adicionado antes
como tentativa de contornar o problema:

```js
optimizeDeps: {
  include: ['use-local-storage'],
}
```

**Por quê:**

- Esse ajuste **não resolvia** o erro (o problema era na tradução do
  formato do código, não na descoberta da dependência).
- Como a biblioteca `use-local-storage` não é mais usada, manter esse
  bloco só deixaria configuração "morta" no projeto.
- Com a remoção, o arquivo voltou a ficar igual à versão original do
  repositório, ou seja, mais limpo.

---

## 4. Recomendação pendente (opcional)

A biblioteca `use-local-storage` ainda está listada como dependência,
mas não é mais utilizada em lugar nenhum. Para deixar o projeto limpo,
recomenda-se removê-la:

```bash
pnpm remove use-local-storage
```

Isso vai limpar também as entradas correspondentes em `package.json` e
`pnpm-lock.yaml`.

---

## 5. O que fazer para validar

1. Parar o servidor de desenvolvimento, se estiver rodando.
2. (Opcional, recomendado) apagar a pasta de cache: `node_modules/.vite`.
3. Rodar novamente:

   ```bash
   pnpm dev
   ```

4. Abrir a tela de tarefas. O erro `useLocalStorage is not a function`
   não deve mais aparecer. No console, o valor das tarefas deve aparecer
   como uma lista vazia (`[]`) na primeira execução.

---

## 6. Tabela final de mudanças

| Arquivo | Tipo de mudança | Motivo |
|---|---|---|
| `src/hooks/use-local-storage.ts` | Criado | Substituir a biblioteca externa com defeito por uma versão interna equivalente |
| `src/hooks/use-tasks.ts` | Editado (1 linha) | Importar o hook interno em vez da biblioteca externa |
| `vite.config.ts` | Editado (bloco removido) | Remover contorno que não funcionava e ficou sem uso |
| `package.json` / `pnpm-lock.yaml` | Sem alteração (recomendação de limpeza) | Dependência `use-local-storage` ficou sem uso |

---

## 7. Conclusão

O erro era causado por incompatibilidade entre uma biblioteca no formato
antigo e a ferramenta de build moderna do projeto. Em vez de forçar essa
compatibilidade com configurações frágeis, a dependência foi substituída
por um hook interno simples, com o mesmo comportamento e a mesma forma de
uso. O projeto ficou mais estável, mais fácil de entender e com uma
dependência externa a menos.
