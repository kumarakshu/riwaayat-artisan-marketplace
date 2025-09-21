import { ProductStory } from "@/components/product-story"

export default function StoryPage({ params }: { params: { productId: string } }) {
  return <ProductStory productId={params.productId} />
}
