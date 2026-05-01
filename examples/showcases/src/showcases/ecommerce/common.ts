export const productEmoji: Record<string, string> = {
  Electronics: '🎧',
  Clothing: '👕',
  'Home & Garden': '🪴',
}

export function emojiForProduct(name: string, category: string): string {
  const lower = name.toLowerCase()
  if (lower.includes('keyboard')) return '⌨️'
  if (lower.includes('mouse')) return '🖱️'
  if (lower.includes('webcam') || lower.includes('camera')) return '📷'
  if (lower.includes('headphone') || lower.includes('earbud')) return '🎧'
  if (lower.includes('watch')) return '⌚'
  if (lower.includes('drone')) return '🚁'
  if (lower.includes('lamp') || lower.includes('light')) return '💡'
  if (lower.includes('speaker')) return '🔊'
  if (lower.includes('monitor')) return '🖥️'
  if (lower.includes('chair')) return '🪑'
  if (lower.includes('cable') || lower.includes('hub') || lower.includes('charger')) return '🔌'
  if (lower.includes('ssd') || lower.includes('storage') || lower.includes('drive')) return '💾'
  if (lower.includes('router') || lower.includes('switch') || lower.includes('plug')) return '📡'
  if (lower.includes('vr') || lower.includes('projector')) return '🎮'
  if (lower.includes('mic')) return '🎤'
  return productEmoji[category] ?? '📦'
}
