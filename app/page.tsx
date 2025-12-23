import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, BarChart3, Clock, Target } from "lucide-react"
import Link from "next/link"

export default async function HomePage() {
  // Check if user is logged in
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // If logged in, redirect to dashboard
  if (session) {
    redirect("/dashboard");
  }

  // Otherwise, show landing page
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <Target className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground">employtrack</span>
            </div>
            <nav className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/auth/register">Get Started</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-balance text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Track your job search
            <br />
            <span className="text-primary">with confidence</span>
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Stay organized and in control of your job applications. Track every opportunity from application to offer
            with employtrack. A simple, powerful tracking system.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <Link href="/auth/register">Start Tracking for Free</Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent" asChild>
              <Link href="#features">See How It Works</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-border bg-card p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-card-foreground">Status Tracking</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Label applications by status: applied, interviewing, offer, accepted, or rejected.
            </p>
          </Card>

          <Card className="border-border bg-card p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-card-foreground">Timeline View</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              See your entire job search journey at a glance with clear timelines.
            </p>
          </Card>

          <Card className="border-border bg-card p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-card-foreground">Progress Insights</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Understand your job search metrics and improve your approach.
            </p>
          </Card>

          <Card className="border-border bg-card p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-card-foreground">Stay Focused</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Keep all your applications organized in one simple, distraction-free place.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Card className="border-border bg-card">
          <div className="flex flex-col items-center gap-6 p-12 text-center">
            <h2 className="text-balance text-3xl font-bold text-card-foreground sm:text-4xl">
              Ready to organize your job search?
            </h2>
            <p className="max-w-xl text-pretty text-muted-foreground">
              Join thousands of job seekers who use employtrack to stay organized and land their dream job.
            </p>
            <Button size="lg" className="mt-4" asChild>
              <Link href="/auth/register">Get Started for Free</Link>
            </Button>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
                <Target className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">employtrack</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 employtrack. Track your path to success.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}