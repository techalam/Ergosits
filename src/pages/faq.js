export default function FAQ() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">

      <h1 className="text-3xl font-semibold mb-8">
        Frequently Asked Questions
      </h1>

      <div className="space-y-6">

        <div>
          <h2 className="font-medium">How long does delivery take?</h2>
          <p className="text-gray-600 mt-1">3-5 business days.</p>
        </div>

        <div>
          <h2 className="font-medium">Can I return a product?</h2>
          <p className="text-gray-600 mt-1">Yes, within 7 days.</p>
        </div>

        <div>
          <h2 className="font-medium">Do you offer COD?</h2>
          <p className="text-gray-600 mt-1">Currently online payments only.</p>
        </div>

      </div>

    </div>
  );
}