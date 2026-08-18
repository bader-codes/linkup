import { Card, CardContent } from "#components/ui/card.tsx";
import LoginBanner from "#components/login/LoginBanner.tsx";
import Container from "#components/shared/Container.tsx";
import LoginForm from "#components/login/LoginForm.tsx";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <section className="py-8 md:py-12">
      <Container>
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-700 dark:text-gray-50 md:text-5xl">
            Welcome back to{" "}
            <span className="bg-linear-to-r from-blue-600 via-sky-500 to-violet-500 bg-clip-text text-transparent">
              LinkUp
            </span>
          </h1>

          <p className="mt-3 text-muted-foreground dark:text-gray-100">
            Log in to your account and continue connecting with your people.
          </p>
        </div>

        <Card className="overflow-hidden">
          <CardContent className="grid items-center gap-8 p-4 lg:grid-cols-2 lg:p-6">
            <div className="hidden lg:block">
              <LoginBanner />
            </div>

            <div className="space-y-6">
              <LoginForm />

              <p className="font-semibold text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </Container>
    </section>
  );
}
