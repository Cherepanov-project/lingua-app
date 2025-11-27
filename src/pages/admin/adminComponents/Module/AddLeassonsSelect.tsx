import * as React from "react";
import { useTheme } from "@mui/material/styles";
import type { Theme } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import type { SelectChangeEvent } from "@mui/material/Select";
import { useGetLessonsQuery } from "../../../../shared/api/languagesApi";

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

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

interface SelectProps {
  selectModules: string[];
  setSelectModules: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function AddLessonSelect({
  selectModules,
  setSelectModules,
}: SelectProps) {
  const theme = useTheme();
  const { data: modules = [] } = useGetLessonsQuery();

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;

    const selectedIds = typeof value === "string" ? value.split(",") : value;

    setSelectModules(selectedIds);
  };

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <Select
        id="lesson-select"
        name="lesson-select"
        sx={{ height: 40 }}
        multiple
        displayEmpty
        value={selectModules}
        onChange={handleChange}
        input={<OutlinedInput />}
        renderValue={(selectedIds) => {
          if (selectedIds.length === 0) return <em>Выбери уроки</em>;

          const names = modules
            .filter((m) => selectedIds.includes(m.id))
            .map((m) => m.name);

          return names.join(", ");
        }}
        MenuProps={MenuProps}
      >
        <MenuItem disabled value=""></MenuItem>

        {modules.map((module) => (
          <MenuItem
            key={module.id}
            value={module.id}
            style={getStyles(module.name, selectModules, theme)}
          >
            {module.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
