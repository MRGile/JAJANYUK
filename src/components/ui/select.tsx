"use client";

import {
  Select,
  SelectValue,
  Button,
  Popover,
  ListBox,
  ListBoxItem,
} from "react-aria-components";

import { ChevronDown } from "lucide-react";

interface TenantItem {
  id: string;
  name: string;
}

interface JollySelectProps {
  items: TenantItem[];
  selectedKey: string;
  onSelectionChange: (key: string | number | null) => void;
  "aria-label": string;
  placeholder?: string;
  className?: string;
}

export function JollySelect({
  items,
  selectedKey,
  onSelectionChange,
  "aria-label": ariaLabel,
  placeholder = "Pilih opsi",
  className = "",
}: JollySelectProps) {
  return (
    <Select
      aria-label={ariaLabel}
      selectedKey={selectedKey}
      onSelectionChange={(key) =>
        onSelectionChange(key as string | number | null)
      }
      className={`relative flex flex-col ${className}`}
    >
      <Button className="flex h-9 w-full items-center justify-between gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 text-xs font-semibold text-slate-800 outline-none transition hover:bg-white focus-visible:ring-2 focus-visible:ring-amber-500">
        <SelectValue>
          {({ selectedText }) => selectedText || placeholder}
        </SelectValue>

        <ChevronDown size={15} className="shrink-0 text-gray-400" />
      </Button>

      <Popover className="w-[--trigger-width] overflow-hidden rounded-xl border border-gray-200 bg-white p-1 shadow-lg outline-none">
        <ListBox
          items={items}
          className="max-h-60 overflow-auto outline-none"
        >
          {(item) => (
            <ListBoxItem
              id={item.id}
              textValue={item.name}
              className="cursor-pointer rounded-lg px-3 py-2.5 text-xs font-medium text-slate-700 outline-none transition data-[focused]:bg-amber-50 data-[selected]:bg-amber-50 data-[selected]:font-bold data-[selected]:text-amber-700"
            >
              {item.name}
            </ListBoxItem>
          )}
        </ListBox>
      </Popover>
    </Select>
  );
}

export { ListBoxItem as SelectItem };