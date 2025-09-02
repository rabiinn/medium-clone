
import { Home, BookOpen, User, FileText, BarChart2, Users } from 'lucide-react';

export const sidebarLinks = [
  { to: "/", label: "Home", icon: Home },
  { to: "/library", label: "Library", icon: BookOpen },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/stories", label: "Stories", icon: FileText },
  { to: "/stats", label: "Stats", icon: BarChart2 },
  { to: "/following", label: "Following", icon: Users },
];
