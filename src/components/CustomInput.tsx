import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { lazy, Suspense } from "react";
import { Input } from "./ui/input";

interface IconProps extends Omit<LucideProps, "ref"> {
  name: keyof typeof dynamicIconImports;
}

const fallback = <div style={{ background: "#ddd", width: 24, height: 24 }} />;

export function CustomInput({
  name,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & IconProps) {
  const LucideIcon = name != undefined ? lazy(dynamicIconImports[name]) : null;

  return (
    <div className="flex items-center">
      {LucideIcon != null && (
        <div className="relative inset-y-0 left-7 flex items-center pointer-events-non">
          <Suspense fallback={fallback}>
            <LucideIcon className="w-5 h-5 opacity-70" />
          </Suspense>
        </div>
      )}
      <Input {...rest} />
    </div>
  );
}
