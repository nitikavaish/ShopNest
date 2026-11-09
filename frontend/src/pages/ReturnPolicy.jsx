import React from "react";

const ReturnPolicy = () => {
  const policies = [
    {
      icon: "📦",
      title: "Return Eligibility",
      description:
        "Products can be returned within 7 days of delivery if they are unused, undamaged, and in their original packaging.",
    },
    {
      icon: "🚫",
      title: "Non-Returnable Items",
      description:
        "Certain products, including personalized items and products marked as non-returnable, cannot be returned.",
    },
    {
      icon: "💰",
      title: "Refund Process",
      description:
        "Once your returned product is received and inspected, we will notify you about your refund status.",
    },
    {
      icon: "🔄",
      title: "Replacement",
      description:
        "If you receive a damaged, defective, or incorrect product, you can request a replacement.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-orange-500 text-white text-center py-16 px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Return & Refund Policy
        </h1>
        <p className="text-lg max-w-2xl mx-auto">
          Your satisfaction matters to us. Learn how returns, replacements, and
          refunds work at ShopNest.
        </p>
      </section>

      {/* Introduction */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Our Return Policy
          </h2>

          <p className="text-gray-600 leading-7">
            At ShopNest, we want you to have a great shopping experience. If you
            are not completely satisfied with your purchase, you may request a
            return or replacement according to the conditions mentioned below.
          </p>
        </div>
      </section>

      {/* Policy Cards */}
      <section className="max-w-5xl mx-auto px-6 pb-12">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
          Return Guidelines
        </h2>

        <div className="grid sm:grid-cols-2 gap-6">
          {policies.map((policy, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-7 shadow-sm hover:shadow-md transition"
            >
              <div className="text-4xl mb-4">{policy.icon}</div>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {policy.title}
              </h3>

              <p className="text-gray-600 leading-7">{policy.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Return Steps */}
      <section className="bg-white py-14 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
            How to Return a Product?
          </h2>

          <div className="space-y-6">
            {[
              "Log in to your ShopNest account.",
              "Go to your orders and select the product you want to return.",
              "Submit a return request with the reason.",
              "Wait for our return approval and instructions.",
              "Once the product is received and inspected, your refund or replacement will be processed.",
            ].map((step, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="bg-orange-500 text-white rounded-full w-9 h-9 flex items-center justify-center shrink-0 font-bold">
                  {index + 1}
                </div>
                <p className="text-gray-600 pt-1 leading-6">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Information */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Important Information
          </h2>

          <ul className="list-disc pl-5 space-y-3 text-gray-600">
            <li>Keep your original invoice and packaging.</li>
            <li>Returned products must meet the eligibility conditions.</li>
            <li>Refund processing time may depend on your payment method.</li>
            <li>
              Shipping charges, if applicable, will be communicated during the
              return process.
            </li>
          </ul>
        </div>
      </section>

      {/* Footer Note */}
      <section className="bg-gray-900 text-white text-center py-12 px-6">
        <h2 className="text-2xl font-bold mb-3">Your Satisfaction Matters!</h2>

        <p className="text-gray-300 max-w-2xl mx-auto">
          Thank you for shopping with ShopNest. We appreciate your trust and
          look forward to serving you again.
        </p>
      </section>
    </div>
  );
};

export default ReturnPolicy;
