import logo from '@/assets/svg/logo.svg'
import SignInForm from '@/components/organisms/SignInForm'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col flex-1 justify-between bg-zinc-950 text-white p-8">
        <Image src={logo} alt={''} />

        <h3>Conectando estoque e vendas com eficiência e precisão.</h3>
      </div>

      <div className="flex flex-col justify-between text-center p-8">
        <div className="space-y-8">
          <div>
            <h2 className="font-bold text-xl">StockFlow</h2>
            <p>Informe seu e-mail e senha para entrar no sistema</p>
          </div>

          <SignInForm />
        </div>

        <div className="text-sm">
          <p>Ao clicar em entrar você concorda com nossos </p>
          <p>
            <strong>Termos de uso</strong> e <strong>Politica de privacidade.</strong>
          </p>
        </div>
      </div>
    </div>
  )
}
