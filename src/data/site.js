export const site = {
  name: "Café Fausse",
  tagline: "French cooking for every generation",
  address: ["18 Rue de la Lumière", "New York, NY 10013"],
  phone: "+1 (212) 555-0148",
  phoneHref: "tel:+12125550148",
  email: "hello@cafefausse.com",
  hours: [
    ["Tuesday – Thursday", "5:30 – 10:00 PM"],
    ["Friday – Saturday", "5:30 – 11:00 PM"],
    ["Sunday – Monday", "Closed"],
  ],
};

const unsplash = (id, width = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=85`;

export const images = {
  tableSetting: unsplash("1515003197210-e0cd71810b5f"),
  diningRoom: unsplash("1414235077428-338989a2e8c0", 2000),
  bar: unsplash("1550966871-3ed3cdb5ed0c"),
  interior: unsplash("1517248135467-4c7edcad34c4"),
  plated: unsplash("1547592180-85f173990554"),
  kitchen: unsplash("1533777857889-4be7c70b33f7"),
  team: unsplash("1544148103-0773bf10d330"),
  macarons: unsplash("1560632149-61fa3bb90c91"),
};
