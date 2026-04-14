export interface Product {
  id: number
  name: string
  category: string[]
  price: number
  stock: number
  status: 'active' | 'draft' | 'archived'
  rating: number
  image: string
}

export interface Order {
  id: string
  customer: string
  email: string
  items: OrderItem[]
  total: number
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
  date: string
  address: string
}

export interface OrderItem {
  productId: number
  name: string
  qty: number
  price: number
}

export interface CategoryNode {
  value: string
  label: string
  children?: CategoryNode[]
}

export const categories: CategoryNode[] = [
  {
    value: 'electronics',
    label: 'Electronics',
    children: [
      {
        value: 'phones',
        label: 'Phones',
        children: [
          { value: 'iphone', label: 'iPhone' },
          { value: 'samsung', label: 'Samsung' },
          { value: 'pixel', label: 'Pixel' },
        ],
      },
      {
        value: 'laptops',
        label: 'Laptops',
        children: [
          { value: 'macbook', label: 'MacBook' },
          { value: 'thinkpad', label: 'ThinkPad' },
          { value: 'dell-xps', label: 'Dell XPS' },
        ],
      },
      { value: 'accessories', label: 'Accessories' },
    ],
  },
  {
    value: 'clothing',
    label: 'Clothing',
    children: [
      { value: 'mens', label: "Men's" },
      { value: 'womens', label: "Women's" },
      { value: 'kids', label: 'Kids' },
    ],
  },
  {
    value: 'home',
    label: 'Home & Garden',
    children: [
      { value: 'furniture', label: 'Furniture' },
      { value: 'kitchen', label: 'Kitchen' },
      { value: 'decor', label: 'Decor' },
    ],
  },
]

const productNames = [
  'Wireless Earbuds Pro', 'Smart Watch Ultra', 'USB-C Hub 7-in-1', 'Mechanical Keyboard',
  'Curved Monitor 32"', '4K Webcam', 'Noise-Cancelling Headphones', 'Portable SSD 1TB',
  'Gaming Mouse', 'Tablet Stand', 'LED Desk Lamp', 'Power Bank 20000mAh',
  'Bluetooth Speaker', 'Laptop Sleeve 15"', 'Screen Protector Pack', 'Wireless Charger Pad',
  'HDMI Cable 4K', 'Ergonomic Chair', 'Standing Desk Mat', 'Ring Light Kit',
]

const customers = ['John Smith', 'Emma Wilson', 'Alex Brown', 'Sarah Davis', 'Mike Johnson', 'Lisa Anderson', 'David Lee', 'Amy Chen']

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export const products: Product[] = productNames.map((name, i) => ({
  id: i + 1,
  name,
  category: [pick(['electronics', 'clothing', 'home']), pick(['phones', 'laptops', 'accessories', 'mens', 'furniture'])],
  price: Math.floor(Math.random() * 500) + 9.99,
  stock: Math.floor(Math.random() * 200),
  status: pick(['active', 'active', 'active', 'draft', 'archived']),
  rating: Math.round((3 + Math.random() * 2) * 10) / 10,
  image: `📦`,
}))

export const orders: Order[] = Array.from({ length: 20 }, (_, i) => {
  const orderItems: OrderItem[] = Array.from({ length: 1 + Math.floor(Math.random() * 3) }, () => {
    const p = pick(products)
    return { productId: p.id, name: p.name, qty: 1 + Math.floor(Math.random() * 3), price: p.price }
  })
  const customer = pick(customers)
  return {
    id: `ORD-${String(1000 + i)}`,
    customer,
    email: `${customer.toLowerCase().replace(' ', '.')}@email.com`,
    items: orderItems,
    total: orderItems.reduce((s, it) => s + it.price * it.qty, 0),
    status: pick(['pending', 'paid', 'shipped', 'delivered', 'delivered', 'cancelled']),
    date: new Date(Date.now() - Math.random() * 60 * 86400000).toISOString().slice(0, 10),
    address: `${100 + i} Main St, City ${pick(['NY', 'CA', 'TX', 'FL', 'WA'])}`,
  }
}).sort((a, b) => b.date.localeCompare(a.date))

export const orderStatusStep: Record<Order['status'], number> = {
  pending: 0,
  paid: 1,
  shipped: 2,
  delivered: 3,
  cancelled: -1,
}
