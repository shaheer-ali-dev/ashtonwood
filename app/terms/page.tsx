import Footer from "../../components/Footer";

export default function TermsPage() {
  return (
    <>
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="absolute top-8 left-8 z-20">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <img
              src="/logo.png"
              alt="AW Logo"
              className="w-16 h-16 md:w-20 md:h-20 object-contain"
             
            />
            <div className="hidden absolute inset-0 bg-transparent text-white flex items-center justify-center font-bold text-lg rounded">
              AW
            </div>
          </div>

          <div className="text-white">
            <div className="text-2xl font-bold whitespace-nowrap text-black heading-font">
              Sculpt <br /> By Ashton
            </div>
          </div>
        </div>
      </div>
<br /><br /><br /><br />
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Terms of Service</h1>

        <div className="prose max-w-none text-gray-700">
          <h2>Baddies Lift Heavy Terms of Service</h2>
          <p>
            Welcome to Baddies Lift Heavy! These Terms of Service ("Terms") govern your use of the
            Baddies Lift Heavy website, mobile application, and online fitness coaching services
            (collectively referred to as the "Service"). By accessing or using the Service, you
            agree to be bound by these Terms. If you do not agree, please do not use the Service.
          </p>

          <h3>1. Eligibility</h3>
          <p>You must be at least 18 years old to use the Service.</p>

          <h3>2. Account Registration</h3>
          <p>
            You agree to provide accurate and complete information when creating an account and are
            responsible for keeping your login details secure.
          </p>

          <h3>3. Online Fitness Coaching Services</h3>
          <p>
            Any fitness or nutritional guidance provided is for informational purposes only and is
            not a replacement for professional medical advice.
          </p>

          <h3>4. Payment and Subscription</h3>
          <p>
            Some features require payment. By subscribing, you agree to the listed fees and terms.
            Subscription fees are non-refundable except as stated in our Refund Policy.
          </p>

          <h3>5. Intellectual Property</h3>
          <p>
            All content on the Service is owned by Baddies Lift Heavy or its licensors and may not
            be reproduced without permission.
          </p>

          <h3>6. Refund Policy</h3>
          <p>
            Refund and cancellation requests must be submitted through the in-app chat. Requests are
            reviewed during business hours. Refunds may be issued at our discretion.
          </p>

          <h3>7. Termination</h3>
          <p>
            We reserve the right to suspend or terminate access to the Service at any time, with or
            without cause.
          </p>

          <h3>8. Changes to Terms</h3>
          <p>
            We may update these Terms at any time. Material changes will receive at least 30 days'
            notice.
          </p>

          <h3>9. Governing Law</h3>
          <p>These Terms are governed by the laws of the United States of America.</p>

          <h3>10. Contact Us</h3>
          <p>If you have questions, contact us at support@system2.fitness</p>

          <p className="mt-6">By using the Service, you agree to these Terms.</p>
        </div>
      </div>
    </div>
                <Footer />
    </>
  );
}