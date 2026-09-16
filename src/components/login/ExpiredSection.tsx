import { Link, useSearchParams } from "react-router-dom";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export default function ExpiredSection() {
  const [searchParams] = useSearchParams();

  const sessionExpired = searchParams.get("reason") === "session-expired";

  return (
    <Dialog open={sessionExpired}>
      <DialogContent showCloseButton={false} className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg">Session expired</DialogTitle>

          <DialogDescription className="text-red-500 text-lg">
            Your session has expired. <br /> Please log in again to continue.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="w-full flex items-center sm:justify-center justify-center">
          <Link
            to="/login"
            replace
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
          >
            Continue to login
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
