import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'FlowMind - AI-Powered Business Process Intelligence',
  description: 'Transform your business operations with AI-driven process discovery, optimization, and monitoring. Enterprise-grade process intelligence platform.',
  keywords: 'business process management, AI optimization, process intelligence, workflow automation, enterprise software',
  authors: [{ name: 'FlowMind Team' }],
  creator: 'FlowMind',
  publisher: 'FlowMind',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://flowmind.ai',
    title: 'FlowMind - AI-Powered Business Process Intelligence',
    description: 'Transform your business operations with AI-driven process discovery, optimization, and monitoring.',
    siteName: 'FlowMind',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FlowMind - AI-Powered Business Process Intelligence',
    description: 'Transform your business operations with AI-driven process discovery, optimization, and monitoring.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              style: {
                background: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                color: 'hsl(var(--card-foreground))',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}