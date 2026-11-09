import React from "react";

const Disclaimer = () => {
  const sections = [
    {
      title: "1. General Information",
      content:
        "All information provided on ShopNest is published in good faith and for general informational and shopping purposes. We make no warranties regarding the completeness, reliability, or accuracy of this information.",
    },
    {
      title: "2. Product Information",
      content:
        "We try our best to display accurate product descriptions, images, prices, and specifications. However, slight variations in color, appearance, or product details may occur due to screen settings or manufacturer updates.",
    },
    {
      title: "3. Pricing and Availability",
      content:
        "Product prices, offers, and availability are subject to change without prior notice. ShopNest reserves the right to correct pricing errors, update product information, or discontinue products when necessary.",
    },
    {
      title: "4. External Links",
      content:
        "Our website may contain links to third-party websites for additional information or services. ShopNest does not control or take responsibility for the content, privacy policies, or practices of external websites.",
    },
    {
      title: "5. Limitation of Liability",
      content:
        "ShopNest shall not be held responsible for any direct or indirect loss arising from the use of our website, reliance on its information, or temporary interruptions in website services, to the extent permitted by applicable law.",
    },
    {
      title: "6. Payment and Transactions",
      content:
        "Payments made through our platform may be processed by third-party payment service providers. We do not store sensitive payment credentials such as complete card details or banking passwords on our servers.",
    },
    {
      title: "7. Changes to This Disclaimer",
      content:
        "We reserve the right to update or modify this disclaimer at any time. Any changes will be published on this page, and users are encouraged to review it periodically.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-orange-500 text-white text-center py-16 px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Disclaimer</h1>

        <p className="text-lg max-w-2xl mx-auto">
          Important information about using ShopNest and understanding our
          website policies.
        </p>
      </section>

      {/* Introduction */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Welcome to ShopNest
          </h2>

          <p className="text-gray-600 leading-7">
            By accessing and using ShopNest, you acknowledge that you have read
            and understood this disclaimer. The information provided on this
            website is intended to help customers make informed shopping
            decisions.
          </p>
        </div>
      </section>

      {/* Disclaimer Sections */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-white p-7 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {section.title}
              </h3>

              <p className="text-gray-600 leading-7">{section.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Note */}
      <section className="bg-gray-900 text-white text-center py-12 px-6">
        <h2 className="text-2xl font-bold mb-3">
          Thank You for Choosing ShopNest!
        </h2>

        <p className="text-gray-300 max-w-2xl mx-auto">
          We appreciate your trust in ShopNest. Your shopping experience and
          satisfaction are important to us.
        </p>
      </section>
    </div>
  );
};

export default Disclaimer;
