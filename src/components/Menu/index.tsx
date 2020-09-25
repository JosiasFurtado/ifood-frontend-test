import React from 'react'
import cx from 'classnames'
import PrimaryButton from '../PrimaryButton'
import useViewer from '~/hooks/useViewer'
import cookie from 'js-cookie'
import { useRouter } from 'next/router'

export interface MenuProps {
  readonly className?: string
}

const Menu: React.FC<MenuProps> = ({ className }) => {
  const { push } = useRouter()
  const { viewer } = useViewer()

  const handleDisconnect = () => {
    cookie.remove('@spotifoodUser')
    cookie.remove('@spotifoodToken')
    push('/')
  }

  return (
    <div
      className={cx(
        'bg-gray-900 py-2 lg:py-8 px-4 lg:px-0 lg:w-1/5',
        className
      )}
    >
      <div className="flex lg:flex-col h-full items-center justify-between">
        <img src="/static/logo.svg" className="w-16 h-16 lg:w-20 lg:h-20" />
        <div className="lg:w-full px-8 flex flex-col">
          <span className="text-base text-gray-700">Logged in as:</span>
          <h6 className="text-lg font-medium text-white mb-2 lg:mb-6">
            {viewer?.display_name}
          </h6>
          <button
            onClick={handleDisconnect}
            className="flex lg:hidden text-gray-700 underline text-base"
          >
            Logout
          </button>
          <PrimaryButton className="hidden lg:flex" onClick={handleDisconnect}>
            Logout
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}

Menu.displayName = 'Menu'

export { Menu }
export default Menu
