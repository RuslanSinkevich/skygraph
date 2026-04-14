export interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: 'active' | 'draft' | 'archived'
  rating: number
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
  'Wireless Earbuds Pro', 'Smart Watch Ultra', 'USB-C Hub 7-in-1', 'Mechanical Keyboard RGB',
  'Curved Monitor 32"', '4K Webcam HD', 'Noise-Cancelling Headphones', 'Portable SSD 1TB',
  'Gaming Mouse Wireless', 'Tablet Stand Adjustable', 'LED Desk Lamp Smart', 'Power Bank 20000mAh',
  'Bluetooth Speaker Mini', 'Laptop Sleeve 15"', 'Screen Protector Pack 3', 'Wireless Charger Pad',
  'HDMI Cable 4K 2m', 'Ergonomic Office Chair', 'Standing Desk Mat', 'Ring Light Kit Pro',
  'USB Microphone Studio', 'Webcam Cover Slide', 'Cable Management Kit', 'Monitor Arm Dual',
  'Keyboard Wrist Rest', 'Mouse Pad XL', 'Docking Station USB-C', 'External DVD Drive',
  'Network Switch 8-Port', 'WiFi 6 Router', 'Smart Plug 4-Pack', 'Security Camera Indoor',
  'NAS Storage 2-Bay', 'Graphic Tablet 10"', 'Drawing Pen Stylus', 'VR Headset Lite',
  'Drone Mini 4K', 'Action Camera Waterproof', 'Portable Projector', 'Smart Doorbell Camera',
]

const customers = ['John Smith', 'Emma Wilson', 'Alex Brown', 'Sarah Davis', 'Mike Johnson', 'Lisa Anderson', 'David Lee', 'Amy Chen', 'Tom Garcia', 'Rachel Kim', 'Kevin White', 'Maria Santos']

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export const products: Product[] = productNames.map((name, i) => ({
  id: `p${i + 1}`,
  name,
  category: pick(['Electronics', 'Clothing', 'Home & Garden']),
  price: Math.round((Math.random() * 500 + 9.99) * 100) / 100,
  stock: Math.floor(Math.random() * 200),
  status: pick(['active', 'active', 'active', 'draft', 'archived'] as const),
  rating: Math.round((3 + Math.random() * 2) * 10) / 10,
}))

export const orders: Order[] = Array.from({ length: 40 }, (_, i) => {
  const orderItems: OrderItem[] = Array.from({ length: 1 + Math.floor(Math.random() * 4) }, () => {
    const p = pick(products)
    return { name: p.name, qty: 1 + Math.floor(Math.random() * 3), price: p.price }
  })
  const customer = pick(customers)
  return {
    id: `ORD-${String(1000 + i)}`,
    customer,
    email: `${customer.toLowerCase().replace(' ', '.')}@email.com`,
    items: orderItems,
    total: Math.round(orderItems.reduce((s, it) => s + it.price * it.qty, 0) * 100) / 100,
    status: pick(['pending', 'paid', 'shipped', 'delivered', 'delivered', 'cancelled'] as const),
    date: new Date(Date.now() - Math.random() * 90 * 86400000).toISOString().slice(0, 10),
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

export function productToRow(p: Product) {
  return { id: p.id, data: { ...p } as Record<string, unknown> }
}

export function orderToRow(o: Order) {
  return { id: o.id, data: { ...o, itemCount: o.items.length } as Record<string, unknown> }
}
