"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileFilterDrawer } from "@/components/shop/MobileFilterDrawer";

interface MobileFilterTriggerProps {
  resultCount: number;
}

export function MobileFilterTrigger({ resultCount }: MobileFilterTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="md:hidden flex items-center gap-2"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filtros
      </Button>

      <MobileFilterDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        resultCount={resultCount}
      />
    </>
  );
}
