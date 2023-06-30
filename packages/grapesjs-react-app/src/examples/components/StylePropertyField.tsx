import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import type { Property, PropertyRadio, PropertySelect, PropertySlider } from "grapesjs";
import { cx } from "../common";

interface StylePropertyFieldProps extends React.HTMLProps<HTMLDivElement> {
    prop: Property;
}

export default function StylePropertyField({ prop, ...rest }: StylePropertyFieldProps) {
    const handleChange = (value: string) => {
        prop.upValue(value);
    };

    const type = prop.getType();
    const defValue = prop.getDefaultValue();
    const canClear = prop.canClear();
    const hasValue = prop.hasValue();
    const value = prop.getValue();
    const valueString = hasValue ? value : '';
    const valueWithDef = hasValue ? value : defValue;

    return (
        <div {...rest} className={cx('mb-3 px-1', prop.isFull() ? 'w-full' : 'w-1/2')} >
            <div className={cx('flex mb-2', canClear && 'text-sky-300')}>
                <div className="flex-grow capitalize">{ prop.getName() }</div>
                {
                    canClear &&
                    <button onClick={() => prop.clear()}>
                        <Icon path={mdiClose} size={0.7}/>
                    </button>
                }
            </div>
            {
                type === 'number' &&
                <TextField
                    placeholder={defValue}
                    value={valueString}
                    onChange={(ev) => {handleChange(ev.target.value)}}
                    size="small"
                    fullWidth
                />

            }
            {
                type === 'radio' &&
                <RadioGroup value={value} onChange={(ev) => handleChange(ev.target.value)} row>
                    {(prop as PropertyRadio).getOptions().map(option => (
                        <FormControlLabel
                            key={(prop as PropertyRadio).getOptionId(option)}
                            value={(prop as PropertyRadio).getOptionId(option)}
                            label={(prop as PropertyRadio).getOptionLabel(option)}
                            control={<Radio size="small"/>}
                        />
                    ))}
                </RadioGroup>
            }
            {
                type === 'select' &&
                <FormControl fullWidth size="small">
                    <Select value={value} onChange={(ev) => handleChange(ev.target.value)}>
                        {(prop as PropertySelect).getOptions().map(option => (
                            <MenuItem
                                key={(prop as PropertySelect).getOptionId(option)}
                                value={(prop as PropertySelect).getOptionId(option)}
                            >
                                {(prop as PropertySelect).getOptionLabel(option)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            }
            {
                type === 'color' &&
                <TextField
                    fullWidth
                    placeholder={defValue}
                    value={valueString}
                    onChange={(ev) => handleChange(ev.target.value)}
                    size="small"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                            <div className="w-[15px] h-[15px]" style={{ backgroundColor: valueWithDef }}>
                                <input
                                    type="color"
                                    className="w-[15px] h-[15px] opacity-0"
                                    value={valueWithDef}
                                    onChange={(ev) => handleChange(ev.target.value)}
                                />
                            </div>
                        </InputAdornment>,
                    }}
                />

            }
            {
                type === 'slider' &&
                <Slider
                    size="small"
                    value={value}
                    min={(prop as PropertySlider).getMin()}
                    max={(prop as PropertySlider).getMax()}
                    step={(prop as PropertySlider).getStep()}
                    onChange={(ev: any) => handleChange(ev.target.value)}
                    valueLabelDisplay="auto"
                />

            }
        </div>
    );
}