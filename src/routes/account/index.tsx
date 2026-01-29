import { createFileRoute } from '@tanstack/react-router';
import { User, Package, Heart, Settings } from 'lucide-react';
import { motion } from 'motion/react';

export const Route = createFileRoute('/account/')({
  component: AccountPage,
});
/* Authentification route 
export const Route = createFileRoute('/account')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/login' });
    }
  },
  component: AccountPage,
});*/

function AccountPage() {
  const menuItems = [
    { icon: <User />, label: 'Profile', href: '/account/profile' },
    { icon: <Package />, label: 'Orders', href: '/account/orders' },
    { icon: <Heart />, label: 'Treatment Plan', href: '/account/wishlist' },
    { icon: <Settings />, label: 'Settings', href: '/account/settings' },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-medical-text mb-8">My Account</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {menuItems.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-medical-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <a href={item.href} className="flex items-center space-x-4">
              <div className="text-brand-primary">{item.icon}</div>
              <span className="font-medium">{item.label}</span>
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}