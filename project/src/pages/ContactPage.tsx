import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Here you would normally make an API call to your backend
      // For now, we'll simulate an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form after successful submission
      setFormData({ name: '', email: '', message: '' });
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Get in Touch Section */}
          <div>
            <h2 className="font-bold text-gray-900 dark:text-white text-3xl mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white text-lg mb-2">Email</h3>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Mail className="mr-2" size={20} />
                  <a href="mailto:support@skillswap.com" className="hover:text-teal-600 dark:hover:text-teal-400">
                    support@skillswap.com
                  </a>
                </div>
                <p className="mt-1 text-gray-500 dark:text-gray-400 text-sm">Available 24/7</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 dark:text-white text-lg mb-2">Phone</h3>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Phone className="mr-2" size={20} />
                  <a href="tel:+15551234567" className="hover:text-teal-600 dark:hover:text-teal-400">
                    +1 (555) 123-4567
                  </a>
                </div>
                <p className="mt-1 text-gray-500 dark:text-gray-400 text-sm">Mon-Fri, 9AM-6PM EST</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 dark:text-white text-lg mb-2">Location</h3>
                <div className="flex items-start text-gray-600 dark:text-gray-400">
                  <MapPin className="mr-2 mt-1" size={20} />
                  <div>
                    <p>123 Skill Street</p>
                    <p>San Francisco, CA 94105</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div>
            <h2 className="font-bold text-gray-900 dark:text-white text-3xl mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-1 font-medium text-gray-700 dark:text-gray-300 text-sm">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="block bg-white dark:bg-gray-800 shadow-sm px-3 py-2 border border-gray-300 dark:border-gray-700 focus:border-teal-500 rounded-md focus:outline-none focus:ring-teal-500 w-full text-gray-900 dark:text-white sm:text-sm"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-1 font-medium text-gray-700 dark:text-gray-300 text-sm">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="block bg-white dark:bg-gray-800 shadow-sm px-3 py-2 border border-gray-300 dark:border-gray-700 focus:border-teal-500 rounded-md focus:outline-none focus:ring-teal-500 w-full text-gray-900 dark:text-white sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-1 font-medium text-gray-700 dark:text-gray-300 text-sm">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="block bg-white dark:bg-gray-800 shadow-sm px-3 py-2 border border-gray-300 dark:border-gray-700 focus:border-teal-500 rounded-md focus:outline-none focus:ring-teal-500 w-full text-gray-900 dark:text-white sm:text-sm"
                  placeholder="How can we help you?"
                />
              </div>

              {submitStatus === 'success' && (
                <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-md text-green-800 dark:text-green-200 text-sm">
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 dark:bg-red-900/30 p-3 rounded-md text-red-800 dark:text-red-200 text-sm">
                  There was an error sending your message. Please try again.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex justify-center items-center bg-teal-600 hover:bg-teal-700 disabled:opacity-50 px-4 py-2 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 w-full font-medium text-white text-sm disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;