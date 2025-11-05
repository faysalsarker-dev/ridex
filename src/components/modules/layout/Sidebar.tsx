import { NavLink } from 'react-router';
import { motion } from 'framer-motion';
import { adminRoutes } from '@/utils/adminRoutes';



export const Sidebar = () => {
  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-0 h-screen w-64 bg-[#0F1729] text-white border-r border-sidebar-border flex flex-col"
    >
      <div className="p-6">
        <h1 className="text-2xl font-bold ">Ridex Admin</h1>
        <p className="text-sm  mt-1">Admin Dashboard</p>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {adminRoutes.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : ' hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <p className="text-xs text-sidebar-foreground/50 text-center">
          © 2024 RideAdmin
        </p>
      </div>
    </motion.aside>
  );
};
