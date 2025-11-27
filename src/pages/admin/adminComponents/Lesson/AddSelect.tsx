import * as React from "react";
import { useTheme } from "@mui/material/styles";
import type { Theme } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import type { SelectChangeEvent } from "@mui/material/Select";

const ITEM_HEIGHT = 120;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, selectedIds: string[], theme: Theme) {
  return {
    fontWeight: selectedIds.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

interface SelectProps<T> {
  selectModules: string[];
  setSelectModules: React.Dispatch<React.SetStateAction<string[]>>;
  description: string;
  useDataHook: () => { data?: T[] };
  idField: keyof T;
  labelField: keyof T;
}

export default function AddSelect<T>({
  selectModules,
  setSelectModules,
  description,
  useDataHook,
  idField,
  labelField,
}: SelectProps<T>) {
  const theme = useTheme();
  const { data: modules = [] } = useDataHook();

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    const selectedIds = typeof value === "string" ? value.split(",") : value;

    setSelectModules(selectedIds);
  };

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <Select
        sx={{ height: 40 }}
        id={`select-${String(idField)}`}
        name={`select-${String(labelField)}`}
        multiple
        displayEmpty
        value={selectModules}
        onChange={handleChange}
        input={<OutlinedInput />}
        renderValue={(selectedIds) => {
          if (selectedIds.length === 0) return <em>{description}</em>;

          const names = modules
            .filter((m) => selectedIds.includes(String(m[idField])))
            .map((m) => String(m[labelField]));

          return names.join(", ");
        }}
        MenuProps={MenuProps}
      >
        <MenuItem disabled value=""></MenuItem>

        {modules.map((module) => (
          <MenuItem
            key={String(module[idField])}
            value={String(module[idField])}
            style={getStyles(String(module[idField]), selectModules, theme)}
          >
            {String(module[labelField])}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
