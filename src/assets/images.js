/**
 * All photography is centralized here.
 * Replace an Unsplash URL with the client's own asset path when the site goes live.
 */
const unsplash = (id, width = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=70`;

export const images = {
  home: {
    hero: unsplash('photo-1506905925346-21bda4d32df4', 1920),
    intro: unsplash('photo-1469854523086-cc02fe5d8800'),
    offer: unsplash('photo-1476514525535-07fb3b4ae5f1'),
    cta: unsplash('photo-1500530855697-b586d89ba3ee', 1600),
    newsletter: unsplash('photo-1488646953014-85cb44e25828'),
  },

  destinations: {
    manali: unsplash('photo-1626621341517-bbf3d9990a23'),
    shimla: unsplash('photo-1593181629936-11c609b8db9b'),
    dharamshala: unsplash('photo-1609920658906-8223bd289001'),
    spiti: unsplash('photo-1597074866923-dc0589150358'),
    kasol: unsplash('photo-1501785888041-af3ef285b470'),
    kashmir: unsplash('photo-1500993855538-c6a99f437aa7'),
    ladakh: unsplash('photo-1581793745862-99fde7fa73d2'),
    rishikesh: unsplash('photo-1590050752117-238cb0fb12b1'),
    jaipur: unsplash('photo-1477587458883-47145ed94245'),
    goa: unsplash('photo-1512343879784-a960bf40e7f2'),
    kerala: unsplash('photo-1602216056096-3b40cc0c9944'),
    amritsar: unsplash('photo-1514222134-b57cbb8ce073'),
    dubai: unsplash('photo-1512453979798-5ea266f8880c'),
    thailand: unsplash('photo-1528181304800-259b08848526'),
    bali: unsplash('photo-1537996194471-e657df975ab4'),
    singapore: unsplash('photo-1525625293386-3f8f99389edd'),
    maldives: unsplash('photo-1514282401047-d79a71a590e8'),
    vietnam: unsplash('photo-1528127269322-539801943592'),
    europe: unsplash('photo-1502602898657-3e91760cbb34'),
    switzerland: unsplash('photo-1530122037265-a5f1f91d3b99'),
  },

  packages: {
    manaliKasol: unsplash('photo-1626621341517-bbf3d9990a23'),
    shimlaManali: unsplash('photo-1593181629936-11c609b8db9b'),
    spitiRoadTrip: unsplash('photo-1597074866923-dc0589150358'),
    ladakhBike: unsplash('photo-1581793745862-99fde7fa73d2'),
    kashmirHoneymoon: unsplash('photo-1566837945700-30057527ade0'),
    dubai: unsplash('photo-1512453979798-5ea266f8880c'),
    thailand: unsplash('photo-1528181304800-259b08848526'),
    bali: unsplash('photo-1537996194471-e657df975ab4'),
    maldives: unsplash('photo-1514282401047-d79a71a590e8'),
    europe: unsplash('photo-1502602898657-3e91760cbb34'),
    dharamshala: unsplash('photo-1609920658906-8223bd289001'),
    kerala: unsplash('photo-1602216056096-3b40cc0c9944'),
    rajasthan: unsplash('photo-1477587458883-47145ed94245'),
    vietnam: unsplash('photo-1528127269322-539801943592'),
    amritsar: unsplash('photo-1514222134-b57cbb8ce073'),
    goa: unsplash('photo-1512343879784-a960bf40e7f2'),
  },

  blog: {
    spiti: unsplash('photo-1597074866923-dc0589150358'),
    dubaiVisa: unsplash('photo-1512453979798-5ea266f8880c'),
    manaliWinter: unsplash('photo-1626621341517-bbf3d9990a23'),
    thailandBudget: unsplash('photo-1528181304800-259b08848526'),
    ladakhPacking: unsplash('photo-1581793745862-99fde7fa73d2'),
    weekendGetaways: unsplash('photo-1464822759023-fed622ff2c3b'),
  },

  about: {
    story: unsplash('photo-1469854523086-cc02fe5d8800'),
    team: unsplash('photo-1522071820081-009f0129c71c'),
    office: unsplash('photo-1497366754035-f200968a6e72'),
    mission: unsplash('photo-1500534314209-a25ddb2bd429'),
  },

  gallery: {
    himalaya: unsplash('photo-1506905925346-21bda4d32df4'),
    ladakhRoad: unsplash('photo-1469854523086-cc02fe5d8800'),
    kashmirLake: unsplash('photo-1566837945700-30057527ade0'),
    goaBeach: unsplash('photo-1512343879784-a960bf40e7f2'),
    keralaBoat: unsplash('photo-1602216056096-3b40cc0c9944'),
    jaipur: unsplash('photo-1477587458883-47145ed94245'),
    dubai: unsplash('photo-1512453979798-5ea266f8880c'),
    bali: unsplash('photo-1537996194471-e657df975ab4'),
    maldives: unsplash('photo-1514282401047-d79a71a590e8'),
    paris: unsplash('photo-1502602898657-3e91760cbb34'),
    swissAlps: unsplash('photo-1530122037265-a5f1f91d3b99'),
    thailand: unsplash('photo-1528181304800-259b08848526'),
    vietnam: unsplash('photo-1528127269322-539801943592'),
    camp: unsplash('photo-1504280390367-361c6d9f38f4'),
    desert: unsplash('photo-1500534314209-a25ddb2bd429'),
    rishikesh: unsplash('photo-1590050752117-238cb0fb12b1'),
  },

  ui: {
    pattern: unsplash('photo-1488646953014-85cb44e25828'),
    map: unsplash('photo-1524661135-423995f22d0b'),
  },
};

export default images;
