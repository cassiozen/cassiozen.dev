// Cloudflare injects its Web Analytics beacon into the served page. Ad blockers
// cut it off with ERR_BLOCKED_BY_CLIENT. A no-cors fetch of that same URL
// rejects when a blocker is in the way and resolves opaque otherwise.
export const analyticsBlocked = async (): Promise<boolean> => {
  const beacon = document.querySelector<HTMLScriptElement>('script[src*="cloudflareinsights.com"]')
  if (!beacon) return false
  try {
    await fetch(beacon.src, { mode: 'no-cors', cache: 'force-cache' })
    return false
  } catch {
    return true
  }
}
