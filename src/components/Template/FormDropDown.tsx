import {
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    ListSubheader,
    SelectChangeEvent,
} from "@mui/material";
import { chapters } from "../../types/chapters";
import { View } from "../../types/chapters";

export default function FormDropDown({
    view,
    setView,
}: {
    view: View;
    setView: (v: View) => void;
}) {
    // Use empty string when not in "item" mode
    const value = view.type === "item" ? String(view.id) : "";

    const handleChange = (e: SelectChangeEvent<string>) => {
        const id = e.target.value;
        setView({ type: "item", id }); // if your id is number: setView({ type:"item", id: Number(id) })
    };

    return (
        <FormControl sx={{ width: 200 }} size="small">
            <Select
                value={value}
                onChange={handleChange}
                displayEmpty
                renderValue={(selected) => {
                    const id = selected as string;
                    return id
                        ? chapters.find((c) => String(c.id) === id)?.label ?? id
                        : "Chapters & Project";
                }}
                MenuProps={{ PaperProps: { sx: { backdropFilter: "blur(6px)" } } }}
            >
                <ListSubheader
                    disableSticky
                    sx={{ fontSize: 12, textTransform: "uppercase", px: 2, py: 1 }}
                >
                    Chapters
                </ListSubheader>
                {chapters
                    .filter((c) => c.kind === "chapter")
                    .map((c) => (
                        <MenuItem key={c.id} value={String(c.id)}>
                            {c.label}
                        </MenuItem>
                    ))}

                <ListSubheader
                    disableSticky
                    sx={{ fontSize: 12, textTransform: "uppercase", px: 2, pt: 2 }}
                >
                    Project
                </ListSubheader>
                {chapters
                    .filter((p) => p.kind === "project")
                    .map((p) => (
                        <MenuItem key={p.id} value={String(p.id)}>
                            {p.label}
                        </MenuItem>
                    ))}
            </Select>
        </FormControl>
    );
}
