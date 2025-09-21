import { QRGenerator } from "@/components/qr-generator"

export default function QRGeneratorPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-3xl font-bold">StoryTag QR Generator</h1>
            <p className="text-muted-foreground text-lg">
              Create QR codes that tell your craft story - perfect for physical products and exhibitions
            </p>
          </div>
          <QRGenerator />
        </div>
      </div>
    </div>
  )
}
