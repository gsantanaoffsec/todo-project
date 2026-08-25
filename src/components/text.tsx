import React from 'react'
import { textVariants } from './text.variants'
import type { VariantProps } from 'class-variance-authority'

/**
 * Componente de texto "polimórfico".
 *
 * Renderiza dinamicamente a tag HTML indicada em `as` (ex: "span", "p", "h1"),
 * evitando criar um componente separado para cada tipo de texto.
 *
 * Exemplo: <Text as="h1" className="titulo">Olá</Text>
 * gera:    <h1 class="titulo">Olá</h1>
 **/

interface TextProps extends VariantProps<typeof textVariants> {
  as?: keyof React.JSX.IntrinsicElements
  className?: string
  // React.ReactNode -> É um tipo que cobre diversos tipos de elementos
  children?: React.ReactNode
}

export default function Text({ as = 'span', variant, className, children, ...props }: TextProps) {
  return React.createElement(
    as,
    // O segundo argumento precisa ser um objeto com todas as props que o elemento vai receber
    {
      className: textVariants({ variant, className }),
      ...props,
    },
    children,
  )
}
