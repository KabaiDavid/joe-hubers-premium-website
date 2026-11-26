// Menu as published on joehubers.com/menu (November 2026).
// Prices are the website's current figures.

export type MenuItem = { name: string; price?: string; note?: string };
export type MenuGroup = { title: string; intro?: string; items: MenuItem[]; footnote?: string };
export type MenuTab = { id: string; label: string; kicker: string; intro: string; groups: MenuGroup[]; notes?: string[] };

export const COUNTRY_PLATTER = {
  name: 'All You Can Eat Country Platter',
  serving: 'Served family style',
  adult: '$22.99',
  child: '$12.99',
  childAges: 'Children ages 4–11',
  includes: [
    'Country fried chicken',
    'Huber honey ham',
    'Fried biscuits with apple butter',
    'Country slaw or seasonal salad',
    'Chicken & dumplings',
    'Mashed potatoes & gravy',
    'Green beans',
  ],
};

export const MENU: MenuTab[] = [
  {
    id: 'restaurant',
    label: 'Restaurant',
    kicker: 'Dine in',
    intro:
      'Home-style cooking, made from scratch. Every country-style supper comes with all-you-can-eat family-style sides.',
    groups: [
      {
        title: 'The Country Platter',
        intro: 'All you can eat, served family style — country fried chicken and Huber honey ham, biscuits with apple butter, slaw or seasonal salad, chicken & dumplings, mashed potatoes & gravy and green beans.',
        items: [
          { name: 'Adult', price: '$22.99' },
          { name: 'Child, ages 4–11', price: '$12.99' },
        ],
      },
      {
        title: 'Country Style Supper',
        intro: 'Each entrée includes all-you-can-eat family-style sides: biscuits, chicken & dumplings, mashed potatoes & gravy and green beans.',
        items: [
          { name: '2 Piece Fried Chicken', price: '$18.99', note: 'All white meat +$1.00 · add a piece +$1.60' },
          { name: 'Chicken Livers', price: '$17.99', note: 'Add a piece of chicken +$1.60' },
          { name: 'Grilled or Fried Chicken Breast', price: '$18.99' },
          { name: 'Country Fried Steak', price: '$19.99' },
          { name: 'Chicken Tenders Meal', price: '$17.99' },
          { name: 'Grilled Pork Chops', price: '$23.99' },
          { name: 'Farm Raised Catfish Fillets', price: '$23.99' },
          { name: 'Iceland Cod, grilled or fried', price: '$23.99' },
          { name: 'Huber Honey Ham', price: '$18.99' },
          { name: 'Country Ham', price: '$18.99' },
        ],
        footnote: 'Extra individual 6 oz “U-Pick” side $2.29',
      },
      {
        title: 'Appetizers',
        items: [
          { name: '6 Potato Skins', price: '$10.99' },
          { name: 'Cheesy Fries', price: '$10.99' },
          { name: '8 Huber Hot Wings', price: '$10.99' },
          { name: '5 Chicken Tenders', price: '$12.99', note: 'Buffalo style $13.99' },
          { name: 'Fried Chicken Livers', price: '$12.99' },
          { name: 'Onion Rings', price: '$10.99' },
          { name: 'Fried Zucchini', price: '$10.99' },
          { name: 'Fried Green Tomatoes', price: '$10.99' },
        ],
      },
      {
        title: 'Salads & Vegetables',
        items: [
          { name: 'Garden Side Salad', price: '$6.99' },
          { name: 'Grilled or Country Fried Chicken Salad', price: '$17.99' },
          { name: 'Garden Salad', price: '$11.99' },
          { name: 'Country Vegetable Plate', price: '$17.99', note: 'Choose 4 sides' },
        ],
      },
      {
        title: 'Sandwiches',
        intro: 'Served with homemade chips. Substitute any “U-Pick” side +$2.29.',
        items: [
          { name: 'Chicken Breast', price: '$15.99', note: 'Grilled, fried or BBQ' },
          { name: 'Buffalo Style Fried Chicken', price: '$15.99' },
          { name: 'Huber Honey Ham & Swiss', price: '$14.99' },
          { name: 'Grilled or Fried Iceland Cod', price: '$16.99' },
          { name: 'Cheeseburger', price: '$15.99' },
          { name: 'Hamburger', price: '$15.99' },
          { name: 'Reuben', price: '$15.99' },
          { name: 'Chicken Club Wrap', price: '$16.99' },
        ],
      },
      {
        title: 'Specials',
        items: [
          { name: 'Fish & Chips', price: '$19.99' },
          { name: 'Bottomless Dumplings', price: '$13.99' },
        ],
      },
      {
        title: '“U-Pick” Sides',
        intro: '$6.99 each. Loaded baked potato +$1.00.',
        items: [
          { name: 'Seasoned Green Beans' },
          { name: 'Mashed Potatoes & Gravy' },
          { name: 'Seasonal Salad' },
          { name: 'Corn' },
          { name: 'Chicken & Dumplings' },
          { name: 'Country Slaw' },
          { name: 'Lima Beans' },
          { name: 'Baked Sweet Potato' },
          { name: 'Sauerkraut' },
          { name: 'Apple Sauce' },
          { name: 'Cottage Cheese' },
          { name: 'French Fries' },
          { name: 'Baked Potato' },
        ],
      },
      {
        title: 'Homemade Desserts',
        intro: 'Dine in or to go.',
        items: [
          { name: 'Slice of Homemade Pie', price: '$6.99', note: 'Coconut cream, peanut butter or chocolate peanut butter' },
          { name: 'Slice of Homemade Cobbler', price: '$6.99', note: 'Peach, cherry or blackberry' },
          { name: 'Homemade Whole Pie To Go', price: '$15.99' },
          { name: 'Whole Cobbler', price: '$40.00' },
          { name: 'Half Cobbler', price: '$25.00' },
        ],
      },
    ],
    notes: ['18% gratuity added to parties of 8 or more.'],
  },
  {
    id: 'carryout',
    label: "Joe's To Go",
    kicker: 'Carryout',
    intro: 'Call ahead or order online and we’ll have it ready to go. Two fried biscuits with apple butter come with every dinner.',
    groups: [
      {
        title: "Joe's Special",
        items: [{ name: '4 Piece Chicken Dinner', price: '$29.99', note: 'Four half-pint sides and 4 biscuits with apple butter' }],
      },
      {
        title: 'Country Style Dinners',
        intro: 'Served with 2 fried biscuits and 2 “U-Pick” sides.',
        items: [
          { name: '2 Piece Country Fried Chicken', price: '$18.99', note: 'All white meat +$1.00' },
          { name: '4 Piece Country Fried Chicken', price: '$21.99', note: 'All white meat +$2.00' },
          { name: 'Honey Ham Dinner', price: '$15.99' },
          { name: 'Chicken Liver Dinner', price: '$17.99' },
          { name: 'Cod Dinner, fried or grilled', price: '$23.99' },
          { name: 'Catfish Dinner', price: '$23.99' },
          { name: 'Chicken Tender Dinner', price: '$17.99' },
        ],
        footnote: 'Sides: seasonal salad, slaw, green beans, mashed potatoes with gravy, chicken & dumplings. Extra half pint $3.25.',
      },
      {
        title: 'Family Dinners',
        intro: 'With fried biscuits and apple butter. Add an extra quart of sides to any dinner for $9.99.',
        items: [
          { name: '8 Piece Chicken Dinner', price: '$36.99', note: '2 quarts of sides · 4 biscuits' },
          { name: '12 Piece Chicken Dinner', price: '$54.99', note: '3 quarts of sides · 6 biscuits' },
          { name: '16 Piece Chicken Dinner', price: '$73.99', note: '4 quarts of sides · 8 biscuits' },
          { name: '32 Piece Chicken Dinner', price: '$139.99', note: '8 quarts of sides · 16 biscuits' },
          { name: '4 Piece Fish Dinner', price: '$43.99', note: '2 pints of sides · 4 biscuits' },
          { name: '6 Piece Fish Dinner', price: '$65.99', note: '2 quarts of sides · 6 biscuits' },
        ],
      },
      {
        title: 'Group Dinners',
        items: [
          { name: 'Chicken Dinner for 50 People', price: '$465.00', note: '100 pieces of chicken, 50 biscuits, 2 gallons of “U-Pick” sides' },
          { name: 'Chicken Dinner for 100 People', price: '$925.00', note: '200 pieces of chicken, 100 biscuits, 4 gallons of “U-Pick” sides' },
        ],
      },
      {
        title: 'Chicken & Fish Boxes',
        intro: 'Served with biscuits and apple butter.',
        items: [
          { name: '4 Piece Chicken Box', price: '$12.00' },
          { name: '8 Piece Chicken Box', price: '$23.00' },
          { name: '12 Piece Chicken Box', price: '$35.00' },
          { name: '32 Piece Chicken Box', price: '$85.00' },
          { name: '2 Piece Fish Box', price: '$18.99' },
          { name: '4 Piece Fish Box', price: '$33.99' },
        ],
      },
      {
        title: 'Appetizers',
        items: [
          { name: 'Chicken Tenders', price: '$12.99' },
          { name: 'Huber Hot Wings', price: '$10.99' },
          { name: 'Cheesy Fries', price: '$10.99' },
          { name: 'Fried Zucchini', price: '$10.99' },
          { name: 'Chicken Livers', price: '$12.99' },
          { name: 'Potato Skins', price: '$10.99' },
          { name: 'Green Tomatoes', price: '$10.99' },
          { name: 'Onion Rings', price: '$10.99' },
        ],
      },
      {
        title: 'Sandwiches',
        items: [
          { name: 'Chicken Breast', price: '$15.99', note: 'Grilled, fried, Buffalo or BBQ' },
          { name: 'Huber Honey Ham & Cheese', price: '$14.99' },
          { name: 'Iceland Cod', price: '$16.99', note: 'Grilled or fried' },
          { name: 'HuberBurger with Cheese', price: '$15.99' },
          { name: 'Reuben', price: '$15.99' },
          { name: 'Chicken Club Wrap', price: '$16.99' },
        ],
      },
      {
        title: 'Sides by the Size',
        intro: 'Slaw, seasonal salad, chicken & dumplings, mashed potatoes, green beans, corn, lima beans.',
        items: [
          { name: 'Half pint', price: '$3.25' },
          { name: 'Pint', price: '$5.99' },
          { name: 'Quart', price: '$9.99' },
          { name: 'Gallon', price: '$34.99' },
        ],
      },
      {
        title: 'À la Carte',
        items: [
          { name: 'Fried Biscuit', price: '$0.85' },
          { name: 'Half Dozen Biscuits', price: '$4.99' },
          { name: 'Dozen Biscuits', price: '$8.99' },
          { name: 'French Fries', price: '$4.99 / $6.99', note: 'Small / large' },
          { name: 'Garden Salad', price: '$11.99' },
          { name: 'Grilled or Fried Chicken Salad', price: '$17.99' },
        ],
      },
      {
        title: 'Desserts & Drinks',
        items: [
          { name: 'Slice of Homemade Pie or Cobbler', price: '$6.99' },
          { name: 'Homemade Whole Pie', price: '$15.99' },
          { name: 'Whole Cobbler / Half Cobbler', price: '$40.00 / $25.00' },
          { name: 'Iced Tea or Fountain Drink', price: '$2.99', note: 'Coke, Diet Coke, Cherry Coke, Sprite or lemonade' },
          { name: 'Gallon of Tea or Lemonade', price: '$7.99' },
        ],
      },
    ],
  },
  {
    id: 'kids',
    label: 'Kids',
    kicker: 'Ages 4–11',
    intro: 'Every kids meal is $7.99 and comes with one side.',
    groups: [
      {
        title: 'Kids Meals',
        items: [
          { name: '2 Chicken Legs', price: '$7.99' },
          { name: '2 Chicken Tenders', price: '$7.99' },
          { name: 'Honey Ham', price: '$7.99' },
          { name: 'Grilled Cheese Sandwich', price: '$7.99' },
          { name: 'Hot Dog', price: '$7.99' },
        ],
      },
      {
        title: 'Choose One Side',
        items: [
          { name: 'French Fries' },
          { name: 'Mashed Potatoes' },
          { name: 'Green Beans' },
          { name: 'Chicken & Dumplings' },
          { name: 'Corn' },
          { name: 'Applesauce' },
          { name: 'Cottage Cheese' },
        ],
      },
    ],
  },
  {
    id: 'drinks',
    label: 'Something to Sip',
    kicker: 'Bar',
    intro: 'Huber Orchard wines and Joe Huber’s Farmhouse spirits. Any cocktail $8.99, or by the pitcher $24.99.',
    groups: [
      {
        title: 'Farmhouse Vodka',
        items: [
          { name: 'Farmhouse Vodka Blackberry Lemonade' },
          { name: '“The Blackberry Field”', note: 'Orange juice and Sprite' },
          { name: 'Fresh Spicy Bloody Mary' },
          { name: 'Vodka Hurricane', note: 'Orange juice and cranberry' },
          { name: 'Moscow Mule', note: 'Ginger beer and lime' },
          { name: 'Lemon Drop Vodka Cocktail' },
        ],
      },
      {
        title: 'Farmhouse Spiced Rum & Apple Whiskey',
        items: [
          { name: '“The Farmer”', note: 'Rum and Coke — Joe’s favorite' },
          { name: '“The Bruised Peach”', note: 'Peach, Sprite and cranberry' },
          { name: 'Caramel Apple Whiskey Sucker' },
          { name: 'Apple Butter Old Fashioned' },
          { name: 'Apple Whiskey Sour' },
        ],
      },
      {
        title: 'More Cocktails',
        items: [
          { name: 'Blackberry Sangria' },
          { name: 'Razzy Apple Sangria' },
          { name: 'Margarita on the Rocks' },
          { name: 'Mimosa', note: 'Orange, cranberry, apple or pineapple' },
          { name: 'Peach Daiquiri', price: '$9.99' },
        ],
      },
      {
        title: 'Huber Orchard Wines',
        intro: 'Generations, Pinot Gris, Sweet Marcella, Blackberry, Peach, Starlight White, Spiced Apple and Strawberry. Ask your server for selections and pours.',
        items: [{ name: 'Wine Flight — six wines', price: '$10.00' }],
      },
      {
        title: 'Beer',
        items: [
          { name: 'Draft Jar', price: '$4.00', note: 'Busch Light or Yuengling Lager' },
          { name: 'Draft Pitcher', price: '$13.99', note: 'Busch Light or Yuengling Lager' },
          { name: 'Blue Moon Draft', price: '$5.25' },
          { name: 'Domestic Bottles', price: '$4.00', note: 'Michelob Ultra, Miller, Bud Light' },
          { name: 'Imported Bottles', price: '$5.25', note: 'Guinness, Stella Artois, Heineken, Bell’s Two Hearted IPA' },
        ],
      },
      {
        title: 'Dirty Sodas, Tea & Coffee',
        items: [
          { name: 'Pink Pig', price: '$5.99', note: 'Strawberry and Sprite' },
          { name: 'Happy Heifer', price: '$5.99', note: 'Caramel and Diet Coke' },
          { name: 'Barnyard Bull', price: '$5.99', note: 'Vanilla and root beer' },
          { name: 'Coke Products, Tea or Coffee', price: '$2.99' },
        ],
      },
    ],
  },
];

export const SIGNATURE_DISHES = [
  { name: 'Country Fried Chicken', line: 'Mary Huber fried it for the farm hands’ supper in the 1920s. It is still the heart of the table.' },
  { name: 'Huber Honey Ham', line: 'Sliced and served alongside the chicken on every Country Platter.' },
  { name: 'Fried Biscuits with Apple Butter', line: 'Our famous biscuits — by the piece, the half dozen or the dozen.' },
  { name: 'Chicken & Dumplings', line: 'Grandma Mary’s lunch favorite from the 1920s farmhouse table.' },
  { name: 'Homemade Pies & Cobblers', line: 'Coconut cream, peanut butter, peach, cherry, blackberry.' },
] as const;
