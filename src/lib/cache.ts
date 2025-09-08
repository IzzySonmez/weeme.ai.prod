import LRU from 'lru-cache'

interface CacheItem<T> {
  data: T
  timestamp: number
}

class Cache<T> {
  private cache: LRU<string, CacheItem<T>>
  private ttl: number

  constructor(maxSize: number = 100, ttlMinutes: number = 15) {
    this.cache = new LRU({ max: maxSize })
    this.ttl = ttlMinutes * 60 * 1000 // Convert to milliseconds
  }

  set(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    })
  }

  get(key: string): T | null {
    const item = this.cache.get(key)
    if (!item) return null

    // Check if item has expired
    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key)
      return null
    }

    return item.data
  }

  has(key: string): boolean {
    const item = this.cache.get(key)
    if (!item) return false

    // Check if item has expired
    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key)
      return false
    }

    return true
  }

  clear(): void {
    this.cache.clear()
  }

  size(): number {
    return this.cache.size
  }
}

// Global cache instances
export const reportCache = new Cache<any>(50, 15) // 15 minutes TTL
export const apiCache = new Cache<any>(200, 5) // 5 minutes TTL for API responses