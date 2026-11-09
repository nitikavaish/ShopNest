import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-orange-500 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About ShopNest</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Your one-stop destination for quality products, great deals, and a
          seamless shopping experience.
        </p>
      </section>

      {/* About Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-5">
              Who We Are
            </h2>

            <p className="text-gray-600 leading-7 mb-4">
              ShopNest is an online shopping platform designed to make shopping
              simple, convenient, and enjoyable. We bring a wide range of
              products together so you can find everything you need in one
              place.
            </p>

            <p className="text-gray-600 leading-7">
              Our goal is to provide quality products, affordable prices, and a
              smooth shopping experience for every customer.
            </p>
          </div>

          <div className="bg-orange-100 rounded-2xl p-10 text-center">
            <div className="text-7xl mb-4">🛍️</div>
            <h3 className="text-2xl font-bold text-gray-800">
              Shop Smart, Live Better
            </h3>
            <p className="text-gray-600 mt-3">
              Making online shopping easier, one order at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          <div className="p-8 rounded-xl bg-gray-50 shadow-sm">
            <h2 className="text-2xl font-bold text-orange-500 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-7">
              To make online shopping accessible and convenient by offering a
              diverse range of products with a customer-first approach.
            </p>
          </div>

          <div className="p-8 rounded-xl bg-gray-50 shadow-sm">
            <h2 className="text-2xl font-bold text-orange-500 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-600 leading-7">
              To build a trusted shopping platform where customers enjoy
              quality, convenience, and value with every purchase.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Why Choose ShopNest?
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: "🚚",
              title: "Fast Delivery",
              desc: "Get your favorite products delivered conveniently.",
            },
            {
              icon: "💎",
              title: "Quality Products",
              desc: "Explore products selected with quality in mind.",
            },
            {
              icon: "🔒",
              title: "Secure Shopping",
              desc: "Enjoy a simple and secure shopping experience.",
            },
            {
              icon: "💬",
              title: "Customer Support",
              desc: "We value your experience and feedback.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition text-center"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-6">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white text-center py-16 px-6">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
        <p className="text-gray-300 mb-8">
          Discover products you'll love at ShopNest.
        </p>

        <Link
          to="/shop"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition"
        >
          Explore Products
        </Link>
      </section>
    </div>
  );
};

export default About;
