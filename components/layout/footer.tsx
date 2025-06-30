"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Brain, Mail, Phone, MapPin, Twitter, Linkedin as LinkedIn, Github as GitHub, ArrowRight, Zap, Shield, Users, Building2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const footerSections = [
  {
    title: "Solutions",
    links: [
      { name: "Process Discovery", href: "/solutions/discovery" },
      { name: "Real-time Monitoring", href: "/solutions/monitoring" },
      { name: "AI Optimization", href: "/solutions/optimization" },
      { name: "Workflow Automation", href: "/solutions/automation" },
      { name: "Enterprise Analytics", href: "/solutions/analytics" },
      { name: "Integrations", href: "/integrations" }
    ]
  },
  {
    title: "Industries",
    links: [
      { name: "Manufacturing", href: "/industries/manufacturing" },
      { name: "Healthcare", href: "/industries/healthcare" },
      { name: "Financial Services", href: "/industries/finance" },
      { name: "Technology", href: "/industries/technology" },
      { name: "Retail & E-commerce", href: "/industries/retail" },
      { name: "Professional Services", href: "/industries/services" }
    ]
  },
  {
    title: "Resources",
    links: [
      { name: "Documentation", href: "/docs" },
      { name: "API Reference", href: "/api" },
      { name: "Case Studies", href: "/case-studies" },
      { name: "Blog", href: "/blog" },
      { name: "Help Center", href: "/help" },
      { name: "Community", href: "/community" }
    ]
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "News & Press", href: "/news" },
      { name: "Partners", href: "/partners" },
      { name: "Contact", href: "/contact" },
      { name: "Legal", href: "/legal" }
    ]
  }
];

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@flowmind.ai",
    href: "mailto:hello@flowmind.ai"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567"
  },
  {
    icon: MapPin,
    label: "Address",
    value: "123 Innovation Drive, San Francisco, CA 94105",
    href: "https://maps.google.com"
  }
];

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/flowmind", label: "Twitter" },
  { icon: LinkedIn, href: "https://linkedin.com/company/flowmind", label: "LinkedIn" },
  { icon: GitHub, href: "https://github.com/flowmind", label: "GitHub" }
];

const certifications = [
  { name: "SOC 2 Type II", icon: Shield },
  { name: "ISO 27001", icon: Shield },
  { name: "GDPR Compliant", icon: Shield },
  { name: "HIPAA Ready", icon: Shield }
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-secondary/20 via-background to-secondary/10 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Link href="/" className="flex items-center space-x-3 mb-6">
                  <div className="relative">
                    <Brain className="h-8 w-8 text-primary glow" />
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                  </div>
                  <span className="text-2xl font-bold gradient-text">FlowMind</span>
                  <Badge variant="secondary" className="ml-2">
                    AI-Powered
                  </Badge>
                </Link>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Transform your business operations with AI-driven process discovery, 
                  optimization, and monitoring. Join 500+ enterprise companies already 
                  saving millions with FlowMind.
                </p>
                
                {/* Key Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 glass-card">
                    <Users className="h-5 w-5 text-primary mx-auto mb-1" />
                    <div className="font-bold text-primary">500+</div>
                    <div className="text-xs text-muted-foreground">Customers</div>
                  </div>
                  <div className="text-center p-3 glass-card">
                    <Zap className="h-5 w-5 text-accent mx-auto mb-1" />
                    <div className="font-bold text-accent">99.9%</div>
                    <div className="text-xs text-muted-foreground">Uptime</div>
                  </div>
                  <div className="text-center p-3 glass-card">
                    <Building2 className="h-5 w-5 text-green-400 mx-auto mb-1" />
                    <div className="font-bold text-green-400">$847M</div>
                    <div className="text-xs text-muted-foreground">Saved</div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 glass-card flex items-center justify-center hover:bg-primary/10 transition-colors group"
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Links Columns */}
            {footerSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                >
                  <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          href={link.href}
                          className="text-muted-foreground hover:text-primary transition-colors text-sm group flex items-center"
                        >
                          {link.name}
                          <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="py-12 border-t border-border/50"
        >
          <div className="glass-card p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-2 gradient-text">
                  Stay Updated with FlowMind
                </h3>
                <p className="text-muted-foreground">
                  Get the latest insights on process optimization, AI automation, and industry best practices delivered to your inbox.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Button className="glow">
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact & Certifications */}
        <div className="py-12 border-t border-border/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-semibold mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((contact, index) => (
                  <a
                    key={index}
                    href={contact.href}
                    target={contact.href.startsWith('http') ? '_blank' : undefined}
                    rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <contact.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="text-sm font-medium">{contact.label}</div>
                      <div className="text-sm">{contact.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Security Certifications */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="font-semibold mb-6">Security & Compliance</h3>
              <div className="grid grid-cols-2 gap-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 glass-card hover:glow transition-all duration-300 group">
                    <cert.icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">{cert.name}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Enterprise-grade security and compliance certifications ensure your data is always protected.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="py-8 border-t border-border/50"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-sm text-muted-foreground">
                © {currentYear} FlowMind. All rights reserved.
              </p>
              <div className="flex items-center space-x-6">
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Powered by AI</span>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}