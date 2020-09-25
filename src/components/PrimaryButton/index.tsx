import React from 'react'
import cx from 'classnames'

export interface PrimaryButtonProps {
  readonly className?: string
  onClick(): void
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  className,
  children,
  onClick,
  ...rest
}) => {
  return (
    <button
      {...rest}
      onClick={onClick}
      className={cx(
        'text-white text-lg py-2 px-2 xl:px-4 rounded-md bg-purple-900 font-medium transition duration-500 ease-in-out hover:bg-purple-800',
        className
      )}
    >
      {children}
    </button>
  )
}

PrimaryButton.displayName = 'PrimaryButton'

export { PrimaryButton }
export default PrimaryButton
