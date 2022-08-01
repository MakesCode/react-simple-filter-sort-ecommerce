import *as  Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import useItems from "core/hooks";
import { getUniqueItems } from "core/utils";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import CollapsibleList from "./CollapsibleList";

export default function ColorFilter() {
  const [search, setSearch] = useSearchParams()
  const getItems = useItems();
  const items = useMemo(() => getItems.data ?? [], [getItems.data])
  const groupedItems = useMemo(
    () =>
      getUniqueItems(items, 'color').map((color) => ({
        label: color,
        name: color,
        value: color,
      })),
    [items],
  );

  const onColorChange = (color: string) => (checked: Checkbox.CheckedState) => {
    const colors = search.get('colors')?.split(',')
    if (colors?.length === 0 || !checked) {
      search.delete('colors')
    } else {
      search.set('colors', color)
    }
    const includesColor = search.get('colors')?.includes(color)
    if (checked && !includesColor) {
      search.append(',', color)
    }
    setSearch(search)
  }

  return (
    <CollapsibleList title="Color">
      {groupedItems.map((field) => (
        <li key={field.value} className="pv2">
          <div className="flex items-center">
            <Checkbox.Root
              id={field.name}
              name={field.name}
              onCheckedChange={onColorChange(field.value)}
              defaultChecked={search.get('colors') === field.value}
              className="checkbox lh-solid flex items-center justify-center pa0 bg-white w125 h125 br2 bn"
            >
              <Checkbox.Indicator>
                <CheckIcon className="checkbox__icon w125 h125" />
              </Checkbox.Indicator>

            </Checkbox.Root>
            <label htmlFor={field.name} className="ml3 fw5 f5">
              {field.label}
            </label>
          </div>
        </li>
      ))}
    </CollapsibleList>
  )
}


