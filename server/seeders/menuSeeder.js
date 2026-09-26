import mongoose from 'mongoose';
import Menu from '../models/menu.js';
import dbConnect from '../config/database.js';

const menuItems = [
  // ==================== APPETIZERS & STARTERS ====================
  {
    name: 'Paneer Tikka',
    description: 'Charcoal-grilled cottage cheese cubes marinated in spiced yogurt with crunchy bell peppers and onions.',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=1617&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 320,
    category: 'Appetizers',
    isAvailable: true,
  },
  {
    name: 'Vegetable Samosa (2 Pcs)',
    description: 'Crisp golden pastry pockets stuffed with spiced potatoes, green peas, and served with mint & tamarind chutney.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
    price: 140,
    category: 'Appetizers',
    isAvailable: true,
  },
  {
    name: 'Crispy Veg Spring Rolls',
    description: 'Deep-fried golden pastry rolls filled with shredded cabbage, carrots, and glass noodles with sweet chili dip.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
    price: 190,
    category: 'Appetizers',
    isAvailable: true,
  },
  {
    name: 'Mozzarella Cheese Sticks',
    description: 'Crispy breaded mozzarella fingers fried golden brown, served hot with tangy Italian marinara sauce.',
    image: 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?w=800&auto=format&fit=crop&q=80',
    price: 220,
    category: 'Appetizers',
    isAvailable: true,
  },
  {
    name: 'Tomato Basil Bruschetta',
    description: 'Garlic-rubbed toasted artisanal baguette slices topped with diced Roma tomatoes, fresh basil, and extra virgin olive oil.',
    image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=800&auto=format&fit=crop&q=80',
    price: 230,
    category: 'Appetizers',
    isAvailable: true,
  },
  {
    name: 'Crispy Veg Manchurian Dry',
    description: 'Crispy vegetable dumplings tossed with ginger, garlic, spring onions, and oriental dark soy sauce.',
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&auto=format&fit=crop&q=80',
    price: 260,
    category: 'Appetizers',
    isAvailable: true,
  },
  {
    name: 'Hara Bhara Kabab',
    description: 'Pan-fried spiced patties of spinach, green peas, mashed potatoes, and fresh aromatic herbs.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80',
    price: 210,
    category: 'Appetizers',
    isAvailable: true,
  },
  {
    name: 'Hummus with Pita Bread',
    description: 'Creamy homemade chickpea tahini dip served with warm garlic pita wedges and Kalamata olives.',
    image: 'https://images.unsplash.com/photo-1577906096429-f73c2c312435?w=800&auto=format&fit=crop&q=80',
    price: 240,
    category: 'Appetizers',
    isAvailable: true,
  },
  {
    name: 'Cheesy Garlic Bread',
    description: 'Toasted French baguette loaded with melted mozzarella, roasted garlic butter, and Italian herbs.',
    image: 'https://images.unsplash.com/photo-1619860860774-1e2e17343432?w=800&auto=format&fit=crop&q=80',
    price: 180,
    category: 'Appetizers',
    isAvailable: true,
  },

  // ==================== SOUPS ====================
  {
    name: 'Cream of Tomato Soup',
    description: 'Slow-simmered vine-ripened tomatoes blended with fresh cream, served with crispy herb croutons.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80',
    price: 160,
    category: 'Soups',
    isAvailable: true,
  },
  {
    name: 'Sweet Corn Veg Soup',
    description: 'Classic comforting soup with tender sweet corn kernels and diced fresh garden vegetables.',
    image: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?w=800&auto=format&fit=crop&q=80',
    price: 170,
    category: 'Soups',
    isAvailable: true,
  },
  {
    name: 'Hot & Sour Veg Soup',
    description: 'Spicy and tangy Chinese broth loaded with mushrooms, tofu, bamboo shoots, and green chili vinegar.',
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&auto=format&fit=crop&q=80',
    price: 180,
    category: 'Soups',
    isAvailable: true,
  },
  {
    name: 'Creamy Wild Mushroom Soup',
    description: 'Rich purée of roasted button and cremini mushrooms infused with garlic thyme and double cream.',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=800&auto=format&fit=crop&q=80',
    price: 190,
    category: 'Soups',
    isAvailable: true,
  },

  // ==================== MAIN COURSES ====================
  {
    name: 'Paneer Butter Masala',
    description: 'Soft cottage cheese cubes simmered in a luscious, velvety tomato-cashew gravy with real butter.',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&auto=format&fit=crop&q=80',
    price: 340,
    category: 'Main Courses',
    isAvailable: true,
  },
  {
    name: 'Dal Makhani',
    description: 'Slow-cooked whole black lentils and kidney beans simmered overnight with butter and fresh cream.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80',
    price: 290,
    category: 'Main Courses',
    isAvailable: true,
  },
  {
    name: 'Royal Shahi Paneer',
    description: 'Mughlai style cottage cheese prepared in an aromatic white gravy of ground cashews, almonds, and saffron.',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop&q=80',
    price: 360,
    category: 'Main Courses',
    isAvailable: true,
  },
  {
    name: 'Palak Paneer',
    description: 'Fresh cottage cheese cubes cooked in a vibrant spiced spinach purée with garlic and roasted cumin.',
    image: 'https://images.unsplash.com/photo-1613292443284-c770284ad2d5?w=800&auto=format&fit=crop&q=80',
    price: 330,
    category: 'Main Courses',
    isAvailable: true,
  },
  {
    name: 'Kadhai Paneer',
    description: 'Paneer cubes tossed with chunky bell peppers, onions, and freshly crushed coriander-cumin masala in a wok.',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&auto=format&fit=crop&q=80',
    price: 340,
    category: 'Main Courses',
    isAvailable: true,
  },
  {
    name: 'Yellow Dal Tadka',
    description: 'Yellow lentils tempered with ghee, cumin seeds, garlic, dried red chilies, and fresh coriander.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80',
    price: 240,
    category: 'Main Courses',
    isAvailable: true,
  },
  {
    name: 'Hyderabadi Veg Dum Biryani',
    description: 'Layered basmati rice cooked on dum with marinated vegetables, saffron, caramelized onions, and raita.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
    price: 320,
    category: 'Main Courses',
    isAvailable: true,
  },
  {
    name: 'Classic Margherita Pizza',
    description: '12-inch hand-tossed pizza crust with San Marzano tomato sauce, fresh buffalo mozzarella, and basil.',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&auto=format&fit=crop&q=80',
    price: 380,
    category: 'Main Courses',
    isAvailable: true,
  },
  {
    name: 'Gourmet Veggie Burger',
    description: 'Handmade spiced vegetable patty layered with crisp lettuce, cheddar slice, tomatoes, and herb mayo in a brioche bun.',
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=800&auto=format&fit=crop&q=80',
    price: 260,
    category: 'Main Courses',
    isAvailable: true,
  },
  {
    name: 'Penne Alfredo with Mushrooms',
    description: 'Italian penne pasta tossed in a velvety parmesan garlic cream sauce with sautéed mushrooms.',
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=800&auto=format&fit=crop&q=80',
    price: 340,
    category: 'Main Courses',
    isAvailable: true,
  },
  {
    name: 'Hakka Veg Hakka Noodles',
    description: 'Wok-tossed noodles with colorful julienned vegetables, spring onions, and light soy sauce.',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&auto=format&fit=crop&q=80',
    price: 250,
    category: 'Main Courses',
    isAvailable: true,
  },
  {
    name: 'Veg Fried Rice',
    description: 'Fragrant steamed rice wok-fried with finely chopped carrots, beans, baby corn, and toasted sesame oil.',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&auto=format&fit=crop&q=80',
    price: 240,
    category: 'Main Courses',
    isAvailable: true,
  },

  // ==================== SOUTH INDIAN SPECIALS ====================
  {
    name: 'Special Mysore Masala Dosa',
    description: 'Crispy golden fermented crepe layered with spicy red chutney, spiced potato mash, served with sambar & 3 chutneys.',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&auto=format&fit=crop&q=80',
    price: 190,
    category: 'South Indian',
    isAvailable: true,
  },
  {
    name: 'Steamed Idli Sambar (3 Pcs)',
    description: 'Fluffy steamed rice & lentil cakes served with steaming hot vegetable sambar and fresh coconut chutney.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80',
    price: 130,
    category: 'South Indian',
    isAvailable: true,
  },
  {
    name: 'Crispy Medu Vada (2 Pcs)',
    description: 'Crispy golden lentil fritters with soft fluffy center, served with sambar and freshly ground chutneys.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80',
    price: 140,
    category: 'South Indian',
    isAvailable: true,
  },
  {
    name: 'Cheese Corn Dosa',
    description: 'Crispy dosa filled with sweet golden corn and overflowing melted cheddar cheese.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80',
    price: 220,
    category: 'South Indian',
    isAvailable: true,
  },

  // ==================== BREADS & ROTIS ====================
  {
    name: 'Garlic Butter Naan',
    description: 'Clay-oven baked leavened bread brushed generously with garlic butter and fresh chopped coriander.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
    price: 80,
    category: 'Breads & Rotis',
    isAvailable: true,
  },
  {
    name: 'Butter Naan',
    description: 'Soft and pillowy leavened flatbread baked in the tandoor and brushed with salted butter.',
    image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800&auto=format&fit=crop&q=80',
    price: 70,
    category: 'Breads & Rotis',
    isAvailable: true,
  },
  {
    name: 'Tandoori Roti (Butter)',
    description: 'Traditional whole wheat flatbread baked crisp in clay tandoor with a dollop of butter.',
    image: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=800&auto=format&fit=crop&q=80',
    price: 45,
    category: 'Breads & Rotis',
    isAvailable: true,
  },
  {
    name: 'Aloo Stuffed Paratha',
    description: 'Whole wheat flatbread stuffed with spiced mashed potatoes, roasted on tawa with desi ghee.',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&auto=format&fit=crop&q=80',
    price: 110,
    category: 'Breads & Rotis',
    isAvailable: true,
  },
  {
    name: 'Laccha Paratha',
    description: 'Multi-layered flaky whole wheat bread cooked golden crisp on a griddle with ghee.',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop&q=80',
    price: 85,
    category: 'Breads & Rotis',
    isAvailable: true,
  },

  // ==================== DESSERTS ====================
  {
    name: 'Warm Gulab Jamun (2 Pcs)',
    description: 'Deep-fried golden milk solids soaked in warm cardamom and rose water infused sugar syrup.',
    image: 'https://images.unsplash.com/photo-1593798688463-c7943ce0446b?w=800&auto=format&fit=crop&q=80',
    price: 120,
    category: 'Desserts',
    isAvailable: true,
  },
  {
    name: 'Chocolate Lava Cake with Ice Cream',
    description: 'Warm chocolate sponge cake with rich gooey molten chocolate center, served with vanilla bean ice cream.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80',
    price: 240,
    category: 'Desserts',
    isAvailable: true,
  },
  {
    name: 'Saffron Kheer',
    description: 'Traditional slow-simmered rice pudding enriched with whole milk, saffron, cardamom, and toasted pistachios.',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=800&auto=format&fit=crop&q=80',
    price: 150,
    category: 'Desserts',
    isAvailable: true,
  },
  {
    name: 'Classic New York Cheesecake',
    description: 'Velvety smooth baked cream cheese slice over buttery graham cracker crust with strawberry coulis.',
    image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=800&auto=format&fit=crop&q=80',
    price: 270,
    category: 'Desserts',
    isAvailable: true,
  },
  {
    name: 'Sizzling Brownie with Ice Cream',
    description: 'Warm fudge walnut brownie served on a sizzling platter topped with vanilla ice cream and hot chocolate fudge.',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&auto=format&fit=crop&q=80',
    price: 230,
    category: 'Desserts',
    isAvailable: true,
  },

  // ==================== BEVERAGES ====================
  {
    name: 'Authentic Mango Lassi',
    description: 'Chilled rich yogurt smoothie blended with sweet Alphonso mango pulp, cardamom, and pistachio slivers.',
    image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=800&auto=format&fit=crop&q=80',
    price: 140,
    category: 'Beverages',
    isAvailable: true,
  },
  {
    name: 'Sweet Punjabi Lassi',
    description: 'Traditional thick churned yogurt drink served chilled with a layer of fresh malai and saffron essence.',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800&auto=format&fit=crop&q=80',
    price: 120,
    category: 'Beverages',
    isAvailable: true,
  },
  {
    name: 'Fresh Mint Lime Soda',
    description: 'Refreshing sparkling soda with fresh key lime juice, mint leaves, rock salt, and sugar syrup.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80',
    price: 110,
    category: 'Beverages',
    isAvailable: true,
  },
  {
    name: 'Cold Coffee with Ice Cream',
    description: 'Creamy blended espresso coffee with whole milk, chocolate syrup, topped with vanilla ice cream scoop.',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&auto=format&fit=crop&q=80',
    price: 160,
    category: 'Beverages',
    isAvailable: true,
  },
  {
    name: 'Desi Masala Chai',
    description: 'Freshly brewed strong Indian milk tea infused with crushed ginger, green cardamom, cloves, and cinnamon.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80',
    price: 80,
    category: 'Beverages',
    isAvailable: true,
  },
  {
    name: 'Fresh Valencia Orange Juice',
    description: '100% pure freshly squeezed orange juice served chilled without added sugar or preservatives.',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&auto=format&fit=crop&q=80',
    price: 150,
    category: 'Beverages',
    isAvailable: true,
  },
];

const seedMenu = async () => {
  try {
    await dbConnect();
    console.log('Connected to Database');

    await Menu.deleteMany({});
    console.log('Cleared old mismatched menu items');

    const insertedItems = await Menu.insertMany(menuItems);
    console.log(`Successfully seeded ${insertedItems.length} authentic dishes!`);

    const categories = await Menu.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);

    console.log('\nMenu items summary by category:');
    categories.forEach((cat) => {
      console.log(`  • ${cat._id}: ${cat.count} items`);
    });

    await mongoose.connection.close();
    console.log('\nDatabase connection closed. Seed complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding menu:', error);
    process.exit(1);
  }
};

export { menuItems };

const isDirectRun =
  process.argv[1] && process.argv[1].replace(/\\/g, '/').includes('menuSeeder');
if (isDirectRun) {
  seedMenu();
}