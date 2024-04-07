import nlwIcon from "../assets/nlw-icon.svg";
import { MenuItem } from "./menu-item";
import { ModeToggle } from "./mode-toggle";

export function Header() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-5 pt-2">
        <img src={nlwIcon} />
        <nav className="flex items-center gap-5">
          <MenuItem title="Eventos" href="" />
          <MenuItem active title="Participantes" href="" />
        </nav>
      </div>
      <ModeToggle />
    </div>
  );
}
