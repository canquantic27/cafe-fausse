export const menuCategories = [
  { id: "starters", label: "To Start", note: "Small plates to share around the table." },
  { id: "mains", label: "Main Courses", note: "Hearty classics and lighter favourites." },
  { id: "little", label: "Little Gourmets", note: "For guests aged 12 and under. Smaller portions, big flavour." },
  { id: "desserts", label: "Desserts", note: "Save room. Trust us." },
  { id: "drinks", label: "Drinks", note: "Wines by the glass, plus sparkling sodas and mocktails for everyone." },
];

// tags: V = vegetarian, GF = gluten-free, N = contains nuts
export const menuItems = [
  { category: "starters", name: "Golden Onion Soup", description: "Slow-cooked onions, rich broth and a bubbling cheese crouton.", price: 14, tags: ["V"] },
  { category: "starters", name: "Seared Scallops", description: "Silky cauliflower purée, brown butter and crisp pear.", price: 24, tags: ["GF", "N"] },
  { category: "starters", name: "Garden Salad Niçoise", description: "Green beans, new potatoes, olives, soft egg and a lemon dressing.", price: 16, tags: ["V", "GF"] },
  { category: "starters", name: "Warm Bread Basket", description: "Baked every afternoon, with salted Normandy butter.", price: 7, tags: ["V"] },

  { category: "mains", name: "Steak Frites", description: "Grilled sirloin, golden fries and a peppercorn sauce on the side.", price: 42, tags: ["GF"] },
  { category: "mains", name: "Roast Chicken", description: "Free-range chicken, creamy mash, green beans and herb gravy.", price: 32, tags: ["GF"] },
  { category: "mains", name: "Butter-Poached Halibut", description: "Tender fennel, saffron broth and fresh citrus herbs.", price: 42, tags: ["GF"] },
  { category: "mains", name: "Wild Mushroom Risotto", description: "Creamy rice, aged parmesan and a little black truffle.", price: 30, tags: ["V", "GF"] },

  { category: "little", name: "Mini Croque Monsieur", description: "The famous French toasted ham and cheese, with fries.", price: 12, tags: [] },
  { category: "little", name: "Chicken Bites & Mash", description: "Crispy chicken pieces with buttery mashed potato and peas.", price: 13, tags: [] },
  { category: "little", name: "Butter Pasta", description: "Little pasta shells with butter and grated cheese.", price: 10, tags: ["V"] },
  { category: "little", name: "Build-Your-Own Crêpe", description: "Pick strawberries, banana or chocolate. Comes with a scoop of ice cream.", price: 8, tags: ["V"] },

  { category: "desserts", name: "Chocolate Marquise", description: "Dark chocolate, salted caramel and a spoon of crème fraîche.", price: 15, tags: ["V", "GF"] },
  { category: "desserts", name: "Vanilla Crème Brûlée", description: "Crack the caramel top. Served with fresh berries.", price: 14, tags: ["V", "GF"] },
  { category: "desserts", name: "Warm Apple Tarte Tatin", description: "Caramelised apples on puff pastry with vanilla ice cream.", price: 13, tags: ["V"] },

  { category: "drinks", name: "House Wine", description: "A rotating red, white or rosé from small French vineyards. By the glass.", price: 14, tags: [] },
  { category: "drinks", name: "Lavender Lemonade", description: "Fresh lemons, a hint of lavender and sparkling water.", price: 7, tags: [] },
  { category: "drinks", name: "Hot Chocolate à l'Ancienne", description: "Thick, old-fashioned and topped with whipped cream.", price: 6, tags: ["V", "GF"] },
];

export const tagLabels = {
  V: "Vegetarian",
  GF: "Gluten-free",
  N: "Contains nuts",
};
