import Footer from "../../components/Footer";
export default function PrivacyPage() {
  return (<>
    <div className="min-h-screen bg-gray-50 py-12 normal-font">
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
        <h1 className="text-4xl font-bold mb-8 text-gray-900 heading-font">PRIVACY POLICY</h1>
        <p className="text-gray-600 mb-6">Last updated February 04, 2020</p>

        <div className="prose max-w-none normal-font text-gray-700">
          <p>
            Thank you for choosing to be part of our community at System2 and our partner coaching brands (collectively referred to as
            "we", "us", or "our"). We are committed to protecting your personal information and your right to privacy. If you have any
            questions or concerns about our policy, or our practices with regards to your personal information, please contact us at
            support@system2.fitness.
          </p>

          <p>
            When you visit our website or any websites associated with our partner coaching brands, and use our services, you trust us with
            your personal information. We take your privacy very seriously. In this privacy policy, we describe our privacy practices—what
            information we collect, how we use it, and what rights you have in relation to it.
          </p>

          <h2 className="heading-font">TABLE OF CONTENTS</h2>
          <ul>
            <li>WHAT INFORMATION DO WE COLLECT?</li>
            <li>HOW DO WE USE YOUR INFORMATION?</li>
            <li>WILL YOUR INFORMATION BE SHARED WITH ANYONE?</li>
            <li>DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</li>
            <li>HOW DO WE HANDLE YOUR SOCIAL LOGINS?</li>
            <li>HOW LONG DO WE KEEP YOUR INFORMATION?</li>
            <li>HOW DO WE KEEP YOUR INFORMATION SAFE?</li>
            <li>DO WE COLLECT INFORMATION FROM MINORS?</li>
            <li>WHAT ARE YOUR PRIVACY RIGHTS?</li>
            <li>CONTROLS FOR DO-NOT-TRACK FEATURES</li>
            <li>DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</li>
            <li>DO WE MAKE UPDATES TO THIS POLICY?</li>
            <li>HOW CAN YOU CONTACT US ABOUT THIS POLICY?</li>
          </ul>

          <h2 className="heading-font">1. WHAT INFORMATION DO WE COLLECT?</h2>
          <p className="font-semibold">Personal information you disclose to us:</p>
          <p>
            We collect personal information that you provide to us such as name, contact information, passwords, security data, payment
            information, and social media login data.
          </p>

          <h2 className="heading-font">2. HOW DO WE USE YOUR INFORMATION?</h2>
          <p>
            We use personal information for purposes based on legitimate business interests, the fulfillment of our contract with you,
            compliance with legal obligations, and/or your consent.
          </p>

          <h2 className="heading-font">3. WILL YOUR INFORMATION BE SHARED WITH ANYONE?</h2>
          <p>
            We may share information with vendors, consultants, service providers, business partners, or as required by law.
          </p>

          <h2 className="heading-font">4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</h2>
          <p>
            Yes. We may use cookies and similar technologies to collect and store information.
          </p>

          <h2 className="heading-font">5. HOW DO WE HANDLE YOUR SOCIAL LOGINS?</h2>
          <p>
            If you choose to log in using a social media account, we may have access to certain information depending on your social media
            provider settings.
          </p>

          <h2 className="heading-font">6. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>
          <p>
            We retain your information as long as necessary to fulfill the purposes outlined in this policy unless otherwise required by law.
          </p>

          <h2 className="heading-font">7. HOW DO WE KEEP YOUR INFORMATION SAFE?</h2>
          <p>
            We use organizational and technical security measures to protect your information.
          </p>

          <h2 className="heading-font">8. DO WE COLLECT INFORMATION FROM MINORS?</h2>
          <p>
            We do not knowingly collect data from children under 18.
          </p>

          <h2 className="heading-font">9. WHAT ARE YOUR PRIVACY RIGHTS?</h2>
          <p>
            You may review, update, or delete your account at any time.
          </p>

          <h2 className="heading-font">10. CONTROLS FOR DO-NOT-TRACK FEATURES</h2>
          <p>
            We currently do not respond to Do-Not-Track browser signals.
          </p>

          <h2 className="heading-font">11. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</h2>
          <p>
            Yes. California residents have specific data access rights under state law.
          </p>

          <h2 className="heading-font">12. DO WE MAKE UPDATES TO THIS POLICY?</h2>
          <p>
            Yes. We will update this policy as necessary to remain compliant with relevant laws.
          </p>

          <h2 className="heading-font">13. HOW CAN YOU CONTACT US ABOUT THIS POLICY?</h2>
          <p>
            If you have questions or comments about this policy, email us at support@system2.fitness.
          </p>
        </div>
      </div>

    </div>
                <Footer />
</>
  );
}
