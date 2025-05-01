
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";
import { useState } from 'react';
import { motion } from 'framer-motion';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(100), // Added max length
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }).max(150), // Added Subject field
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(1000, { message: "Message cannot exceed 1000 characters." }), // Increased max length
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
  const { toast } = useToast();
  // Keep isSubmitting to prevent double-clicks, though mailto is fast
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "", // Default value for subject
      message: "",
    },
  });

  // Updated submit handler to use mailto:
  async function onSubmit(values: FormData) {
    setIsSubmitting(true);

    const mailtoSubject = encodeURIComponent(`Contact Form: ${values.subject}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${values.name}\nEmail: ${values.email}\n\nMessage:\n${values.message}`
    );
    const mailtoHref = `mailto:aishu_handcraft@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

    // Attempt to open the mail client
    window.location.href = mailtoHref;

    // Display success message immediately - sending happens in user's mail client
    toast({
      title: "Opening Email Client",
      description: "Please review and send the email using your default mail application.",
      variant: "default", // Use default variant for informational message
    });

    // Reset form after attempting to open mail client
    form.reset();
    // Reset submitting state shortly after, as mailto is quick
    setTimeout(() => setIsSubmitting(false), 500);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <FormField
               control={form.control}
               name="name"
               render={({ field }) => (
                 <FormItem>
                   <FormLabel className="text-sm font-medium">Your Name</FormLabel>
                   <FormControl>
                     <Input
                       placeholder="Enter your name"
                       {...field}
                       aria-required="true"
                       className="bg-secondary/50 focus:bg-background h-11 text-sm"
                     />
                   </FormControl>
                   <FormMessage />
                 </FormItem>
               )}
             />
             <FormField
               control={form.control}
               name="email"
               render={({ field }) => (
                 <FormItem>
                   <FormLabel className="text-sm font-medium">Your Email</FormLabel>
                   <FormControl>
                     <Input
                       type="email"
                       placeholder="Enter your email address"
                       {...field}
                       aria-required="true"
                       className="bg-secondary/50 focus:bg-background h-11 text-sm"
                      />
                   </FormControl>
                   <FormMessage />
                 </FormItem>
               )}
             />
          </div>
          <FormField
             control={form.control}
             name="subject"
             render={({ field }) => (
               <FormItem>
                 <FormLabel className="text-sm font-medium">Subject</FormLabel>
                 <FormControl>
                   <Input
                     placeholder="What is your message about?"
                     {...field}
                     aria-required="true"
                     className="bg-secondary/50 focus:bg-background h-11 text-sm"
                    />
                 </FormControl>
                 <FormMessage />
               </FormItem>
             )}
           />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your message here..."
                  className="min-h-[150px] bg-secondary/50 focus:bg-background text-sm"
                  {...field}
                  aria-required="true"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <motion.div
           whileHover={{ scale: 1.03 }}
           whileTap={{ scale: 0.97 }}
        >
          <Button
             type="submit"
             className="w-full md:w-auto px-8 py-3 h-auto bg-accent hover:bg-accent/90 text-accent-foreground rounded-full text-base font-semibold transition-transform duration-200 ease-in-out"
             disabled={isSubmitting}
          >
            <Send className="mr-2 h-4 w-4" />
            {isSubmitting ? 'Preparing Email...' : 'Send Message via Email'}
          </Button>
         </motion.div>
      </form>
    </Form>
  );
}
