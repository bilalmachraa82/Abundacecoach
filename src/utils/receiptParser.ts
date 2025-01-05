interface ReceiptData {
  amount: number;
  description: string;
  category?: string;
}

export function extractReceiptData(text: string): ReceiptData {
  // Remove special characters and normalize whitespace
  const normalizedText = text.replace(/[^\w\s.,€$]/g, ' ').replace(/\s+/g, ' ');
  
  // Find amount - look for currency symbols and numbers
  const amountMatch = normalizedText.match(/[€$]?\s*\d+[.,]\d{2}/);
  const amount = amountMatch 
    ? parseFloat(amountMatch[0].replace(/[€$\s]/g, '').replace(',', '.'))
    : 0;

  // Extract potential merchant name/description
  const lines = normalizedText.split('\n');
  const description = lines.length > 0 ? lines[0].trim() : 'Unknown Merchant';

  // Try to determine category based on keywords
  const category = determineCategoryFromText(normalizedText);

  return { amount, description, category };
}

function determineCategoryFromText(text: string): string | undefined {
  const lowercaseText = text.toLowerCase();
  
  const categoryKeywords: Record<string, string[]> = {
    groceries: ['supermarket', 'grocery', 'food', 'market'],
    dining: ['restaurant', 'cafe', 'coffee', 'bar'],
    transport: ['gas', 'fuel', 'parking', 'transport'],
    utilities: ['electric', 'water', 'gas', 'internet'],
    shopping: ['store', 'retail', 'mall', 'shop'],
  };

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(keyword => lowercaseText.includes(keyword))) {
      return category;
    }
  }

  return undefined;
}