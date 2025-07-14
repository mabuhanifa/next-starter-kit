export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Headphones",
    description: "High-quality noise-cancelling headphones",
    price: 299.99,
    currency: "USD",
    image: "/headphones.jpg",
  },
  {
    id: "2",
    name: "Wireless Keyboard",
    description: "Ergonomic wireless keyboard",
    price: 89.99,
    currency: "USD",
    image: "/keyboard.jpg",
  },
  {
    id: "3",
    name: "Smart Watch",
    description: "Fitness tracking smart watch",
    price: 199.99,
    currency: "USD",
    image: "/watch.jpg",
  },
];
