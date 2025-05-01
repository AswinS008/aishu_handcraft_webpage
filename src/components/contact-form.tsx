
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
// Removed Card imports as layout is handled by the page
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

  // Placeholder submit handler
  async function onSubmit(values: FormData) {
    setIsSubmitting(true);
    console.log("Form Submitted:", values);

    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real app, you would send this data to a server/API endpoint
    toast({
      title: "Message Sent Successfully!",
      description: "Thank you for reaching out. We'll get back to you as soon as possible.",
      variant: "default",
    });
    form.reset(); // Reset form after successful submission
    setIsSubmitting(false);
  }

  return (
    // Removed the Card wrapper. Styling/layout now controlled by the parent page.
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
                       className="bg-secondary/50 focus:bg-background h-11 text-sm" // Style like ShionHouse
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
                  className="min-h-[150px] bg-secondary/50 focus:bg-background text-sm" // Style like ShionHouse
                  {...field}
                  aria-required="true"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <motion.div
           whileHover={{ scale: 1.03 }} // Subtle hover effect
           whileTap={{ scale: 0.97 }}   // Subtle tap effect
        >
          <Button
             type="submit"
             className="w-full md:w-auto px-8 py-3 h-auto bg-accent hover:bg-accent/90 text-accent-foreground rounded-full text-base font-semibold transition-transform duration-200 ease-in-out" // ShionHouse button style
             disabled={isSubmitting}
          >
            <Send className="mr-2 h-4 w-4" />
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
         </motion.div>
      </form>
    </Form>
  );
}
