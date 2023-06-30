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

    const onChange = (ev: any) => {
        handleChange(ev.target.value);
    };

    const type = prop.getType();
    const defValue = prop.getDefaultValue();
    const canClear = prop.canClear();
    const hasValue = prop.hasValue();
    const value = prop.getValue();
    const valueString = hasValue ? value : '';
    const valueWithDef = hasValue ? value : defValue;

    let inputToRender = (
        <TextField placeholder={defValue} value={valueString} onChange={onChange} size="small" fullWidth/>
    )

    switch (type) {
        case 'radio': {
            const radioProp = prop as PropertyRadio;
            inputToRender = (
                <RadioGroup value={value} onChange={onChange} row>
                    {radioProp.getOptions().map(option => (
                        <FormControlLabel
                            key={radioProp.getOptionId(option)}
                            value={radioProp.getOptionId(option)}
                            label={radioProp.getOptionLabel(option)}
                            control={<Radio size="small"/>}
                        />
                    ))}
                </RadioGroup>
            )
        } break;
        case 'select': {
            const selectProp = prop as PropertySelect;
            inputToRender = (
                <FormControl fullWidth size="small">
                    <Select value={value} onChange={onChange}>
                        {selectProp.getOptions().map(option => (
                            <MenuItem key={selectProp.getOptionId(option)} value={selectProp.getOptionId(option)}>
                                {selectProp.getOptionLabel(option)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )
        } break;
        case 'color': {
            inputToRender = (
                <TextField
                    fullWidth placeholder={defValue} value={valueString} onChange={onChange} size="small"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                            <div className="w-[15px] h-[15px]" style={{ backgroundColor: valueWithDef }}>
                                <input type="color" className="w-[15px] h-[15px] opacity-0" value={valueWithDef} onChange={(ev) => handleChange(ev.target.value)}/>
                            </div>
                        </InputAdornment>,
                    }}
                />
            )
        } break;
        case 'slider': {
            const sliderProp = prop as PropertySlider;
            inputToRender = (
                <Slider
                    size="small"
                    value={parseFloat(value)}
                    min={sliderProp.getMin()}
                    max={sliderProp.getMax()}
                    step={sliderProp.getStep()}
                    onChange={onChange}
                    valueLabelDisplay="auto"
                />
            )
        } break;
    }

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
            { inputToRender }
        </div>
    );
}