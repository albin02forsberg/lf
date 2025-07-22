
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ChevronRight, Package2 } from "lucide-react";
import { navItems } from "@/lib/routes";

export function SideNav({ isExpanded }: { isExpanded: boolean }) {
  const pathname = usePathname();
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <aside className={`fixed inset-y-0 left-0 z-10 hidden flex-col border-r bg-background sm:flex transition-all duration-300 ${isExpanded ? 'w-60' : 'w-14'}`}>
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Package2 className="h-6 w-6" />
          {isExpanded && <span className="">My App</span>}
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <TooltipProvider delayDuration={0}>
          <nav className={`grid items-start text-sm font-medium ${isExpanded ? 'px-4' : 'px-2'}`}>
            {navItems.map((item) =>
              item.subItems ? (
                <Collapsible key={item.name} open={isProductsOpen} onOpenChange={setIsProductsOpen}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CollapsibleTrigger asChild>
                        <div className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${isActive(item.href) ? "bg-accent text-accent-foreground" : ""}`}>
                          <item.icon className="h-4 w-4" />
                          {isExpanded && <span className="flex-1">{item.name}</span>}
                          {isExpanded && <ChevronRight className={`ml-auto h-4 w-4 transition-transform ${isProductsOpen ? "rotate-90" : ""}`} />}
                        </div>
                      </CollapsibleTrigger>
                    </TooltipTrigger>
                    {!isExpanded && <TooltipContent side="right">{item.name}</TooltipContent>}
                  </Tooltip>
                  {isExpanded && (
                    <CollapsibleContent className="pt-1">
                      <div className="ml-7 flex flex-col gap-1">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={`rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${isActive(subItem.href) ? "bg-accent text-accent-foreground" : ""}`}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </CollapsibleContent>
                  )}
                </Collapsible>
              ) : (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${isActive(item.href) ? "bg-accent text-accent-foreground" : ""} ${!isExpanded ? 'h-9 w-9 justify-center' : ''}`}
                    >
                      <item.icon className="h-5 w-5" />
                      {isExpanded && <span>{item.name}</span>}
                    </Link>
                  </TooltipTrigger>
                  {!isExpanded && (
                    <TooltipContent side="right">
                      <p>{item.name}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              )
            )}
          </nav>
        </TooltipProvider>
      </div>
    </aside>
  );
}
