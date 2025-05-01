
import ContactForm from '@/components/contact-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock } from 'lucide-react'; // Added Clock icon

export default function ContactPage() {
  return (
    <>
      {/* Optional: Breadcrumb or Hero Section like ShionHouse */}
      <section className="bg-secondary py-12 mb-12 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-primary mb-2 animate-in fade-in slide-in-from-top duration-500">Contact Us</h1>
          <p className="text-muted-foreground animate-in fade-in slide-in-from-top duration-500 delay-100">Get in touch, we'd love to hear from you!</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">

           {/* Contact Information Column */}
           <div className="lg:col-span-1 space-y-6 animate-in fade-in slide-in-from-left duration-500">
             <h2 className="text-2xl font-semibold text-foreground border-b pb-2 mb-4">Contact Information</h2>
             <div className="space-y-5 text-sm">
               <div className="flex items-start gap-3">
                 <MapPin className="h-5 w-5 mt-0.5 text-accent flex-shrink-0" />
                 <div>
                   <p className="font-medium text-foreground">Address:</p>
                   <p className="text-muted-foreground">123 Crafty Lane, Handmade City, HC 45678, Somewhere Creative</p>
                 </div>
               </div>
               <div className="flex items-center gap-3">
                 <Phone className="h-5 w-5 text-accent flex-shrink-0" />
                 <div>
                   <p className="font-medium text-foreground">Phone:</p>
                   <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors">+1 (234) 567-890</a>
                 </div>
               </div>
               <div className="flex items-center gap-3">
                 <Mail className="h-5 w-5 text-accent flex-shrink-0" />
                 <div>
                   <p className="font-medium text-foreground">Email:</p>
                   <a href="mailto:hello@girlycrafts.com" className="text-muted-foreground hover:text-primary transition-colors">hello@girlycrafts.com</a>
                 </div>
               </div>
                <div className="flex items-start gap-3">
                 <Clock className="h-5 w-5 mt-0.5 text-accent flex-shrink-0" />
                 <div>
                   <p className="font-medium text-foreground">Business Hours:</p>
                   <p className="text-muted-foreground">Mon - Fri: 9:00 AM - 5:00 PM</p>
                   <p className="text-muted-foreground">Sat: 10:00 AM - 2:00 PM</p>
                   <p className="text-muted-foreground">Sun: Closed</p>
                 </div>
               </div>
             </div>
           </div>

           {/* Contact Form Column */}
           <div className="lg:col-span-2 space-y-6 animate-in fade-in duration-500 delay-200">
                <h2 className="text-2xl font-semibold text-foreground border-b pb-2 mb-4">Send Us A Message</h2>
                <ContactForm /> {/* Use the existing form component */}
           </div>


         </div>

           {/* Map Section - Full Width Below */}
           <div className="mt-16 animate-in fade-in slide-in-from-bottom duration-500 delay-300">
                <h2 className="text-2xl font-semibold text-foreground text-center mb-6">Find Us On The Map</h2>
                 {/* Placeholder for Google Maps iframe */}
                 <div className="bg-secondary rounded-lg h-64 md:h-96 w-full flex items-center justify-center text-muted-foreground border border-border shadow-sm overflow-hidden">
                     {/* Replace with actual map embed code */}
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.81956137500297!3d-6.194741393791434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x6b45e673562806cc!2sJakarta%2C%20Indonesia!5e0!3m2!1sen!2sus!4v1684841645515!5m2!1sen!2sus" // Example Embed URL - Replace with a real one if possible
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Shop Location">
                     </iframe>
                 </div>
           </div>

      </section>
    </>
  );
}
