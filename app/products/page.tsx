/* app/products/page.tsx */
"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

// Define Product interface
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

// Sample products data
const products: Product[] = [
  {
    id: "prod_1",
    name: "Product 1",
    price: 29.99,
    description: "Amazing product 1",
  },
  {
    id: "prod_2",
    name: "Product 2",
    price: 49.99,
    description: "Awesome product 2",
  },
  {
    id: "prod_3",
    name: "Product 3",
    price: 19.99,
    description: "Great product 3",
  },
];

// Cart item interface
interface CartItem {
  product: Product;
  quantity: number;
}

export default function ProductsPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter();

  // Add product to cart
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  // Handle checkout with Stripe
  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;
      if (!stripe) {
        console.error("Stripe failed to initialize");
        return;
      }

      // Create checkout session
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cart }),
      });

      const { sessionId } = await response.json();

      // Redirect to Stripe checkout
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error("Stripe checkout error:", error.message);
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="border p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.product.id} className="flex justify-between mb-2">
                <span>
                  {item.product.name} (x{item.quantity})
                </span>
                <span>${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="font-bold mt-4">
              Total: $
              {cart
                .reduce(
                  (sum, item) => sum + item.product.price * item.quantity,
                  0
                )
                .toFixed(2)}
            </div>
            <button
              onClick={handleCheckout}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              disabled={cart.length === 0}
            >
              Proceed to Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
