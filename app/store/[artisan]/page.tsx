import { ArtisanStore } from "@/components/artisan-store"

export default function StorePage({ params }: { params: { artisan: string } }) {
  return <ArtisanStore artisanSlug={params.artisan} />
}
