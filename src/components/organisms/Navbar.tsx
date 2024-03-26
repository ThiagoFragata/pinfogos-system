'use client'
import Image from 'next/image'
import { Menu } from '../molecules/Menu'

import logo from '@/assets/svg/logo.svg'

import { MenuProfile } from '../molecules/MenuProfile'

export function Navbar() {
  return (
    <div className="flex items-center justify-between">
      <Image src={logo} alt={'Parintins Show Fogos'} width={200} className="w-[150px] md:w-[200px]" />

      <Menu />

      {/* <ButtonDialog title="Deseja sair" description="Você realmente deseja sair de sua conta?" onPress={SignOut}>
        <ButtonSignOut />
      </ButtonDialog> */}
      <MenuProfile />
    </div>
  )
}
