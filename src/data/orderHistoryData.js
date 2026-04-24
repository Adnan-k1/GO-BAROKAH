export const orderHistoryData = [
  {
    id: "ORD-2026-0001",
    invoice_no: "INV/UB/20260420/001",
    created_at: "2026-04-20T10:00:00Z",
    status: "completed",
    payment_method: "Bank Transfer",
    total_amount: 1250000,
    items: [
      { id: 101, name: "Beras Premium 10kg", price: 150000, qty: 5 },
      { id: 102, name: "Minyak Goreng 2L", price: 35000, qty: 10 },
      { id: 103, name: "Gula Pasir 1kg", price: 15000, qty: 10 }
    ]
  },
  {
    id: "ORD-2026-0002",
    invoice_no: "INV/UB/20260421/042",
    created_at: "2026-04-21T14:30:00Z",
    status: "processing", 
    payment_method: "E-Wallet",
    total_amount: 450000,
    items: [
      { id: 104, name: "Tepung Terigu 1kg", price: 12000, qty: 20 },
      { id: 105, name: "Garam Dapur 500g", price: 5000, qty: 42 }
    ]
  },
  {
    id: "ORD-2026-0003",
    invoice_no: "INV/UB/20260422/015",
    created_at: "2026-04-22T08:15:00Z",
    status: "pending", 
    payment_method: "Bank Transfer",
    total_amount: 210000,
    items: [
      { id: 106, name: "Kopi Sachet Pack", price: 70000, qty: 3 }
    ]
  },
  {
    id: "ORD-2026-0004",
    invoice_no: "INV/UB/20260419/088",
    created_at: "2026-04-19T11:20:00Z",
    status: "cancelled", 
    payment_method: "COD",
    total_amount: 500000,
    items: [
      { id: 107, name: "Susu Kaleng", price: 10000, qty: 50 }
    ]
  },
  {
    id: "ORD-2026-0005",
    invoice_no: "INV/UB/20260422/099",
    created_at: "2026-04-22T10:00:00Z",
    status: "shipping", 
    payment_method: "COD",
    total_amount: 300000,
    items: [{ id: 108, name: "Gula Pasir 1kg", price: 15000, qty: 20 }]
  }
];