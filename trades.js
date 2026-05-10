export const TRADES = [
  { label: 'Select a Trade...', value: '' },
  { label: 'Lawn Care', value: 'lawn_care' },
  { label: 'Fencing', value: 'fencing' },
  { label: 'Painting', value: 'painting' },
  { label: 'Plumbing', value: 'plumbing' },
  { label: 'Electrical', value: 'electrical' },
  { label: 'Carpentry', value: 'carpentry' },
  { label: 'Roofing', value: 'roofing' },
  { label: 'HVAC', value: 'hvac' },
  { label: 'Pressure Washing', value: 'pressure_washing' },
  { label: 'Handyman', value: 'handyman' },
  { label: 'Concrete / Masonry', value: 'concrete' },
  { label: 'Tree Service', value: 'tree_service' },
  { label: 'Pool Service', value: 'pool_service' },
  { label: 'Cleaning Service', value: 'cleaning' },
  { label: 'Other', value: 'other' },
];

export const TRADE_LABELS = TRADES
  .filter(t => t.value !== '' && t.value !== 'other')
  .map(t => t.label);