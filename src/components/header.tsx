import nlwIcon from '../assets/nlw-icon.svg'
import { MenuItem } from './menu-item'
import { ModeToggle } from './mode-toggle'

export function Header() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-5 pt-2">
        <img src={nlwIcon} alt="logo icon" />
        <nav className="flex items-center gap-5 text-muted-foreground">
          <MenuItem to="/events">Eventos</MenuItem>
          <MenuItem to="/participants-list">Participantes</MenuItem>
        </nav>
      </div>
      <ModeToggle />
    </div>
  )
}
