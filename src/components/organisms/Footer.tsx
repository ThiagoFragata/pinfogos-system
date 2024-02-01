import { ModeToggle } from '../molecules/ModeToggle'

export function Footer() {
  return (
    <div className="flex justify-between items-center mt-auto">
      <small>Todos direito reservados © Parintins ShowFogos</small>
      <ModeToggle />
    </div>
  )
}
