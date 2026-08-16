import { Label } from "#components/ui/label.tsx";
import { RadioGroup, RadioGroupItem } from "#components/ui/radio-group.tsx";
export default function GenderSelect() {
  return (
    <div className="space-y-2 py-2 w-full">
      <Label>
        Gender
        <span className="text-red-600">*</span>
      </Label>

      <RadioGroup defaultValue="" className="flex gap-6 p-2">
        <div className="flex items-center gap-2">
          <RadioGroupItem value="male" id="male" />
          <Label htmlFor="male">Male</Label>
        </div>

        <div className="flex items-center gap-2">
          <RadioGroupItem value="female" id="female" />
          <Label htmlFor="female">Female</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
