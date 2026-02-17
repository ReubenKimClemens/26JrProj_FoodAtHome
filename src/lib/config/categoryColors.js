export const categoryColors = {
  'All': { light: '#E7F6F1', dark: '#0FA376' },
  'Produce': { light: '#FFE1CC', dark: '#FF6B00' },
  'Protein': { light: '#FCE9E9', dark: '#DC2626' },
  'Wheat': { light: '#FFEFB0', dark: '#B59100' },
  'Dairy': { light: '#EAEAFC', dark: '#3030E0' },
  'Drinks': { light: '#E6F3FF', dark: '#3C82F6' },
  'Snacks': { light: '#E6F9FD', dark: '#00C0E8' },
  'Pantry': { light: '#EFEEFE', dark: '#6155F5' },
  'Sauces': { light: '#FAEAFC', dark: '#CB30E0' },
  'Spices': { light: '#FFE5E5', dark: '#FF0000' },
  'Leftover': { light: '#E6FAF7', dark: '#00C8B3' },
  'Frozen': { light: '#B0DAFF', dark: '#007CE8' },
  'Misc': { light: '#DADBDD', dark: '#444955' },
  'Dessert': { light: '#FDEDF5', dark: '#EC4899' }
};

export const defaultCategoryColor = { light: '#F3F4F6', dark: '#6B7280' };

export function getCategoryColor(category) {
  return categoryColors[category] || defaultCategoryColor;
}