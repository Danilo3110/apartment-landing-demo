// All apartment-specific data in one place. To reuse the site for another property,
// edit this file and the translations in src/i18n.
import {
  AirVent,
  CableCar,
  Car,
  CookingPot,
  Footprints,
  Landmark,
  Mountain,
  MountainSnow,
  PawPrint,
  Trees,
  Tv,
  WashingMachine,
  Wifi,
} from 'lucide-react';

const UNSPLASH = 'https://images.unsplash.com/';

export function photoUrl(id, width) {
  return `${UNSPLASH}${id}?auto=format&fit=crop&w=${width}&q=70`;
}

export function photoSrcSet(id, widths = [640, 960, 1400, 2000]) {
  return widths.map((width) => `${photoUrl(id, width)} ${width}w`).join(', ');
}

export const HERO_PHOTO = 'photo-1470770841072-f978cf4d019e';

// `name` is a translation key. The first five show in the grid, the rest only in the lightbox.
export const PHOTOS = [
  { id: 'photo-1522708323590-d24dbb6b0267', name: 'photo.living' },
  { id: 'photo-1505693416388-ac5ce068fe85', name: 'photo.bedroom' },
  { id: 'photo-1556911220-bff31c812dba', name: 'photo.kitchen' },
  { id: 'photo-1552321554-5fefe8c9ef14', name: 'photo.bathroom' },
  { id: 'photo-1506905925346-21bda4d32df4', name: 'photo.view' },
  { id: 'photo-1441974231531-c6227db76b6e', name: 'photo.forest' },
  { id: 'photo-1502672260266-1c1ef2d93688', name: 'photo.lounge' },
];

export const NAV_ITEMS = [
  { href: '#about', label: 'nav.about' },
  { href: '#gallery', label: 'nav.gallery' },
  { href: '#prices', label: 'nav.prices' },
  { href: '#reviews', label: 'nav.reviews' },
  { href: '#location', label: 'nav.location' },
];

export const AMENITIES = [
  { id: 'amenity.wifi', icon: Wifi },
  { id: 'amenity.parking', icon: Car },
  { id: 'amenity.ac', icon: AirVent },
  { id: 'amenity.kitchen', icon: CookingPot },
  { id: 'amenity.tv', icon: Tv },
  { id: 'amenity.terrace', icon: Trees },
  { id: 'amenity.washer', icon: WashingMachine },
  { id: 'amenity.pets', icon: PawPrint },
];

// Months are zero-based like JavaScript Date (0 = January). Prices are in EUR per night.
export const SEASONS = [
  { id: 'low', months: [3, 4, 5, 8, 9, 10], price: 45 },
  { id: 'summer', months: [6, 7], price: 60 },
  { id: 'winter', months: [11, 0, 1, 2], price: 70 },
];

export const MIN_NIGHTS = 2;
export const MAX_GUESTS = 4;

export const RATING = { score: 4.9, count: 38 };

export const REVIEWS = [
  { id: 'r1', author: 'Marija P.', date: '2026-10-12', rating: 5 },
  { id: 'r2', author: 'Thomas K.', date: '2026-08-03', rating: 5 },
  { id: 'r3', author: 'Ana i Luka', date: '2026-06-21', rating: 5 },
];

export const NEARBY = [
  { id: 'nearby.center', icon: Footprints, minutes: 5, mode: 'walk' },
  { id: 'nearby.gondola', icon: CableCar, minutes: 10, mode: 'walk' },
  { id: 'nearby.tornik', icon: MountainSnow, minutes: 20, mode: 'drive' },
  { id: 'nearby.cave', icon: Mountain, minutes: 25, mode: 'drive' },
  { id: 'nearby.sirogojno', icon: Landmark, minutes: 30, mode: 'drive' },
];

// Placeholder contact details for the demo.
export const CONTACT = {
  phone: '+381 60 000 0000',
  phoneHref: 'tel:+381600000000',
  email: 'kontakt@example.com',
};

export const MAP_QUERY = 'Zlatibor, Srbija';

export function mapEmbedUrl(language) {
  return `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=13&hl=${language}&output=embed`;
}

export const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;
