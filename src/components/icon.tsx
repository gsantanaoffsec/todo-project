import React from 'react'
import { iconVariants } from './icon.variants'
import { type VariantProps } from 'class-variance-authority'

// Pega as propriedades do SVG e coloca dentro da interface

interface IconProps extends React.ComponentProps<'svg'>, VariantProps<typeof iconVariants> {
  // O SVG será um componente funcional que vai retornar um SVG

  svg: React.FC<React.ComponentProps<'svg'>>
}

// Receber um SVG e envio das propriedades

// Caso chame <Icon /> sem passar SVG, o TypeScript reclama antes de rodar
// pois, não está seguindo as propriedades esperadas de IconProps

export default function Icon({ svg: SvgComponent, animate, className, ...props }: IconProps) {
  return <SvgComponent className={iconVariants({animate, className})} {...props} />
}
