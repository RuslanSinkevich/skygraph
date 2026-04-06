import React from 'react'
import { Button } from '../ui/Button'

export interface SubmitButtonProps {
  children?: React.ReactNode
  disabled?: boolean
  loading?: boolean
  className?: string
  unstyled?: boolean
}

export function SubmitButton({
  children = 'Submit',
  disabled,
  loading,
  className,
  unstyled,
}: SubmitButtonProps) {
  return (
    <Button
      type="primary"
      htmlType="submit"
      disabled={disabled}
      loading={loading}
      className={className}
      unstyled={unstyled}
    >
      {children}
    </Button>
  )
}
