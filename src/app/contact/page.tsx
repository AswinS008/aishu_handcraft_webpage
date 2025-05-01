
import ContactForm from '@/components/contact-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock, Instagram, MessageSquare } from 'lucide-react'; // Added Instagram, MessageSquare
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"; // Import Accordion

export default function ContactPage() {
  return (
    <>
      {/* Top Info Bar - Simplified */}
      <section className="bg-secondary py-4 border-b border-border mb-12 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-sm text-muted-foreground text-center">
             <div className="flex items-center gap-2">
                 <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                 <a href="tel:+919034587332" className="hover:text-primary transition-colors">Phone/WhatsApp: 9034587332</a>
             </div>
            <div className="flex items-center gap-2">
               <Mail className="h-4 w-4 text-accent flex-shrink-0" />
               <a href="mailto:aishu_handcraft@gmail.com" className="hover:text-primary transition-colors text-xs sm:text-sm">aishu_handcraft@gmail.com</a>
            </div>
             <div className="flex items-center gap-2">
                 <Instagram className="h-4 w-4 text-accent flex-shrink-0" />
                 <a href="https://www.instagram.com/house_of_aishu?igsh=MWQ4eW53NnNuaTFnYQ%3D%3D" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">@house_of_aishu</a>
             </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-secondary/30 py-12 mb-12 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-primary mb-2 animate-in fade-in slide-in-from-top duration-500">Contact Us</h1>
          <p className="text-muted-foreground animate-in fade-in slide-in-from-top duration-500 delay-100">📱 DM for enquiries and orders..!!! We'd love to hear from you!</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">

           {/* Contact Information Column */}
           <div className="lg:col-span-1 space-y-6 animate-in fade-in slide-in-from-left duration-500">
             <h2 className="text-2xl font-semibold text-foreground border-b pb-2 mb-4">Get In Touch</h2>
             <div className="space-y-5 text-sm">
               <div className="flex items-start gap-3">
                 <MapPin className="h-5 w-5 mt-0.5 text-accent flex-shrink-0" />
                 <div>
                   <p className="font-medium text-foreground">Address:</p>
                   <p className="text-muted-foreground">359/4 D.D.Road,</p>
                   <p className="text-muted-foreground">Arappalayam,</p>
                   <p className="text-muted-foreground">Madurai - 625016</p>
                 </div>
               </div>
               <div className="flex items-center gap-3">
                 <Phone className="h-5 w-5 text-accent flex-shrink-0" />
                 <div>
                   <p className="font-medium text-foreground">Phone / WhatsApp:</p>
                   <a href="tel:+919034587332" className="text-muted-foreground hover:text-primary transition-colors">9034587332</a>
                    <p className="text-xs text-muted-foreground">(Click to call or message)</p>
                 </div>
               </div>
               <div className="flex items-center gap-3">
                 <Mail className="h-5 w-5 text-accent flex-shrink-0" />
                 <div>
                   <p className="font-medium text-foreground">Email:</p>
                   <a href="mailto:aishu_handcraft@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">aishu_handcraft@gmail.com</a>
                 </div>
               </div>
                 <div className="flex items-center gap-3">
                 <Instagram className="h-5 w-5 text-accent flex-shrink-0" />
                 <div>
                   <p className="font-medium text-foreground">Instagram:</p>
                   <a href="https://www.instagram.com/house_of_aishu?igsh=MWQ4eW53NnNuaTFnYQ%3D%3D" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">@house_of_aishu</a>
                    <p className="text-xs text-muted-foreground">(DM for orders & enquiries)</p>
                 </div>
               </div>
                {/* Removed Business Hours */}
             </div>
           </div>

           {/* Contact Form Column */}
           <div className="lg:col-span-2 space-y-6 animate-in fade-in duration-500 delay-200">
                <h2 className="text-2xl font-semibold text-foreground border-b pb-2 mb-4">Send Us A Message (General Enquiries)</h2>
                <ContactForm /> {/* Use the existing form component */}
           </div>
         </div>

          {/* FAQ Section - Added */}
           <div id="faq-placeholder" className="mt-16 animate-in fade-in slide-in-from-bottom duration-500 delay-400">
              <h2 className="text-2xl font-semibold text-foreground text-center mb-6">Frequently Asked Questions</h2>
               <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto bg-card p-4 sm:p-6 rounded-lg shadow-sm border border-border">
                 <AccordionItem value="item-1">
                   <AccordionTrigger className="text-left hover:no-underline">How do I place an order?</AccordionTrigger>
                   <AccordionContent>
                     Please send us a Direct Message (DM) on Instagram (<a href="https://www.instagram.com/house_of_aishu?igsh=MWQ4eW53NnNuaTFnYQ%3D%3D" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@house_of_aishu</a>) or contact us via WhatsApp (<a href="tel:+919034587332" className="text-primary hover:underline">9034587332</a>) with the product you're interested in. We'll guide you through the process!
                   </AccordionContent>
                 </AccordionItem>
                 <AccordionItem value="item-2">
                   <AccordionTrigger className="text-left hover:no-underline">Do you offer customization?</AccordionTrigger>
                   <AccordionContent>
                     Yes! Many of our items can be customized. Please mention your requirements when you contact us via DM or WhatsApp, and we'll discuss the possibilities.
                   </AccordionContent>
                 </AccordionItem>
                 <AccordionItem value="item-3">
                   <AccordionTrigger className="text-left hover:no-underline">What are the payment options?</AccordionTrigger>
                   <AccordionContent>
                     We typically accept online payments (like GPay, PhonePe, etc.). We will provide payment details once your order is confirmed via DM or WhatsApp.
                   </AccordionContent>
                 </AccordionItem>
                  <AccordionItem value="item-4">
                   <AccordionTrigger className="text-left hover:no-underline">What is the shipping process?</AccordionTrigger>
                   <AccordionContent>
                     Shipping details and charges will be discussed during the order process via DM or WhatsApp, based on your location and the items ordered.
                   </AccordionContent>
                 </AccordionItem>
               </Accordion>
           </div>

           {/* Map Section - Full Width Below */}
           <div className="mt-16 animate-in fade-in slide-in-from-bottom duration-500 delay-300">
                <h2 className="text-2xl font-semibold text-foreground text-center mb-6">Our Location (Madurai)</h2>
                 {/* Updated Google Maps iframe */}
                 <div className="bg-secondary rounded-lg h-64 md:h-96 w-full flex items-center justify-center text-muted-foreground border border-border shadow-sm overflow-hidden">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.055386545364!2d78.10196707488334!3d9.93058219017507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c5b8c5b127ff%3A0xf1565e4cb8b61899!2sArappalayam%2C%20Madurai%2C%20Tamil%20Nadu%20625016!5e0!3m2!1sen!2sin!4v1721469886188!5m2!1sen!2sin" // Updated Map Embed URL
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Aishu's Handcraft Location">
                     </iframe>
                 </div>
           </div>

      </section>
    </>
  );
}
