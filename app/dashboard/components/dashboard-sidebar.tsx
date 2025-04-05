'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { PlusCircle, RefreshCw, LayoutDashboard } from 'lucide-react';

const sidebarItems = [
  {
    title: 'Overview',
    href: '/dashboard',
    icon: LayoutDashboard
  },
  {
    title: 'Update',
    href: '/dashboard/update',
    icon: RefreshCw
  },
  {
    title: 'Insert',
    href: '/dashboard/insert',
    icon: PlusCircle
  }
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="pb-12 w-64 border-r min-h-screen">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start gap-2',
                  pathname === item.href && 'bg-muted'
                )}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}