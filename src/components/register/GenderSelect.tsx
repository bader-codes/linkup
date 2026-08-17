import type { RegisterFormValues } from "#components/schemas/registerSchema.ts";
import { RadioGroup, RadioGroupItem } from "#components/ui/radio-group.tsx";
import { Controller, type Control } from "react-hook-form";
import { Label } from "#components/ui/label.tsx";

type GenderSelectProps = {
  control: Control<RegisterFormValues>;
  error?: string;
};

export default function GenderSelect({ control, error }: GenderSelectProps) {
  return (
    <div className="space-y-2 py-2 w-full">
      <Label>
        Gender
        <span className="text-red-600">*</span>
      </Label>

      <Controller
        name="gender"
        control={control}
        render={({ field }) => (
          <RadioGroup
            value={field.value}
            onValueChange={field.onChange}
            className="flex gap-6 p-2"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>

            <div className="flex items-center gap-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
          </RadioGroup>
        )}
      />

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
