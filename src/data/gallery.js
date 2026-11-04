import { images } from '@/assets/images';

export const galleryCategories = ['All', 'Mountains', 'Beaches', 'Heritage', 'Cities'];

export const galleryItems = [
  { id: 'himalaya', image: images.gallery.himalaya, alt: 'Snow-capped Himalayan peaks above a valley', category: 'Mountains', caption: 'First light in the Himalayas', size: 'tall' },
  { id: 'ladakh-road', image: images.gallery.ladakhRoad, alt: 'A road winding through the Ladakh landscape', category: 'Mountains', caption: 'The road to Ladakh', size: 'wide' },
  { id: 'kashmir-lake', image: images.gallery.kashmirLake, alt: 'A shikara on Dal Lake in Kashmir', category: 'Mountains', caption: 'Shikara mornings, Srinagar', size: 'square' },
  { id: 'goa', image: images.gallery.goaBeach, alt: 'Palm trees along a Goa beach at sunset', category: 'Beaches', caption: 'Goa, golden hour', size: 'tall' },
  { id: 'kerala', image: images.gallery.keralaBoat, alt: 'A traditional houseboat on the Kerala backwaters', category: 'Beaches', caption: 'Backwater quiet, Alleppey', size: 'wide' },
  { id: 'jaipur', image: images.gallery.jaipur, alt: 'The ornate facade of Hawa Mahal in Jaipur', category: 'Heritage', caption: 'Hawa Mahal, Jaipur', size: 'square' },
  { id: 'dubai', image: images.gallery.dubai, alt: 'Dubai skyline at dusk', category: 'Cities', caption: 'Dubai after dark', size: 'tall' },
  { id: 'bali', image: images.gallery.bali, alt: 'A Balinese temple gate surrounded by greenery', category: 'Heritage', caption: 'Temple gates, Bali', size: 'square' },
  { id: 'maldives', image: images.gallery.maldives, alt: 'Overwater villas in the Maldives', category: 'Beaches', caption: 'Nothing but blue, Maldives', size: 'wide' },
  { id: 'paris', image: images.gallery.paris, alt: 'The Eiffel Tower seen from a Paris street', category: 'Cities', caption: 'An afternoon in Paris', size: 'tall' },
  { id: 'swiss', image: images.gallery.swissAlps, alt: 'An alpine lake with mountains in Switzerland', category: 'Mountains', caption: 'Swiss alpine stillness', size: 'wide' },
  { id: 'thailand', image: images.gallery.thailand, alt: 'A golden temple in Thailand', category: 'Heritage', caption: 'Wat Arun, Bangkok', size: 'square' },
  { id: 'vietnam', image: images.gallery.vietnam, alt: 'Limestone islands in Ha Long Bay, Vietnam', category: 'Beaches', caption: 'Ha Long Bay', size: 'wide' },
  { id: 'camp', image: images.gallery.camp, alt: 'A tent under a starry mountain sky', category: 'Mountains', caption: 'Camp under the stars', size: 'square' },
  { id: 'desert', image: images.gallery.desert, alt: 'Sand dunes at sunset', category: 'Cities', caption: 'Desert safari, Dubai', size: 'tall' },
  { id: 'rishikesh', image: images.gallery.rishikesh, alt: 'The Ganges flowing through Rishikesh', category: 'Heritage', caption: 'Ganga at Rishikesh', size: 'wide' },
];

export default galleryItems;
