
import ContactForm from '@/components/contact-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Globe } from 'lucide-react'; // Import icons

export default function ContactPage() {
  return (
    <section className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-10 text-center text-primary animate-in fade-in slide-in-from-top duration-500">
        Contact Us
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Contact Details */}
        <div className="md:col-span-1 space-y-6 animate-in fade-in slide-in-from-left duration-500 delay-100">
          <Card className="shadow-lg border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
                Our Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-1 text-accent flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Address:</p>
                  <p>123 Crafty Lane, Handmade City, HC 45678</p>
                  <p>Somewhere Creative</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Phone:</p>
                  <a href="tel:+1234567890" className="hover:text-primary transition-colors">+1 (234) 567-890</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Email:</p>
                  <a href="mailto:hello@girlycrafts.com" className="hover:text-primary transition-colors">hello@girlycrafts.com</a>
                </div>
              </div>
               <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-accent flex-shrink-0" />
                 <div>
                  <p className="font-semibold text-foreground">Website:</p>
                   <a href="#" className="hover:text-primary transition-colors">www.girlycrafts.com</a> {/* Replace # with actual URL */}
                 </div>
               </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-1 animate-in fade-in duration-500 delay-200">
           <ContactForm />
        </div>

        {/* Map Placeholder */}
        <div className="md:col-span-1 animate-in fade-in slide-in-from-right duration-500 delay-300">
           <Card className="shadow-lg h-full border-primary/20">
             <CardHeader>
               <CardTitle className="text-2xl text-primary flex items-center gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                 Find Us Here
               </CardTitle>
             </CardHeader>
             <CardContent>
                {/* Placeholder for Google Maps iframe or a static map image */}
                <div className="bg-secondary rounded-lg h-64 md:h-full flex items-center justify-center text-muted-foreground">
                    {/* Replace with actual map embed code */}
                    <p className="text-center p-4">Map Area: Embed your Google Maps iframe here for an interactive map, or use a static image.</p>
                    {/* Example iframe structure:
                    <iframe
                      src="YOUR_GOOGLE_MAPS_EMBED_URL"
                      width="100%"
                      height="100%"
                      style={{ border:0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                    */}
                </div>
             </CardContent>
           </Card>
        </div>

      </div>
    </section>
  );
}
