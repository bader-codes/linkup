import type { RegisterFormValues } from "@/schemas/registerSchema";
import { Controller, type Control } from "react-hook-form";
import { Label } from "@/components/ui/label.tsx";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";

const days = Array.from({ length: 31 }, (_, i) => i + 1);

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentYear = new Date().getFullYear();

const years = Array.from(
  { length: currentYear - 1933 + 1 },
  (_, i) => currentYear - i,
);

type DateOfBirthProps = {
  control: Control<RegisterFormValues>;
  error?: string;
};

export default function DateOfBirth({ control, error }: DateOfBirthProps) {
  return (
    <div className="space-y-2 py-2 w-full">
      <Label>
        Date of Birth
        <span className="text-red-600">*</span>
      </Label>

      <div className="grid grid-cols-3 gap-3">
        {/* Day */}
        <Controller
          name="dateOfBirth.day"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Day" />
              </SelectTrigger>

              <SelectContent>
                {days.map((day) => (
                  <SelectItem key={day} value={day.toString()}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        {/* Month */}
        <Controller
          name="dateOfBirth.month"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Month" />
              </SelectTrigger>

              <SelectContent>
                {months.map((month, index) => (
                  <SelectItem key={month} value={(index + 1).toString()}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        {/* Year */}
        <Controller
          name="dateOfBirth.year"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Year" />
              </SelectTrigger>

              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
