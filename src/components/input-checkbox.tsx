import { type VariantProps } from 'class-variance-authority'
import {
  inputCheckBoxVariants,
  inputCheckBoxWrapperVariants,
  inputCheckBoxIconVariants,
} from './input-checkbox.variants'
import type React from 'react'
import Icon from './icon'
import CheckIcon from '../assets/icons/check.svg?react'
import Skeleton from './skeleton'

interface InputCheckBoxProps
  extends
    VariantProps<typeof inputCheckBoxVariants>,
    Omit<React.ComponentProps<'input'>, 'size' | 'disabled'> {
  loading?: boolean
}

export default function InputCheckBox({
  variant,
  size,
  disabled,
  className,
  loading,
  ...props
}: InputCheckBoxProps) {
  if (loading) {
    return <Skeleton rounded="sm" className={inputCheckBoxVariants({ variant: 'none', size })} />
  }

  return (
    <label className={inputCheckBoxWrapperVariants({ className })}>
      <input
        type="checkbox"
        className={inputCheckBoxVariants({ variant, size, disabled })}
        {...props}
      />
      <Icon className={inputCheckBoxIconVariants({ size })} svg={CheckIcon} />
    </label>
  )
}
