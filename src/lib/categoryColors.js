export const categoryColors = {
  'All': {
    light: 'var(--category-light-brand-primary)',
    dark: 'var(--category-dark-brand-primary)'
  },
  'Produce': {
    light: 'var(--category-light-produce)',
    dark: 'var(--category-dark-produce)'
  },
  'Protein': {
    light: 'var(--category-light-protein)',
    dark: 'var(--category-dark-protein)'
  },
  'Wheat': {
    light: 'var(--category-light-bread)',
    dark: 'var(--category-dark-bread)'
  },
  'Dairy': {
    light: 'var(--category-light-dairy)',
    dark: 'var(--category-dark-dairy)'
  },
  'Drinks': {
    light: 'var(--category-light-drinks)',
    dark: 'var(--category-dark-drinks)'
  },
  'Snacks': {
    light: 'var(--category-light-snacks)',
    dark: 'var(--category-dark-snacks)'
  },
  'Pantry': {
    light: 'var(--category-light-pantry)',
    dark: 'var(--category-dark-pantry)'
  },
  'Sauces': {
    light: 'var(--category-light-sauces)',
    dark: 'var(--category-dark-sauces)'
  },
  'Spices': {
    light: 'var(--category-light-spices)',
    dark: 'var(--category-dark-spices)'
  },
  'Leftover': {
    light: 'var(--category-light-leftover)',
    dark: 'var(--category-dark-leftover)'
  },
  'Frozen': {
    light: 'var(--category-light-frozen)',
    dark: 'var(--category-dark-frozen)'
  },
  'Misc': {
    light: 'var(--category-light-misc)',
    dark: 'var(--category-dark-misc)'
  },
  'Dessert': {
    light: 'var(--category-light-desserts)',
    dark: 'var(--category-dark-desserts)'
  }
};

export const defaultCategoryColor = {
  light: 'var(--category-light-default)',
  dark: 'var(--category-dark-default)'
};

export function getCategoryColor(category) {
  return categoryColors[category] || defaultCategoryColor;
}
