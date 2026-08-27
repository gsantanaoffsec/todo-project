import Icon from './icon'
import type React from 'react'
import Skeleton from './skeleton'
import SpinnerIcon from '../assets/icons/spinner.svg?react'
import type { VariantProps } from 'class-variance-authority'
import { buttonIconIconVariants, buttonIconVariants } from './button-icon.variants'

interface ButtonIconProps
  extends
    VariantProps<typeof buttonIconVariants>,
    Omit<React.ComponentProps<'button'>, 'size' | 'disabled'> {
  icon: React.ComponentProps<typeof Icon>['svg']
  loading?: boolean
  handling?: boolean
}

export default function ButtonIcon({
  variant,
  size,
  disabled,
  className,
  icon,
  loading,
  handling,
  ...props
}: ButtonIconProps) {
  if (loading) {
    return (
      <Skeleton rounded="sm" className={buttonIconVariants({ variant: 'none', size, className })} />
    )
  }

  return (
    <button
      className={buttonIconVariants({
        variant,
        size,
        disabled,
        className,
        handling,
      })}
      {...props}
    >
      <Icon
        svg={handling ? SpinnerIcon : icon}
        animate={handling}
        className={buttonIconIconVariants({ variant, size })}
      />
    </button>
  )
}
