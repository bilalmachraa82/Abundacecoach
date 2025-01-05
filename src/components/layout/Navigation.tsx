import React from 'react';
import { 
  LayoutDashboard, 
  PiggyBank, 
  LineChart, 
  Target, 
  Receipt, 
  Settings,
  Brain,
  Sparkles,
  Heart
} from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { t } from '../../utils/i18n';

const navigation = [
  { name: 'dashboard', path: '/', icon: LayoutDashboard },
  { name: 'transactions', path: '/transactions', icon: Receipt },
  { name: 'analytics', path: '/analytics', icon: LineChart },
  { name: 'goals', path: '/goals', icon: Target },
  { name: 'budget', path: '/budget', icon: PiggyBank },
  { name: 'grabovoi', path: '/grabovoi', icon: Sparkles },
  { name: 'wellbeing', path: '/wellbeing', icon: Heart },
  { name: 'ai-coach', path: '/ai-coach', icon: Brain },
  { name: 'settings', path: '/settings', icon: Settings },
];

export function Navigation() {
  const location = useLocation();
  
  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed left-0 top-0 h-full w-64 bg-skin-card border-r border-skin-border">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-skin-primary mb-8">AbundanceCoach</h1>
          <div className="space-y-2">
            {navigation.map(({ name, path, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`nav-item ${location.pathname === path ? 'active' : 'hover:bg-skin-hover'}`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium capitalize">{t(name)}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-skin-card border-t border-skin-border safe-bottom">
        <div className="grid grid-cols-5 gap-1 p-2">
          {navigation.slice(0, 5).map(({ name, path, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`nav-item flex-col items-center justify-center py-2 px-1 ${
                location.pathname === path ? 'active' : ''
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs mt-1 capitalize">{t(name)}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}