"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Expression, Query, SQLType } from "@/app/lib/dataDefinition";

export default function Search({ placeholder }: { placeholder: string }) {
  const param = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = useDebouncedCallback((term) => {
    const searchParam = new URLSearchParams(param);
    searchParam.set("page", "1");
    if (term && term != undefined) {      
      searchParam.set("query", term);
    } else {
      searchParam.delete("query");
    }
    replace(`${pathname}?${searchParam.toString()}`);
  }, 300);
  return (
    <TextField.Root>
      <TextField.Input
        size="3"
        radius="small"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={param.get("query")?.toString()}
      />
      <TextField.Slot>
        <MagnifyingGlassIcon height="14" width="14" />
      </TextField.Slot>
    </TextField.Root>
  );
}
