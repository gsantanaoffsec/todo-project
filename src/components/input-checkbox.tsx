import { type VariantProps } from 'class-variance-authority'
import {
  inputCheckBoxVariants,
  inputCheckBoxWrapperVariants,
  inputCheckBoxIconVariants,
} from './input-checkbox.variants'
import type React from 'react'
import Icon from './icon'
import CheckIcon from '../assets/icons/check.svg?react'

interface InputCheckBoxProps
  extends
    VariantProps<typeof inputCheckBoxVariants>,
    Omit<React.ComponentProps<'input'>, 'size' | 'disabled'> {}

export default function InputCheckBox({ size, disabled, className, ...props }: InputCheckBoxProps) {
  return (
    <label className={inputCheckBoxWrapperVariants({ className })}>
      <input type="checkbox" className={inputCheckBoxVariants({ size, disabled })} {...props} />
      <Icon className={inputCheckBoxIconVariants({ size })} svg={CheckIcon} />
    </label>
  )
}
