"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Smartphone, Wallet, Banknote, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/contexts/language-context"
import { PAYMENT_METHODS, validateUPIId, generatePaymentQR, type PaymentMethod } from "@/lib/payment-services"

interface PaymentConfig {
  upiId: string
  bankAccount: {
    accountNumber: string
    ifscCode: string
    accountHolder: string
  }
  enabledMethods: string[]
  codAvailable: boolean
}

export function PaymentSetup() {
  const [config, setConfig] = useState<PaymentConfig>({
    upiId: "",
    bankAccount: {
      accountNumber: "",
      ifscCode: "",
      accountHolder: "",
    },
    enabledMethods: ["upi", "cod"],
    codAvailable: true,
  })

  const [activeTab, setActiveTab] = useState("upi")
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()
  const { language } = useLanguage()

  const handleMethodToggle = (methodId: string, enabled: boolean) => {
    setConfig((prev) => ({
      ...prev,
      enabledMethods: enabled
        ? [...prev.enabledMethods, methodId]
        : prev.enabledMethods.filter((id) => id !== methodId),
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)

    // Validate UPI ID if provided
    if (config.upiId && !validateUPIId(config.upiId)) {
      toast({
        title: language === "hi" ? "त्रुटि" : "Error",
        description: language === "hi" ? "कृपया वैध UPI ID दर्ज करें" : "Please enter a valid UPI ID",
        variant: "destructive",
      })
      setIsSaving(false)
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: language === "hi" ? "सफल!" : "Success!",
      description: language === "hi" ? "भुगतान सेटिंग्स सहेजी गईं" : "Payment settings saved successfully",
    })

    setIsSaving(false)
  }

  const getMethodIcon = (method: PaymentMethod) => {
    switch (method.type) {
      case "upi":
        return <Smartphone className="h-5 w-5" />
      case "wallet":
        return <Wallet className="h-5 w-5" />
      case "bank":
        return <CreditCard className="h-5 w-5" />
      case "cod":
        return <Banknote className="h-5 w-5" />
      default:
        return <CreditCard className="h-5 w-5" />
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold flex items-center justify-center space-x-2">
          <CreditCard className="h-8 w-8 text-primary" />
          <span>{language === "hi" ? "भुगतान सेटअप" : "Payment Setup"}</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          {language === "hi"
            ? "अपने ग्राहकों के लिए भुगतान विकल्प कॉन्फ़िगर करें"
            : "Configure payment options for your customers"}
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="upi">UPI Setup</TabsTrigger>
          <TabsTrigger value="bank">Bank Details</TabsTrigger>
          <TabsTrigger value="methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="upi" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Smartphone className="h-6 w-6 text-primary" />
                <span>{language === "hi" ? "UPI कॉन्फ़िगरेशन" : "UPI Configuration"}</span>
              </CardTitle>
              <CardDescription>
                {language === "hi" ? "तत्काल भुगतान के लिए अपनी UPI ID जोड़ें" : "Add your UPI ID for instant payments"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="upi-id">{language === "hi" ? "UPI ID" : "UPI ID"}</Label>
                <Input
                  id="upi-id"
                  placeholder="yourname@paytm"
                  value={config.upiId}
                  onChange={(e) => setConfig((prev) => ({ ...prev, upiId: e.target.value }))}
                />
                <p className="text-sm text-muted-foreground">
                  {language === "hi"
                    ? "उदाहरण: yourname@paytm, yourname@phonepe, yourname@googlepay"
                    : "Example: yourname@paytm, yourname@phonepe, yourname@googlepay"}
                </p>
              </div>

              {config.upiId && (
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{language === "hi" ? "भुगतान QR कोड" : "Payment QR Code"}</h4>
                      <p className="text-sm text-muted-foreground">
                        {language === "hi"
                          ? "ग्राहक इस QR कोड को स्कैन करके भुगतान कर सकते हैं"
                          : "Customers can scan this QR code to make payments"}
                      </p>
                    </div>
                    <div className="text-center">
                      <img
                        src={generatePaymentQR(config.upiId, 100, "Sample Product") || "/placeholder.svg"}
                        alt="Payment QR Code"
                        className="w-20 h-20 border rounded"
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bank" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-6 w-6 text-primary" />
                <span>{language === "hi" ? "बैंक विवरण" : "Bank Details"}</span>
              </CardTitle>
              <CardDescription>
                {language === "hi"
                  ? "बैंक ट्रांसफर के लिए अपने बैंक खाते की जानकारी जोड़ें"
                  : "Add your bank account information for bank transfers"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="account-holder">{language === "hi" ? "खाताधारक का नाम" : "Account Holder Name"}</Label>
                <Input
                  id="account-holder"
                  placeholder={language === "hi" ? "राम कुमार" : "Ram Kumar"}
                  value={config.bankAccount.accountHolder}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      bankAccount: { ...prev.bankAccount, accountHolder: e.target.value },
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="account-number">{language === "hi" ? "खाता संख्या" : "Account Number"}</Label>
                <Input
                  id="account-number"
                  placeholder="1234567890"
                  value={config.bankAccount.accountNumber}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      bankAccount: { ...prev.bankAccount, accountNumber: e.target.value },
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ifsc-code">{language === "hi" ? "IFSC कोड" : "IFSC Code"}</Label>
                <Input
                  id="ifsc-code"
                  placeholder="SBIN0001234"
                  value={config.bankAccount.ifscCode}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      bankAccount: { ...prev.bankAccount, ifscCode: e.target.value },
                    }))
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="methods" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{language === "hi" ? "भुगतान विकल्प" : "Payment Methods"}</CardTitle>
              <CardDescription>
                {language === "hi"
                  ? "अपने ग्राहकों के लिए उपलब्ध भुगतान विकल्प चुनें"
                  : "Choose which payment methods to offer your customers"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {PAYMENT_METHODS.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getMethodIcon(method)}
                      <div>
                        <h4 className="font-medium">{method.name}</h4>
                        <p className="text-sm text-muted-foreground capitalize">
                          {method.type === "upi"
                            ? "UPI Payment"
                            : method.type === "wallet"
                              ? "Digital Wallet"
                              : method.type === "bank"
                                ? "Bank Transfer"
                                : "Cash on Delivery"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {config.enabledMethods.includes(method.id) && (
                        <Badge variant="secondary">
                          <Check className="h-3 w-3 mr-1" />
                          {language === "hi" ? "सक्रिय" : "Active"}
                        </Badge>
                      )}
                      <Switch
                        checked={config.enabledMethods.includes(method.id)}
                        onCheckedChange={(checked) => handleMethodToggle(method.id, checked)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{language === "hi" ? "भुगतान पूर्वावलोकन" : "Payment Preview"}</CardTitle>
              <CardDescription>
                {language === "hi"
                  ? "ग्राहकों को यह भुगतान इंटरफ़ेस दिखाई देगा"
                  : "This is how the payment interface will appear to customers"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-w-md mx-auto border rounded-lg p-6 space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold">Sample Product</h3>
                  <p className="text-2xl font-bold text-primary">₹2,500</p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">{language === "hi" ? "भुगतान विकल्प चुनें" : "Choose Payment Method"}</h4>
                  {PAYMENT_METHODS.filter((method) => config.enabledMethods.includes(method.id)).map((method) => (
                    <Button key={method.id} variant="outline" className="w-full justify-start bg-transparent">
                      {getMethodIcon(method)}
                      <span className="ml-2">{method.name}</span>
                    </Button>
                  ))}
                </div>

                {config.upiId && (
                  <div className="text-center pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-2">
                      {language === "hi" ? "या QR कोड स्कैन करें" : "Or scan QR code"}
                    </p>
                    <img
                      src={generatePaymentQR(config.upiId, 2500, "Sample Product") || "/placeholder.svg"}
                      alt="Payment QR"
                      className="w-24 h-24 mx-auto border rounded"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center">
        <Button size="lg" onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              {language === "hi" ? "सहेजा जा रहा है..." : "Saving..."}
            </>
          ) : (
            <>
              <Check className="h-4 w-4 mr-2" />
              {language === "hi" ? "सेटिंग्स सहेजें" : "Save Settings"}
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
