/* c8 ignore start */
'use client'
import { useBeerStore } from '@/store'
import { useEffect, useState } from 'react'
import { LoadingScreen } from '@/components/LoadingScreen'
import { Header } from '@/components/Header'
import { ProductCard } from '@/components/ProductCard'
import { Tabs } from '@/components/Tabs'

type FilterType = 'new' | 'popular' | 'recommended'

export default function Home() {
  const { stock, isLoading, fetchStock } = useBeerStore()
  const [activeFilter, setActiveFilter] = useState<FilterType>('new')

  useEffect(() => {
    fetchStock()
  }, [fetchStock])

  const tabs = [
    { key: 'new', label: 'New Taste' },
    { key: 'popular', label: 'Popular' },
    { key: 'recommended', label: 'Recommended' },
  ]

  const getFilteredBeers = () => {
    if (!stock?.beers) return []

    const beersWithRatings = stock.beers.map(beer => ({
      ...beer,
      rating: (Math.random() * 2 + 3)
    }))

    switch (activeFilter) {
      case 'new':
        return beersWithRatings
      case 'popular':
        return beersWithRatings.filter(beer => beer.price > 500)
      case 'recommended':
        return beersWithRatings.filter(beer => beer.quantity > 5)
      default:
        return beersWithRatings
    }
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div>
      <Header
        title="Beer Store"
        subtitle="Choose your favorite beer"
        showProfile={true}
      />

      <main className="min-h-screen flex flex-col">
        <div className="px-6 pb-12 text-sm font-light">
          Welcome to this <b>POC</b> for a beer store!
          <br />
          Please, see the code in my <a href="https://github.com/thelookus/lucas-calvino-frontend-cometa" target="_blank" rel="noopener noreferrer"><b>GitHub</b></a>.
          <br />
          Since this is a POC, I focused in:
          <br />
          - <b>fetch the stock and order data</b> from Firebase.
          - <b>design a mobile-first interface</b>.
          <br />
          I hope you like it! :)
        </div>
        <Tabs
          tabs={tabs}
          activeTab={activeFilter}
          onTabChange={(tab) => setActiveFilter(tab as FilterType)}
        />

        <div className="mt-2 px-6">
          {getFilteredBeers().map((beer, index) => (
            <ProductCard
              key={beer.name}
              name={beer.name}
              total={beer.price}
              thumbnailUrl={beer.thumbnailUrl}
              index={index}
              rating={beer.rating}
              onClick={() => console.log('Clicked on beer:', beer.name)}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
