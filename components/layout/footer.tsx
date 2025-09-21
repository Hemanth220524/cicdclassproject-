import Link from "next/link"
import { Briefcase, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-6 w-6" />
              <span className="text-xl font-bold">FreelanceHub</span>
            </div>
            <p className="text-primary-foreground/80">
              The world's largest freelancing marketplace. Connect with skilled professionals and grow your business.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Clients</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/how-to-hire" className="text-primary-foreground/80 hover:text-primary-foreground">
                  How to Hire
                </Link>
              </li>
              <li>
                <Link href="/talent-marketplace" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Talent Marketplace
                </Link>
              </li>
              <li>
                <Link href="/project-catalog" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Project Catalog
                </Link>
              </li>
              <li>
                <Link href="/enterprise" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Enterprise
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Freelancers</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/how-to-find-work" className="text-primary-foreground/80 hover:text-primary-foreground">
                  How to Find Work
                </Link>
              </li>
              <li>
                <Link href="/direct-contracts" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Direct Contracts
                </Link>
              </li>
              <li>
                <Link href="/find-freelance-jobs" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Find Freelance Jobs
                </Link>
              </li>
              <li>
                <Link href="/freelancer-plus" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Freelancer Plus
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Help & Support
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Resources
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/80 text-sm">© 2024 FreelanceHub. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-primary-foreground/80 hover:text-primary-foreground text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-primary-foreground/80 hover:text-primary-foreground text-sm">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-primary-foreground/80 hover:text-primary-foreground text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
