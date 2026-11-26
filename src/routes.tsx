import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

export type RouteDef = {
  path: string;
  title: string;
  description: string;
  /** Header starts dark-on-light instead of light-on-image. */
  lightHeader?: boolean;
  image?: string;
  Component: LazyExoticComponent<ComponentType>;
  load: () => Promise<{ default: ComponentType }>;
};

const page = (load: () => Promise<{ default: ComponentType }>) => ({ load, Component: lazy(load) });

export const ROUTES: RouteDef[] = [
  {
    path: '/',
    title: "Joe Huber's Family Farm & Restaurant | Starlight, Indiana",
    description:
      'Country fried chicken, Huber honey ham and fried biscuits with apple butter, served family style on the Huber family farm in Starlight, Indiana, 22 miles from Louisville. Weddings, events, catering and a free barnyard.',
    ...page(() => import('./pages/Home')),
  },
  {
    path: '/menu',
    title: "Menu: Country Platter, Joe's To Go, Kids & Drinks | Joe Huber's",
    description:
      'The full Joe Huber’s menu: the all-you-can-eat Country Platter served family style, country-style suppers, Joe’s To Go carryout and family dinners, kids meals, homemade pies and cobblers, Huber Orchard wines and Farmhouse cocktails.',
    lightHeader: true,
    ...page(() => import('./pages/Menu')),
  },
  {
    path: '/restaurant',
    title: "The Restaurant: Family-Style Country Dining | Joe Huber's",
    description:
      'Home-style cooking made from scratch since 1983. All-you-can-eat Country Platter served family style, open Thursday to Sunday in Starlight, Indiana. Call (812) 923-5255 for reservations.',
    ...page(() => import('./pages/Restaurant')),
  },
  {
    path: '/our-story',
    title: "Our Story: Eight Generations Since 1843 | Joe Huber's",
    description:
      'From Simon Huber’s journey from Baden-Baden in 1843 to the 1967 “pick your own green beans” ad and the restaurant’s opening in 1983: the Huber family history.',
    ...page(() => import('./pages/Story')),
  },
  {
    path: '/farm',
    title: "The Farm & Free Barnyard | Joe Huber's Family Farm",
    description:
      'Free barnyard admission with a 40-foot tunnel slide, the Treetop Bus Stop, mini farm animals and fish and turtle feeding by the lake. Same hours as the restaurant.',
    ...page(() => import('./pages/Farm')),
  },
  {
    path: '/weddings',
    title: "Weddings by the Lake & Orchards | Joe Huber's, Starlight IN",
    description:
      'Say “I do” at the lakeside gazebo or in our banquet halls. The Perfect Match package covers ceremony and reception for up to 100 guests, with a country buffet, bartender and day-of coordinator.',
    ...page(() => import('./pages/Weddings')),
  },
  {
    path: '/events',
    title: "Private Events, Company Picnics & Field Trips | Joe Huber's",
    description:
      'Company picnics, birthday parties, fall school field trips and Power Lunch meetings on the Huber family farm, with an all-you-can-eat country buffet.',
    ...page(() => import('./pages/Events')),
  },
  {
    path: '/catering',
    title: "Catering & Delivery: A Taste of the Country | Joe Huber's",
    description:
      'Joe Huber’s fried chicken, honey ham, biscuits and apple butter and homemade pies, delivered or catered for weddings, office lunches, holiday parties and family gatherings.',
    ...page(() => import('./pages/Catering')),
  },
  {
    path: '/market',
    title: "Farm Market: Fudge, Jams, Baked Goods & Produce | Joe Huber's",
    description:
      'Homemade fudge, small-batch jams, jellies and pickles, fresh-baked pies and breads, and seasonal produce grown on the Huber farm. Shop in Starlight or online.',
    ...page(() => import('./pages/Market')),
  },
  {
    path: '/contact',
    title: "Visit & Contact: Hours, Directions, Inquiries | Joe Huber's",
    description:
      'Hours, directions and contact details for Joe Huber’s Family Farm & Restaurant, 2421 Engle Rd., Starlight, IN 47106. Send an inquiry about weddings, catering and events.',
    lightHeader: true,
    ...page(() => import('./pages/Contact')),
  },
  {
    path: '/privacy',
    title: "Privacy | Joe Huber's",
    description: 'How the Joe Huber’s website handles the information you send us.',
    lightHeader: true,
    ...page(() => import('./pages/Privacy')),
  },
];

export const NOT_FOUND: RouteDef = {
  path: '*',
  title: "Page not found | Joe Huber's",
  description: 'This page could not be found. It may have moved when the Joe Huber’s website was rebuilt. Head back to the farm or view the menu.',
  lightHeader: true,
  ...page(() => import('./pages/NotFound')),
};

export const findRoute = (pathname: string) => {
  const clean = pathname.replace(/\/+$/, '') || '/';
  return ROUTES.find((r) => r.path === clean) ?? NOT_FOUND;
};
