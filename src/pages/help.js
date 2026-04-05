export default function Help() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">

      <h1 className="text-3xl font-semibold mb-8">
        Help Center
      </h1>

      <div className="space-y-6 text-gray-600">

        <p>
          Welcome to Ergosits support. We're here to help you with orders, products, and general queries.
        </p>

        <div>
          <h2 className="font-medium text-lg mb-2">Orders</h2>
          <p>Track your order, check status, or report an issue.</p>
        </div>

        <div>
          <h2 className="font-medium text-lg mb-2">Payments</h2>
          <p>We support secure online payments via trusted gateways.</p>
        </div>

        <div>
          <h2 className="font-medium text-lg mb-2">Returns</h2>
          <p>Easy returns within 7 days of delivery.</p>
        </div>

      </div>

    </div>
  );
}