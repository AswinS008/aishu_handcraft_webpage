
import Link from 'next/link';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Assuming newsletter signup

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground border-t border-border/40 pt-16 pb-8">
      <div className="container max-w-screen-2xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

          {/* About Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground mb-3">About GirlyCrafts</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Discover unique handmade treasures crafted with love. We offer a curated collection of accessories and gifts perfect for every girl.
            </p>
             <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent flex-shrink-0" />
                <p className="text-sm">Handmade City, HC 45678</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                 <a href="tel:+1234567890" className="text-sm hover:text-primary transition-colors">+1 (234) 567-890</a>
               </div>
               <div className="flex items-center gap-2">
                 <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                 <a href="mailto:hello@girlycrafts.com" className="text-sm hover:text-primary transition-colors">hello@girlycrafts.com</a>
               </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-foreground mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/?category=Invisible%20neckpiece" className="hover:text-primary transition-colors">Neckpieces</Link></li>
              <li><Link href="/?category=Kundan%20silk%20thread%20bangles" className="hover:text-primary transition-colors">Bangles</Link></li>
              <li><Link href="/?category=Hair%20tie" className="hover:text-primary transition-colors">Hair Accessories</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              {/* Add more links as needed */}
            </ul>
          </div>

          {/* Help & Information */}
           <div className="space-y-2">
             <h4 className="text-lg font-semibold text-foreground mb-3">Help & Info</h4>
             <ul className="space-y-2 text-sm">
               <li><Link href="#" className="hover:text-primary transition-colors">Track Your Order</Link></li>
               <li><Link href="#" className="hover:text-primary transition-colors">Returns & Exchanges</Link></li>
               <li><Link href="#" className="hover:text-primary transition-colors">Shipping Information</Link></li>
               <li><Link href="#" className="hover:text-primary transition-colors">FAQs</Link></li>
               <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
             </ul>
           </div>


          {/* Newsletter Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground mb-3">Newsletter</h4>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for the latest updates and special offers.
            </p>
            <form className="flex gap-2">
              <Input type="email" placeholder="Your email" className="flex-grow bg-background h-10 text-sm" />
              <Button type="submit" variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground h-10">Subscribe</Button>
            </form>
            <div className="flex gap-4 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-border/40 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} GirlyCrafts Showcase. All rights reserved. | Design inspired by ShionHouse.
          </p>
          {/* Optional: Add payment method icons */}
           {/* <div className="flex justify-center gap-4 mt-4">
             <img src="/path/to/visa.png" alt="Visa" className="h-6"/>
             <img src="/path/to/mastercard.png" alt="Mastercard" className="h-6"/>
             <img src="/path/to/paypal.png" alt="Paypal" className="h-6"/>
           </div> */}
        </div>
      </div>
    </footer>
  );
}
```