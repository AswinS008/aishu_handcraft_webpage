
import Link from 'next/link';
import { Instagram, Mail, Phone, MapPin, MessageSquare } from 'lucide-react'; // Added MessageSquare for WhatsApp/DM
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground border-t border-border/40 pt-16 pb-8">
      <div className="container max-w-screen-2xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

          {/* About Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground mb-3">About Aishu's Handcraft</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
             🌺 Handmades and Customised..!!! 🎁 Return gifts..!!! Unique handmade treasures crafted with love. DM for enquiries and orders..!!!
            </p>
             <div className="flex items-start gap-2"> {/* Use items-start for multi-line address */}
                <MapPin className="h-4 w-4 text-accent flex-shrink-0 mt-1" />
                <p className="text-sm">359/4 D.D.Road,<br/>Arappalayam,<br/>Madurai - 625016</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                 <a href="tel:+919034587332" className="text-sm hover:text-primary transition-colors">9034587332 (WhatsApp)</a>
               </div>
               <div className="flex items-center gap-2">
                 <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                 <a href="mailto:aishu_handcraft@gmail.com" className="text-sm hover:text-primary transition-colors">aishu_handcraft@gmail.com</a>
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
               <li><Link href="/?category=Center%20hair%20clip" className="hover:text-primary transition-colors">Hair Clips</Link></li>
               <li><Link href="/?category=Invisible%20anklet" className="hover:text-primary transition-colors">Anklets</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              {/* Add more links as needed */}
            </ul>
          </div>

          {/* Help & Information */}
           <div className="space-y-2">
             <h4 className="text-lg font-semibold text-foreground mb-3">Help & Info</h4>
             <ul className="space-y-2 text-sm">
                {/* Keep only relevant links for a display-only site */}
               <li><Link href="/contact" className="hover:text-primary transition-colors">How to Order</Link></li>
               <li><Link href="/contact#faq-placeholder" className="hover:text-primary transition-colors">FAQs</Link></li>
               {/* <li><Link href="#" className="hover:text-primary transition-colors">Shipping Information</Link></li> */}
               {/* <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li> */}
             </ul>
           </div>


          {/* Newsletter & Social Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground mb-3">Stay Connected</h4>
             <p className="text-sm text-muted-foreground">
               DM for enquiries and orders on Instagram or WhatsApp!
             </p>
             <div className="flex flex-col gap-3">
                 <Button asChild variant="default" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-10">
                     <a href="https://wa.me/919034587332" target="_blank" rel="noopener noreferrer">
                         <MessageSquare className="mr-2 h-4 w-4" /> WhatsApp Us
                     </a>
                 </Button>
                 <Button asChild variant="outline" className="w-full h-10">
                      <a href="https://www.instagram.com/house_of_aishu?igsh=MWQ4eW53NnNuaTFnYQ%3D%3D" target="_blank" rel="noopener noreferrer">
                         <Instagram className="mr-2 h-4 w-4" /> DM on Instagram
                      </a>
                 </Button>
             </div>
             <div className="flex gap-4 pt-4 justify-center md:justify-start">
                <span className="text-sm text-muted-foreground">Follow us:</span>
               <a href="https://www.instagram.com/house_of_aishu?igsh=MWQ4eW53NnNuaTFnYQ%3D%3D" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                 <Instagram className="h-5 w-5" />
               </a>
                {/* Removed Facebook and Twitter */}
                {/* Removed Newsletter form */}
             </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-border/40 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Aishu's Handcraft. All rights reserved. | 🌺 Handmades and Customised..!!!
          </p>
          {/* Optional: Add payment method icons - Not relevant for DM orders */}
        </div>
      </div>
    </footer>
  );
}
