type RateLimitConfig = {
  interval: number;
  uniqueTokenPerInterval: number;
};

export function rateLimit(options: RateLimitConfig) {
  const tokenCache = new Map<string, number[]>();

  return {
    check: (limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        const now = Date.now();
        const windowStart = now - options.interval;

        const tokenCount = tokenCache.get(token) || [];
        const validTokens = tokenCount.filter(
          (timestamp) => timestamp > windowStart
        );

        if (validTokens.length >= limit) {
          reject(new Error("Rate limit exceeded"));
          return;
        }

        validTokens.push(now);
        tokenCache.set(token, validTokens);

        if (tokenCache.size > options.uniqueTokenPerInterval) {
          tokenCache.clear();
        }

        resolve();
      }),
  };
}
