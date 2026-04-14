export type ProductStatus = 'active' | 'draft' | 'archived'

export interface Product {
  id: string
  sku: string
  name: string
  description: string
  category: string
  subcategory: string
  brand: string
  price: number
  cost: number
  margin: number
  stock: number
  reserved: number
  available: number
  status: ProductStatus
  rating: number
  reviews: number
  sold: number
  revenue: number
  weight: number
  tags: string[]
  createdAt: string
  updatedAt: string
  featured: boolean
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

const brands = ['SkyTech', 'NeoBrand', 'CoreWave', 'PrimeGear', 'AlphaLine', 'ZenCraft', 'VoltEdge', 'ProAxis']
const subcategories: Record<string, string[]> = {
  'Electronics': ['Phones', 'Laptops', 'Accessories', 'Audio', 'Cameras'],
  'Clothing': ["Men's", "Women's", 'Kids', 'Sportswear'],
  'Home & Garden': ['Furniture', 'Kitchen', 'Decor', 'Tools'],
}
const tagPool = ['bestseller', 'new', 'sale', 'eco', 'premium', 'limited', 'clearance', 'trending', 'exclusive', 'seasonal']

export const products: Product[] = productNames.map((name, i) => {
  const category = pick(['Electronics', 'Clothing', 'Home & Garden'])
  const price = Math.round((Math.random() * 500 + 9.99) * 100) / 100
  const cost = Math.round(price * (0.3 + Math.random() * 0.4) * 100) / 100
  const stock = Math.floor(Math.random() * 200)
  const reserved = Math.floor(Math.random() * Math.min(stock, 20))
  const sold = Math.floor(Math.random() * 2000)
  const numTags = 1 + Math.floor(Math.random() * 3)
  const tags: string[] = []
  for (let t = 0; t < numTags; t++) {
    const tag = pick(tagPool)
    if (!tags.includes(tag)) tags.push(tag)
  }
  return {
    id: `p${i + 1}`,
    sku: `SKU-${String(10000 + i)}`,
    name,
    description: `High-quality ${name.toLowerCase()} for everyday use. Durable and reliable.`,
    category,
    subcategory: pick(subcategories[category]),
    brand: pick(brands),
    price,
    cost,
    margin: Math.round((1 - cost / price) * 10000) / 100,
    stock,
    reserved,
    available: stock - reserved,
    status: pick(['active', 'active', 'active', 'draft', 'archived'] as const),
    rating: Math.round((3 + Math.random() * 2) * 10) / 10,
    reviews: Math.floor(Math.random() * 500),
    sold,
    revenue: Math.round(sold * price * 100) / 100,
    weight: Math.round((0.1 + Math.random() * 5) * 100) / 100,
    tags,
    createdAt: new Date(Date.now() - Math.random() * 365 * 86400000).toISOString().slice(0, 10),
    updatedAt: new Date(Date.now() - Math.random() * 30 * 86400000).toISOString().slice(0, 10),
    featured: Math.random() > 0.7,
  }
})

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

export interface Customer {
  id: string
  name: string
  email: string
  totalOrders: number
  totalSpent: number
  avgOrderValue: number
  lastOrder: string
  status: 'active' | 'inactive' | 'vip'
  registeredAt: string
}

export const customerList: Customer[] = customers.map((name, i) => {
  const custOrders = orders.filter(o => o.customer === name)
  const spent = custOrders.reduce((s, o) => s + o.total, 0)
  return {
    id: `cust${i + 1}`,
    name,
    email: `${name.toLowerCase().replace(' ', '.')}@email.com`,
    totalOrders: custOrders.length,
    totalSpent: Math.round(spent * 100) / 100,
    avgOrderValue: custOrders.length ? Math.round((spent / custOrders.length) * 100) / 100 : 0,
    lastOrder: custOrders.length ? custOrders.sort((a, b) => b.date.localeCompare(a.date))[0].date : 'N/A',
    status: spent > 2000 ? 'vip' : custOrders.length > 0 ? 'active' : 'inactive',
    registeredAt: new Date(Date.now() - Math.random() * 365 * 86400000).toISOString().slice(0, 10),
  }
})

export function productToRow(p: Product) {
  return { id: p.id, data: { ...p } as Record<string, unknown> }
}

export function orderToRow(o: Order) {
  return { id: o.id, data: { ...o, itemCount: o.items.length } as Record<string, unknown> }
}

export function customerToRow(c: Customer) {
  return { id: c.id, data: { ...c } as Record<string, unknown> }
}
