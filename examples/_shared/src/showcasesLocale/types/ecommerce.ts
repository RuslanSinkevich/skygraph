export interface EcommerceLocale {
  stats: {
    revenue: string
    revenueSub: (orders: number) => string
    pending: string
    pendingSub: string
    activeProducts: string
    activeProductsSub: (total: number) => string
    lowStock: string
    lowStockSub: string
    vip: string
    vipSub: (total: number) => string
  }
  tabs: {
    products: string
    orders: string
    customers: string
    inventory: string
    analytics: string
  }
  products: {
    searchPlaceholder: string
    categoryAll: string
    categoryOptions: {
      electronics: string
      clothing: string
      homeGarden: string
    }
    statusAll: string
    statusOptions: {
      active: string
      draft: string
      archived: string
    }
    sortOptions: {
      featured: string
      sold: string
      priceAsc: string
      priceDesc: string
      rating: string
    }
    views: {
      grid: string
      list: string
    }
    addBtn: string
    showing: (visible: number, total: number) => string
    featured: string
    sale: string
    inStock: (n: number) => string
    lowStockBadge: (n: number) => string
    soldSuffix: string
    marginSuffix: string
    drawer: {
      sku: string
      brand: string
      category: string
      price: string
      cost: string
      margin: string
      stockReserved: string
      available: string
      status: string
      rating: string
      sold: string
      revenue: string
      tagsHeading: string
      stockHealth: string
      descriptionHeading: string
    }
    createTitle: string
    fields: {
      name: string
      namePh: string
      category: string
      categoryPh: string
      brand: string
      brandPh: string
      price: string
      pricePh: string
      stock: string
      stockPh: string
      featured: string
    }
    cancel: string
    create: string
    createdToast: string
  }
  orders: {
    searchPlaceholder: string
    exportBtn: string
    exportToast: string
    columns: {
      order: string
      customer: string
      total: string
      status: string
      date: string
      items: string
    }
    actions: {
      details: string
      refund: string
    }
    summaryPageTotal: string
    detailTitle: (id: string) => string
    close: string
    markPaid: string
    markPaidToast: (id: string) => string
    steps: {
      pending: string
      paid: string
      shipped: string
      delivered: string
      cancelled: string
    }
    descriptions: {
      customer: string
      email: string
      address: string
      date: string
      total: string
      items: string
    }
    itemsHeading: string
    itemsTable: {
      product: string
      qty: string
      price: string
      subtotal: string
    }
    refundTitle: (id: string) => string
    refundFields: {
      order: string
      customer: string
      orderTotal: string
      amount: string
      reason: string
      reasonPh: string
      reasonOptions: {
        defective: string
        wrongItem: string
        request: string
        damage: string
        other: string
      }
    }
    cancel: string
    issueRefund: string
    refundToast: (amount: string, id: string) => string
    statusLabel: Record<string, string>
  }
  customers: {
    searchPlaceholder: string
    exportBtn: string
    exportToast: string
    viewBtn: string
    vipBadge: string
    columns: {
      customer: string
      status: string
      orders: string
      totalSpent: string
      aov: string
      lastOrder: string
      registered: string
    }
    drawer: {
      email: string
      registered: string
      totalOrders: string
      totalSpent: string
      aov: string
      lastOrder: string
      orderHistoryHeading: string
    }
    statusLabel: Record<string, string>
  }
  inventory: {
    cards: {
      out: string
      low: string
      healthy: string
      total: string
    }
    searchPlaceholder: string
    bucketAll: (n: number) => string
    bucketOut: (n: number) => string
    bucketLow: (n: number) => string
    bucketHealthy: (n: number) => string
    exportBtn: string
    exportToast: string
    columns: {
      product: string
      brand: string
      category: string
      onHand: string
      reserved: string
      available: string
      health: string
      status: string
    }
    restockBtn: string
    restockTitle: (name: string) => string
    quantity: string
    supplier: string
    supplierOptions: {
      primary: string
      backup: string
      local: string
    }
    cancel: string
    orderRestock: string
    restockedToast: (qty: number, name: string) => string
    statusLabel: Record<string, string>
  }
  analytics: {
    periods: {
      d7: string
      d30: string
      d90: string
      all: string
    }
    stats: {
      revenue: string
      ordersSub: (n: number) => string
      aov: string
      itemsSub: (n: string) => string
      inventoryValue: string
      inventorySub: (n: number) => string
      vipShare: string
      vipSub: string
    }
    cards: {
      revenueTrend: string
      noData: string
      ordersByStatus: string
      revenueByCategory: string
      topProducts: string
    }
    soldSuffix: string
    marginSuffix: string
  }
}
