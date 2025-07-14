"use client";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useEffect } from "react";

export default function SuccessPage() {
  const { clearCart } = useCart();

  // Clear cart on success page load
  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
      <p className="mb-6">Thank you for your purchase.</p>
      <Link
        href="/products"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Back to Products
      </Link>
    </div>
  );
}
