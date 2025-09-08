interface TokenBucket {
  tokens: number
  lastRefill: number
  capacity: number
  refillRate: number
}

class RateLimiter {
  private buckets = new Map<string, TokenBucket>()
  private capacity: number
  private refillRate: number

  constructor(capacity: number = 10, refillRate: number = 1) {
    this.capacity = capacity
    this.refillRate = refillRate // tokens per minute
  }

  private getBucket(key: string): TokenBucket {
    let bucket = this.buckets.get(key)
    if (!bucket) {
      bucket = {
        tokens: this.capacity,
        lastRefill: Date.now(),
        capacity: this.capacity,
        refillRate: this.refillRate
      }
      this.buckets.set(key, bucket)
    }
    return bucket
  }

  private refillBucket(bucket: TokenBucket): void {
    const now = Date.now()
    const timePassed = (now - bucket.lastRefill) / 1000 / 60 // minutes
    const tokensToAdd = Math.floor(timePassed * bucket.refillRate)
    
    if (tokensToAdd > 0) {
      bucket.tokens = Math.min(bucket.capacity, bucket.tokens + tokensToAdd)
      bucket.lastRefill = now
    }
  }

  isAllowed(key: string, tokens: number = 1): boolean {
    const bucket = this.getBucket(key)
    this.refillBucket(bucket)

    if (bucket.tokens >= tokens) {
      bucket.tokens -= tokens
      return true
    }

    return false
  }

  getRemainingTokens(key: string): number {
    const bucket = this.getBucket(key)
    this.refillBucket(bucket)
    return bucket.tokens
  }

  getResetTime(key: string): number {
    const bucket = this.getBucket(key)
    const tokensNeeded = this.capacity - bucket.tokens
    const minutesToRefill = tokensNeeded / bucket.refillRate
    return Date.now() + (minutesToRefill * 60 * 1000)
  }
}

// Global rate limiter instance
export const rateLimiter = new RateLimiter(10, 1) // 10 requests per minute

export function getRateLimitHeaders(key: string) {
  const remaining = rateLimiter.getRemainingTokens(key)
  const resetTime = Math.ceil(rateLimiter.getResetTime(key) / 1000)
  
  return {
    'X-RateLimit-Limit': '10',
    'X-RateLimit-Remaining': remaining.toString(),
    'X-RateLimit-Reset': resetTime.toString()
  }
}