import { PaymentSetup } from "@/components/payment-setup"

export default function PaymentSetupPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PaymentSetup />
      </div>
    </div>
  )
}
