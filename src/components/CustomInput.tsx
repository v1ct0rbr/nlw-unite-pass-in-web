import { LucideProps } from 'lucide-react'
import dynamicIconImports from 'lucide-react/dynamicIconImports'
import { lazy, Suspense } from 'react'
import { Input } from './ui/input'

interface IconProps extends Omit<LucideProps, 'ref'> {
  icon: keyof typeof dynamicIconImports
}

const fallback = <div style={{ background: '#ddd', width: 24, height: 24 }} />

export function CustomInput({
  icon,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & IconProps) {
  const LucideIcon = icon !== undefined ? lazy(dynamicIconImports[icon]) : null

  return (
    <div className="flex items-center">
      {LucideIcon != null && (
        <div className="relative inset-y-0 left-8 flex items-center pointer-events-non">
          <Suspense fallback={fallback}>
            <LucideIcon className="w-5 h-5 opacity-70 text-green-400" />
          </Suspense>
        </div>
      )}
      <Input {...rest} />
    </div>
  )
}
