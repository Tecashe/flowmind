"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Menu, 
  X, 
  ChevronDown,
  Zap,
  Shield,
  Users,
  BarChart3,
  GitBranch,
  Workflow
} from 'lucide-react';
import { cn } from '@/lib/utils';

const solutions = [
  {
    title: "Process Discovery",
    description: "AI-powered automatic detection and mapping of business processes",
    icon: GitBranch,
    href: "/solutions/discovery"
  },
  {
    title: "Real-time Monitoring", 
    description: "Live tracking and performance analytics for all your processes",
    icon: BarChart3,
    href: "/solutions/monitoring"
  },
  {
    title: "Optimization Engine",
    description: "Intelligent recommendations to streamline and improve workflows",
    icon: Zap,
    href: "/solutions/optimization"
  },
  {
    title: "Workflow Automation",
    description: "Automate repetitive tasks and standardize procedures",
    icon: Workflow,
    href: "/solutions/automation"
  }
];

const resources = [
  { title: "Documentation", href: "/docs" },
  { title: "API Reference", href: "/api" },
  { title: "Case Studies", href: "/case-studies" },
  { title: "Help Center", href: "/help" },
  { title: "Community", href: "/community" },
  { title: "Blog", href: "/blog" }
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 glass">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center space-x-2">
            <div className="relative">
              <Brain className="h-8 w-8 text-primary glow" />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
            </div>
            <span className="text-xl font-bold gradient-text">FlowMind</span>
            <Badge variant="secondary" className="ml-2 animate-pulse-slow">
              AI-Powered
            </Badge>
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-8">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">
                  Solutions
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                    {solutions.map((solution) => (
                      <NavigationMenuLink key={solution.title} asChild>
                        <Link
                          href={solution.href}
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                          )}
                        >
                          <div className="flex items-center space-x-2">
                            <solution.icon className="h-4 w-4 text-primary group-hover:text-accent-foreground transition-colors" />
                            <div className="text-sm font-medium leading-none">
                              {solution.title}
                            </div>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground group-hover:text-accent-foreground/80">
                            {solution.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-1 p-4 md:w-[300px]">
                    {resources.map((resource) => (
                      <NavigationMenuLink key={resource.title} asChild>
                        <Link
                          href={resource.href}
                          className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium">{resource.title}</div>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link href="/pricing" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    Pricing
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <Link href="/auth/signin">
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button size="sm" className="glow">
              Start Free Trial
            </Button>
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto glass px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-border/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5 flex items-center space-x-2">
                <Brain className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold gradient-text">FlowMind</span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-border/20">
                <div className="space-y-2 py-6">
                  <Link
                    href="/solutions"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-secondary"
                  >
                    Solutions
                  </Link>
                  <Link
                    href="/pricing"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-secondary"
                  >
                    Pricing
                  </Link>
                  <Link
                    href="/resources"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-secondary"
                  >
                    Resources
                  </Link>
                </div>
                <div className="py-6 space-y-2">
                  <Link href="/auth/signin">
                    <Button variant="ghost" className="w-full justify-start">
                      Sign in
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button className="w-full">
                      Start Free Trial
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}