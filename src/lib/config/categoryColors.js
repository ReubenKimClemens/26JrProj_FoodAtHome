export const categoryColors = {
  'All': { bg: '#E7F6F1', text: '#0FA376' },
  'Produce': { bg: '#E8E9FF', text: '#5B5FEF' },
  'Protein': { bg: '#FFE1CC', text: '#FF6B00' },
  'Bread': { bg: '#FFEFB0', text: '#B59100' },
  'Dairy': { bg: '#EAEAFC', text: '#3030E0' },
  'Drinks': { bg: '#E6F3FF', text: '#3C82F6' },
  'Snacks': { bg: '#E6F9FD', text: '#00C0E8' },
  'Pantry': { bg: '#EFEEFE', text: '#6155F5' },
  'Sauces': { bg: '#FAEAFC', text: '#CB30E0' },
  'Spices': { bg: '#FFE5E5', text: '#FF0000' },
  'Leftover': { bg: '#E6FAF7', text: '#00C8B3' },
  'Frozen': { bg: '#B0DAFF', text: '#007CE8' },
  'Misc': { bg: '#DADBDD', text: '#444955' },
  'Dessert': { bg: '#FDEDF5', text: '#EC4899' }
};

export const defaultCategoryColor = { bg: '#F3F4F6', text: '#6B7280' };

export function getCategoryColor(category) {
  return categoryColors[category] || defaultCategoryColor;
}