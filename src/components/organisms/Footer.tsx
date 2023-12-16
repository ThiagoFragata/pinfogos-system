import { ModeToggle } from '../molecules/ModeToggle'

export function Footer() {
  return (
    <div className="flex justify-between items-center">
      <small>Todos direito reservados © Parintins ShowFogos</small>
      <ModeToggle />
    </div>
  )
}
