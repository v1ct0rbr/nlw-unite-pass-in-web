interface MenuItemProps extends React.HTMLProps<HTMLAnchorElement> {
  title: string;
  active?: boolean;
}

export function MenuItem({ active, title, ...rest }: MenuItemProps) {
  return (
    <a
      className={`${!active && "text-zinc-400"} font-medium text-sm `}
      {...rest}
    >
      {title}
    </a>
  );
}
