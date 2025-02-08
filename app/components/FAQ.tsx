"use client"
import { useState } from "react"

const faqs = [
  {
    question: "How do I get started with Portflow?",
    answer:
      "Simply sign up for an account, choose a template, and start uploading your photos. Our intuitive interface will guide you through the process.",
  },
  {
    question: "Can I customize the templates?",
    answer:
      "Yes, all our templates are fully customizable. You can change colors, layouts, and add your own personal touch to make your portfolio unique.",
  },
  {
    question: "Is there a free plan available?",
    answer:
      "We offer a limited free plan that allows you to create a basic portfolio. For more advanced features, check out our premium plans.",
  },
  {
    question: "How can I get help if I'm stuck?",
    answer:
      "We offer comprehensive documentation, video tutorials, and a community forum. For premium users, we also provide priority support.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-cherry text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <button
                className="flex justify-between items-center w-full text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-cherry">{faq.question}</span>
                <span className="ml-6 flex-shrink-0">
                  {openIndex === index ? (
                    <svg className="h-6 w-6 text-cherry" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6 text-cherry" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </span>
              </button>
              {openIndex === index && <div className="mt-2 text-gray-700">{faq.answer}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

