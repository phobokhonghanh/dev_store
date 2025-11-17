// Frontend Routes
export const APP_ROUTES = {
  HOME: { name: 'Home', pattern: '/home', page: 'index' },
  CONTACT: { name: 'Contact', pattern: '/contact', page: 'contact' },
  
  PROJECTS: { name: 'Projects', pattern: '/projects', page: 'projects' },
  PROJECT_DETAIL: { name: 'Project Detail', pattern: '/projects/:id', page: 'project/[id]' },
  
  TOOLS: { name: 'Tools', pattern: '/tools', page: 'tools' },
  TOOL_DETAIL: { name: 'Tool Detail', pattern: '/tools/:id', page: 'tool/[id]' },
  
  CART: { name: 'Cart', pattern: '/cart', page: 'cart' },
  PRODUCTS: { name: 'Products', pattern: '/products', page: 'products' },
  PRODUCT_DETAIL: { name: 'Product Detail', pattern: '/products/:id', page: 'product/[id]' },
  
  LOGIN: { name: 'Login', pattern: '/login', page: 'login' },
  REGISTER: { name: 'Register', pattern: '/register', page: 'register' },
  FORGOT_PASSWORD: { name: 'Forgot Password', pattern: '/forgot-password', page: 'forgot-password' },
  
  DASHBOARD: { name: 'Dashboard', pattern: '/dashboard', page: 'dashboard' },
  PROFILE: { name: 'Profile', pattern: '/account/profile', page: 'account/profile' },
  AGENTS: { name: 'Agents', pattern: '/account/agents', page: 'account/agents' },

  ADMIN_DASHBOARD: { name: 'Admin Dashboard', pattern: '/admin/dashboard', page: 'admin/dashboard' },
};

export const PAGE_SIZE = 10;
export const CURRENCY = 'USD';

