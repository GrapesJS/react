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
    return (
        <div {...rest} className={cx('mb-3 px-1', prop.isFull() ? 'w-full' : 'w-1/2')} >
            <div className={cx('flex mb-2', prop.canClear() && 'text-sky-300')}>
                <div className="flex-grow capitalize">{ prop.getName() }</div>
                {
                    prop.canClear() &&
                    <button onClick={() => prop.clear()}>
                        <Icon path={mdiClose} size={0.7}/>
                    </button>
                }
            </div>
            {
                prop.getType() === 'number' &&
                <TextField
                    fullWidth
                    placeholder={prop.getDefaultValue()}
                    value={prop.hasValue() ? prop.getValue() : ''}
                    onChange={(ev) => {prop.upValue(ev.target.value)}}
                    size="small"
                />

            }
            {
                prop.getType() === 'radio' &&
                <RadioGroup value={prop.getValue()} onChange={(ev) => prop.upValue(ev.target.value)} row>
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
                prop.getType() === 'select' &&
                <FormControl fullWidth size="small">
                    <Select value={prop.getValue()} onChange={(ev) => prop.upValue(ev.target.value)}>
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
                prop.getType() === 'color' &&
                <TextField
                    fullWidth
                    placeholder={prop.getDefaultValue()}
                    value={prop.hasValue() ? prop.getValue() : ''}
                    onChange={(ev) => prop.upValue(ev.target.value)}
                    size="small"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                            <div className="w-[15px] h-[15px]" style={{ backgroundColor: prop.hasValue() ? prop.getValue() : prop.getDefaultValue() }}>
                                <input
                                    type="color"
                                    className="w-[15px] h-[15px] opacity-0"
                                    value={prop.hasValue() ? prop.getValue() : prop.getDefaultValue()}
                                    onChange={(ev) => prop.upValue(ev.target.value)}
                                />
                            </div>
                        </InputAdornment>,
                    }}
                />

            }
            {
                prop.getType() === 'slider' &&
                <Slider
                    size="small"
                    value={prop.getValue()}
                    min={(prop as PropertySlider).getMin()}
                    max={(prop as PropertySlider).getMax()}
                    step={(prop as PropertySlider).getStep()}
                    onChange={(ev: any) => prop.upValue(ev.target.value)}
                    valueLabelDisplay="auto"
                />

            }
        </div>
    );
}