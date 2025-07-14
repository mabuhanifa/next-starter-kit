"use client";
import Link from "next/link";

export default function CanceledPage() {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Payment Canceled</h1>
      <p className="mb-6">Your order was not completed.</p>
      <Link
        href="/products"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Back to Products
      </Link>
    </div>
  );
}
