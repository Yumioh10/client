import { Link } from '@tanstack/react-router'
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { motion, AnimatePresence } from 'motion/react'
import Logo from '@/assets/mapara-logo.svg'
import { useState } from 'react'

export const Header = () => {
  const { itemCount } = useCartStore()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('')

  const onSearchChange = (value: string) => {
    setSearchQuery(value)
  }

  // Desktop menu items
  const menuItems = [
    { label: 'Produits', href: '/products' },
    { label: 'Categories', href: '/categories' },
    { label: 'A propos', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-medical-white/95 backdrop-blur-sm border-b border-medical-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src={Logo} alt="MaparaSanté" className="w-12 h-12" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-brand-coral to-brand-dark bg-clip-text text-transparent">
              MaparaSanté
            </h1>
          </Link>
          {/* Search Bar - Always visible on md+, hidden on mobile when menu is open */}
        <div className={`hidden md:flex ml-auto items-center transition-all duration-300 ${searchFocused ? 'w-72' : '56'}`} >
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-medical-text-secondary w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher un produit ... "
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-medical-gray focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            />
          </div>
        </div>
        {/* Navigation Icons */}
        <div className="flex items-center justify-end space-x-6 ml-auto">
          {/* Cart Icon */}
          <Link to='/cart' className='relative flex items-center text-medical-text hover:text-brand-primary transition-color'>
            <ShoppingCart className='w-6 h-6' />
            {itemCount() > 0 && (
              <motion.span
                initial={{ scale:0 }}
                animate={{ scale:1 }}
                className='absolate -top-2 -right-2 bg-brand-coral text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                  {itemCount()}
              </motion.span>
            )}
          </Link>
          {/* Account Icon - Hidden on mobile to save space */}
          <Link to='/account' className='hidden md:flex items-center text-medical-text hover:text-brand-primary transition-colors'>
            <User className='w-6 h-6'/>
          </Link>

          {/* Menu Toggle Button - Now visible on All screen sizes */}
          <button
            className='p-2 hover:bg-medical-gray rounded-full transition-colors'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label='Toggle navigation menu'
          >
            {isMenuOpen ? <X className='w-6 h-6' />:<Menu className='w-6 h-6' />}
          </button>
        </div>
        </div>     
      </div>

    {/* Navigation Menu Dropdown -Appears on click for all screen sizes */}
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity:0, height:0 }}
          animate={{ opacity:1, height:'auto' }}
          exit={{ opacity:0, height:0 }}
          transition={{ duration:0.3, ease:'easeInOut' }}
          className='border-t border-medical-gray bg-medical-white overflow-hidden'
        >
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {/* Navigation Links */}
              <div className='md:col-span-2'>
                <nav className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                  {menuItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      className='py-3 px-4 text-medical-text hover:bg-medical-gray rounded-lg transition-colors font-medium text-center'
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Quick Actions / Account Info */}
              <div className='border-t md:border-t-0 md:border-l border-medical-gray md:pl-6 pt-4 md:pt-0'>
                <h3 className='font semibold text-medical-text mb-3'>Quick Actions</h3>
                <div className='space-y-2'>
                  <Link
                    to="/account"
                    className='flex items-center space-x-3 py-2 px-3 text-medical-text hover:bg-medical-gray rounded-lg transition-colors'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className='w-5 h-5' />
                    <span>Mon compte</span>
                  </Link>
                  <Link
                    to="/cart"
                    className='flex items-center space-x-3 py-2 px-3 text-medical-text hover:bg-medical-gray rounded-lg transition-colors'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ShoppingCart className='w-5 h-5' />
                    <span>View Cart ({itemCount()})</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Mobile Search - Only appears in menu on small screens */}
            <div className='mt-6 md:hidden'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-medical-text-secondary w-5 h-5' />
                <input
                  type='text'
                  placeholder='Search medical consmetics ...'
                  className='w-full pl-10 pr-4 py-3 rounded-lg border border-medical-gray focus:ring-2 focus:ring-brand-primary'
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    {/* Trust Badge Bar */}
    <TrustBadgeBar />
  </header>
);
};

const TrustBadgeBar = () => (
  <div className="bg-brand-primary/10 border-t border-medical-gray py-2">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between space-x-8 text-sm text-medical-text-secondary">
        <span className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-brand-secondary rounded-full"></span>
          <span>Produits de soin Visage</span>
        </span>
        <span className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-brand-secondary rounded-full"></span>
          <span>Produits de soin Cheveux</span>
        </span>
        <span className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-brand-secondary rounded-full"></span>
          <span>Complements Alimentaires</span>
        </span>
      </div>
    </div>
  </div>
);
