import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#components/ui/select.tsx";
import { Label } from "#components/ui/label.tsx";

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

export default function DateOfBirth() {
  return (
    <div className="space-y-2 py-2 w-full">
      <Label>
        Date of Birth
        <span className="text-red-600">*</span>
      </Label>

      <div className="grid grid-cols-3 gap-3">
        {/* Day */}
        <Select name="day">
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

        {/* Month */}
        <Select name="month">
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

        {/* Year */}
        <Select name="year">
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
      </div>
    </div>
  );
}
