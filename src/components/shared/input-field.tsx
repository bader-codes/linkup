import { Input } from "#components/ui/input.tsx";
import { Label } from "#components/ui/label.tsx";
import { cn } from "#lib/utils.ts";

import type { IconType } from "react-icons";

type InputFieldProps = React.ComponentProps<typeof Input> & {
  label: string;
  icon: IconType;
};

export default function InputField({
  label,
  icon: Icon,
  className,
  id,
  ...props
}: InputFieldProps) {
  return (
    <div className="space-y-2 py-2 w-full">
      <Label htmlFor={id}>
        {label}
        {id === "user-name" ? (
          <span>(optional)</span>
        ) : (
          <span className="text-red-600">*</span>
        )}
      </Label>

      <div className="relative">
        <Icon className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />

        <Input id={id} className={cn("pl-9", className)} {...props} />
      </div>
    </div>
  );
}
