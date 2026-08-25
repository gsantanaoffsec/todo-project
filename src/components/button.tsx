import React from 'react'
import Icon from './icon'
import Text from './text'
import { type VariantProps } from 'class-variance-authority'
import { buttonVariants, buttonIconVariants, buttonTextVariants } from './button.variants'

// Pegue tudo que é do botão, mas omita o 'size' e o 'disabled'

interface ButtonProps
  extends
    Omit<React.ComponentProps<'button'>, 'size' | 'disabled'>,
    VariantProps<typeof buttonVariants> {
  // Pegando o tipo do botão ícone que tem uma propriedade chamada 'svg'
  icon?: React.ComponentProps<typeof Icon>['svg']
}

// Propriedades do CVA: variant, size, disable
// Propriedades do ComponentsProps: className, children
// Propriedade totalmente customizada: icon

export default function Button({
  variant,
  size,
  disabled,
  className,
  children,
  icon: IconComponent,
  ...props
}: ButtonProps) {
  return (
    <button className={buttonVariants({ variant, size, disabled, className})} {...props}>
      {IconComponent && (
        <Icon svg={IconComponent} className={buttonIconVariants({ variant, size })} />
      )}
      <Text variant="body-md-bold" className={buttonTextVariants({ variant })}>
        {children}
      </Text>
    </button>
  )
}
