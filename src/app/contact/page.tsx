
'use client'; // Ensure this page runs on the client

import React, { Suspense } from 'react'; // Import Suspense
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Instagram } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from 'next/image';
import { motion } from 'framer-motion';

// Simple Loading Fallback for Suspense
function ContactLoadingFallback() {
    return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    );
}


function ContactPageContent() {
    const contactInfoVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.15, // Stagger animation
            duration: 0.5,
            ease: "easeOut"
        }
        })
    };

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
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold text-primary mb-2"
              >
                Contact Us
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-muted-foreground"
              >
                📱 DM for enquiries and orders..!!! We'd love to hear from you!
              </motion.p>
            </div>
          </section>

          {/* Main Content Section */}
          <section className="relative container mx-auto px-4 py-8 flex flex-col items-center overflow-hidden">

              {/* Subtle Background Decor Elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5, type: 'spring', stiffness: 50 }}
                className="absolute top-20 -left-20 w-40 h-40 bg-pink-100/30 rounded-full blur-3xl opacity-50 -z-10 animate-pulse delay-100"
              ></motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.7, type: 'spring', stiffness: 50 }}
                className="absolute bottom-40 -right-20 w-32 h-32 bg-blue-100/30 rounded-full blur-3xl opacity-50 -z-10 animate-pulse delay-300"
              ></motion.div>


             {/* Contact Information Card - Centered */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full max-w-3xl mb-16"
              >
                  <Card className="w-full shadow-lg border-border/50">
                      <CardHeader className="pb-4">
                          <CardTitle className="text-2xl font-semibold text-foreground text-center">Get In Touch</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-0 text-sm pt-0">

                           {/* Decorative Image Placeholder (Craft Theme) */}
                           <div className="relative h-48 w-full rounded-t-md overflow-hidden bg-gradient-to-r from-teal-100 to-blue-100 mb-8">
                               <Image
                                   src="/images/contact-banner-craft.jpg"
                                   alt="Contact background with craft elements"
                                   fill
                                   className="object-cover opacity-70"
                                   data-ai-hint="contact desk mail craft paper yarn"
                                   quality={80}
                                />
                           </div>

                          {/* Contact Details Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8 px-4 sm:px-8 pb-8">
                               {/* Address */}
                               <motion.div
                                   className="flex items-start gap-3"
                                   custom={0}
                                   initial="hidden"
                                   animate="visible"
                                   variants={contactInfoVariants}
                               >
                                   <MapPin className="h-6 w-6 mt-0.5 text-accent flex-shrink-0" />
                                   <div>
                                       <p className="font-semibold text-foreground mb-1">Address:</p>
                                       <p className="text-muted-foreground">359/4 D.D.Road,</p>
                                       <p className="text-muted-foreground">Arappalayam,</p>
                                       <p className="text-muted-foreground">Madurai - 625016</p>
                                   </div>
                               </motion.div>
                                {/* Phone */}
                               <motion.div
                                   className="flex items-start gap-3"
                                   custom={1}
                                   initial="hidden"
                                   animate="visible"
                                   variants={contactInfoVariants}
                               >
                                   <Phone className="h-6 w-6 mt-0.5 text-accent flex-shrink-0" />
                                   <div>
                                       <p className="font-semibold text-foreground mb-1">Phone / WhatsApp:</p>
                                       <a href="tel:+919034587332" className="text-muted-foreground hover:text-primary transition-colors block">9034587332</a>
                                       <p className="text-xs text-muted-foreground mt-1">(Click to call or message)</p>
                                   </div>
                               </motion.div>
                               {/* Email */}
                               <motion.div
                                   className="flex items-start gap-3"
                                   custom={2}
                                   initial="hidden"
                                   animate="visible"
                                   variants={contactInfoVariants}
                               >
                                   <Mail className="h-6 w-6 mt-0.5 text-accent flex-shrink-0" />
                                   <div>
                                       <p className="font-semibold text-foreground mb-1">Email:</p>
                                       <a href="mailto:aishu_handcraft@gmail.com" className="text-muted-foreground hover:text-primary transition-colors break-all">aishu_handcraft@gmail.com</a>
                                   </div>
                               </motion.div>
                                {/* Instagram */}
                               <motion.div
                                   className="flex items-start gap-3"
                                   custom={3}
                                   initial="hidden"
                                   animate="visible"
                                   variants={contactInfoVariants}
                                >
                                   <Instagram className="h-6 w-6 mt-0.5 text-accent flex-shrink-0" />
                                   <div>
                                       <p className="font-semibold text-foreground mb-1">Instagram:</p>
                                       <a href="https://www.instagram.com/house_of_aishu?igsh=MWQ4eW53NnNuaTFnYQ%3D%3D" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">@house_of_aishu</a>
                                       <p className="text-xs text-muted-foreground mt-1">(DM for orders & enquiries)</p>
                                   </div>
                               </motion.div>
                           </div>
                      </CardContent>
                  </Card>
              </motion.div>

              {/* FAQ Section */}
               <motion.div
                 initial={{ opacity: 0, y: 50 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.4 }}
                 id="faq-placeholder" className="w-full max-w-3xl mb-16"
                >
                  <h2 className="text-2xl font-semibold text-foreground text-center mb-6">Frequently Asked Questions</h2>
                   <Accordion type="single" collapsible className="w-full bg-card p-4 sm:p-6 rounded-lg shadow-sm border border-border/50">
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
               </motion.div>

               {/* Map Section - Full Width Below */}
               <motion.div
                 initial={{ opacity: 0, y: 50 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.6 }}
                 className="w-full max-w-4xl"
                >
                    <h2 className="text-2xl font-semibold text-foreground text-center mb-6">Our Location (Madurai)</h2>
                     {/* Updated Google Maps iframe */}
                     <div className="bg-secondary rounded-lg h-80 md:h-96 w-full flex items-center justify-center text-muted-foreground border border-border/50 shadow-lg overflow-hidden">
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
               </motion.div>

          </section>
        </>
    );
}

// Wrap the main content in Suspense
export default function ContactPage() {
    return (
        <Suspense fallback={<ContactLoadingFallback />}>
            <ContactPageContent />
        </Suspense>
    );
}
