import ContactForm from '@/components/contact-form';

export default function ContactPage() {
  return (
    <section className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 text-center text-primary">Contact Us</h1>
      <ContactForm />
    </section>
  );
}
