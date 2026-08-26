import type React from 'react'
import { cx } from 'class-variance-authority'
import { textVariants } from './text.variants'
import { inputTextVariants } from './input-text.variants'
import { type VariantProps } from 'class-variance-authority'

interface InputTextProps
  extends VariantProps<typeof inputTextVariants>, Omit<React.ComponentProps<'input'>, 'size' | 'disabled'> {}

export default function InputText({ size, disabled, className, ...props }: InputTextProps) {
  return (
    <input
      // TextVariants não recebe nada, pois o padrão já o Body Md sem bold
      className={cx(inputTextVariants({ size, disabled }), textVariants(), className)}
      {...props}
    ></input>
  )
}
