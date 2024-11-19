"use client";

import { cn } from "@/lib/utils";
import {
  FileText,
  FileHeart,
  Trash2,
  Settings,
  HelpCircle,
  ChevronDown,
  User,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebarStore } from "@/stores/sidebar-store";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/lib/supabase/auth";
import { toast } from "@/hooks/use-toast";

const mainNavigation = [
  {
    name: "Forms",
    icon: FileText,
    href: "/",
  },
  { 
    name: "Templates", 
    icon: FileHeart, 
    href: "/templates" 
  },
  { 
    name: "Trash", 
    icon: Trash2, 
    href: "/deleted" 
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isOpen, toggleSidebar } = useSidebarStore();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        description: "Successfully signed out"
      });
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "Please try again",
        variant: "destructive"
      });
    }
  };

  return (
    <div className={cn(
      "flex flex-col bg-white overflow-hidden transition-[width] duration-300 ease-in-out border-r border-neutral-100",
      isOpen ? "w-64" : "w-14"
    )}>
      <div className={cn(
        "py-2 transition-[padding] duration-300 ease-in-out",
        isOpen ? "px-5" : "px-0"
      )}>
        <Link href="/">
          <div className={cn(
            "h-9 flex items-center",
            !isOpen && "justify-center"
          )}>
            {/* Modern App Logo */}
            <div className="flex items-center gap-2">
              <div className="relative h-6 w-6 rounded-md bg-gradient-to-br from-neutral-800 to-neutral-950 flex items-center justify-center text-white text-sm font-semibold">
                <span className="absolute inset-0 rounded-md bg-white opacity-0 hover:opacity-10 transition-opacity" />
                C
              </div>
              {isOpen && (
                <span className="font-semibold text-neutral-900">
                  Conveya
                </span>
              )}
            </div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-0.5 px-2">
        {mainNavigation.map((item) => (
          <Link key={item.name} href={item.href}>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "w-full text-sm font-normal h-10 transition-all duration-300 ease-in-out",
                isOpen ? "justify-start px-3" : "w-10 p-0",
                pathname === item.href
                  ? "bg-neutral-100" 
                  : "hover:bg-neutral-50"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 text-neutral-500 transition-all duration-300 ease-in-out", 
                isOpen && "mr-3"
              )} />
              <span className={cn(
                "transition-all duration-300 ease-in-out",
                isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"
              )}>
                {item.name}
              </span>
            </Button>
          </Link>
        ))}
      </nav>

      <div className="px-2 space-y-0.5 mb-2">
        <Link href="/settings">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "w-full text-sm font-normal h-10 transition-all duration-300 ease-in-out",
              isOpen ? "justify-start px-3" : "w-10 p-0",
              pathname === "/settings"
                ? "bg-neutral-100" 
                : "hover:bg-neutral-50"
            )}
          >
            <Settings className={cn(
              "h-5 w-5 text-neutral-500 transition-all duration-300 ease-in-out",
              isOpen && "mr-3"
            )} />
            <span className={cn(
              "transition-all duration-300 ease-in-out",
              isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"
            )}>
              Settings
            </span>
          </Button>
        </Link>

        <Link href="/feedback">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "w-full text-sm font-normal h-10 transition-all duration-300 ease-in-out",
              isOpen ? "justify-start px-3" : "w-10 p-0",
              pathname === "/feedback"
                ? "bg-neutral-100" 
                : "hover:bg-neutral-50"
            )}
          >
            <HelpCircle className={cn(
              "h-5 w-5 text-neutral-500 transition-all duration-300 ease-in-out",
              isOpen && "mr-3"
            )} />
            <span className={cn(
              "transition-all duration-300 ease-in-out",
              isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"
            )}>
              Send feedback
            </span>
          </Button>
        </Link>
      </div>

      <div className="p-2 border-t border-neutral-100">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              className={cn(
                "hover:bg-neutral-50 transition-all duration-300 ease-in-out h-10 w-full",
                isOpen ? "justify-start px-3" : "w-10 p-0",
              )}
            >
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="bg-neutral-100 text-neutral-500 text-xs">
                    JD
                  </AvatarFallback>
                </Avatar>
                {isOpen && (
                  <>
                    <div className="flex-1 text-left">
                      <span className="text-sm font-medium block leading-none mb-1">John Doe</span>
                      <span className="text-xs text-neutral-500 block leading-none">john@example.com</span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-neutral-500" />
                  </>
                )}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[240px]">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">John Doe</p>
                <p className="text-xs leading-none text-neutral-500">john@example.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="h-4 w-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="h-4 w-4 mr-2" />
              Account settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-red-600"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}