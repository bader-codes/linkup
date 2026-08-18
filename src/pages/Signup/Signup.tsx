import RegisterBanner from "#components/register/RegisterBanner.tsx";
import RegisterForm from "#components/register/RegisterForm.tsx";
import { Card, CardContent } from "#components/ui/card.tsx";
import Container from "#components/shared/Container.tsx";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <section className="py-8 md:py-12">
      <Container>
        <div className="mb-10 text-center">
          <h1 className="text-4xl dark:text-gray-50 text-gray-700 font-bold tracking-tight md:text-5xl">
            Welcome to{" "}
            <span className="bg-linear-to-r from-blue-600 via-sky-500 to-violet-500 bg-clip-text text-transparent">
              LinkUp
            </span>
          </h1>

          <p className="text-muted-foreground mt-3 dark:text-gray-100">
            Create your account and start connecting with people.
          </p>
        </div>

        <Card className="overflow-hidden">
          <CardContent className="grid items-center gap-8 p-4 lg:grid-cols-2 lg:p-6">
            <div className="hidden lg:block">
              <RegisterBanner />
            </div>

            <div className="space-y-6">
              <RegisterForm />

              <p className="font-semibold text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  Log in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </Container>
    </section>
  );
}
