import { Link, LinkProps, useLocation } from "react-router-dom";

interface MenuItemProps extends LinkProps {}

export function MenuItem(props: MenuItemProps) {
  const { pathname } = useLocation()
  return (
    <Link data-current={pathname === props.to}
      className={`data-[current=true]:text-foreground font-medium text-sm `}
      {...props}
    />
    
    
  );
}
