"use client"

// Payment integration services for Indian payment methods
export interface PaymentMethod {
  id: string
  name: string
  type: "upi" | "wallet" | "bank" | "cod"
  icon: string
  enabled: boolean
}

export interface PaymentRequest {
  amount: number
  currency: "INR"
  orderId: string
  customerInfo: {
    name: string
    email: string
    phone: string
  }
  productInfo: {
    name: string
    description: string
  }
  paymentMethod: string
}

export interface PaymentResponse {
  success: boolean
  transactionId?: string
  paymentUrl?: string
  error?: string
}

// Available payment methods for Indian artisans
export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "upi",
    name: "UPI",
    type: "upi",
    icon: "📱",
    enabled: true,
  },
  {
    id: "phonepe",
    name: "PhonePe",
    type: "upi",
    icon: "💜",
    enabled: true,
  },
  {
    id: "googlepay",
    name: "Google Pay",
    type: "upi",
    icon: "🔵",
    enabled: true,
  },
  {
    id: "paytm",
    name: "Paytm",
    type: "wallet",
    icon: "🔷",
    enabled: true,
  },
  {
    id: "razorpay",
    name: "Razorpay",
    type: "bank",
    icon: "💳",
    enabled: true,
  },
  {
    id: "cod",
    name: "Cash on Delivery",
    type: "cod",
    icon: "💵",
    enabled: true,
  },
]

// Mock payment processing function
export async function processPayment(request: PaymentRequest): Promise<PaymentResponse> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Mock success/failure based on amount (for demo purposes)
  const success = Math.random() > 0.1 // 90% success rate

  if (success) {
    return {
      success: true,
      transactionId: `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`,
      paymentUrl:
        request.paymentMethod === "upi"
          ? `upi://pay?pa=merchant@upi&pn=${encodeURIComponent(request.productInfo.name)}&am=${request.amount}&cu=INR&tn=${request.orderId}`
          : undefined,
    }
  } else {
    return {
      success: false,
      error: "Payment failed. Please try again.",
    }
  }
}

// Generate UPI payment link
export function generateUPILink(merchantUPI: string, amount: number, productName: string, orderId: string): string {
  const params = new URLSearchParams({
    pa: merchantUPI,
    pn: productName,
    am: amount.toString(),
    cu: "INR",
    tn: orderId,
  })

  return `upi://pay?${params.toString()}`
}

// Generate payment QR code for offline transactions
export function generatePaymentQR(merchantUPI: string, amount: number, productName: string): string {
  const upiLink = generateUPILink(merchantUPI, amount, productName, `ORDER${Date.now()}`)
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiLink)}`
}

// Validate UPI ID format
export function validateUPIId(upiId: string): boolean {
  const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/
  return upiRegex.test(upiId)
}

// Format Indian currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}
