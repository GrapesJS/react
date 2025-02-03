import { useEditor } from "@grapesjs/react";
import { mdiArrowDownDropCircle, mdiArrowUpDropCircle, mdiClose, mdiDelete, mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import type { Property, PropertyComposite, PropertyRadio, PropertySelect, PropertySlider, PropertyStack } from "grapesjs";
import { BTN_CLS, ROUND_BORDER_COLOR, cx } from "../common";

interface StylePropertyFieldProps extends React.HTMLProps<HTMLDivElement> {
    prop: Property;
}

export default function StylePropertyField({ prop, ...rest }: StylePropertyFieldProps) {
    const editor = useEditor();
    const handleChange = (value: string) => {
        prop.upValue(value);
    };

    const onChange = (ev: any) => {
        handleChange(ev.target.value);
    };

    const openAssets = () => {
        const { Assets } = editor;
        Assets.open({
            select: (asset, complete) => {
                console.log({ complete })
                prop.upValue(asset.getSrc(), { partial: !complete });
                complete && Assets.close();
            },
            types: ['image'],
            accept: 'image/*',
        });
    }

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
                            <div className={`w-[15px] h-[15px] ${ROUND_BORDER_COLOR}`} style={{ backgroundColor: valueWithDef }}>
                                <input type="color" className="w-[15px] h-[15px] cursor-pointer opacity-0" value={valueWithDef} onChange={(ev) => handleChange(ev.target.value)}/>
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
        case 'file': {
            inputToRender = (
                <div className="flex flex-col items-center gap-3">
                    {
                        value && value !== defValue &&
                        <div
                            className="w-[50px] h-[50px] rounded inline-block bg-cover bg-center cursor-pointer"
                            style={{ backgroundImage: `url("${value}")` }}
                            onClick={() => handleChange('')}
                        />
                    }
                    <button type="button" onClick={openAssets} className={BTN_CLS}>
                        Select Image
                    </button>
                </div>
            );
        } break;
        case 'composite': {
            const compositeProp = prop as PropertyComposite;
            inputToRender = (
                <div className={cx('flex flex-wrap p-2 bg-black/20', ROUND_BORDER_COLOR)}>
                    {compositeProp.getProperties().map(prop => (
                        <StylePropertyField key={prop.getId()} prop={prop} />
                    ))}
                </div>
            );
        } break;
        case 'stack': {
            const stackProp = prop as PropertyStack;
            const layers = stackProp.getLayers();
            const isTextShadow = stackProp.getName() === 'text-shadow';
            inputToRender = (
                <div className={cx('flex flex-col p-2 gap-2 bg-black/20 min-h-[54px]', ROUND_BORDER_COLOR)}>
                    {layers.map(layer => (
                            <div key={layer.getId()} className={ROUND_BORDER_COLOR}>
                                <div className="flex gap-1 bg-slate-800 px-2 py-1 items-center">
                                    <IconButton size="small" onClick={() => layer.move(layer.getIndex() - 1)}>
                                        <Icon size={0.7} path={mdiArrowUpDropCircle}/>
                                    </IconButton>
                                    <IconButton size="small" onClick={() => layer.move(layer.getIndex() + 1)}>
                                        <Icon size={0.7} path={mdiArrowDownDropCircle}/>
                                    </IconButton>
                                    <button className="flex-grow" onClick={() => layer.select()}>
                                        { layer.getLabel() }
                                    </button>
                                    <div
                                        className={cx('bg-white min-w-[17px] min-h-[17px] text-black text-sm flex justify-center', ROUND_BORDER_COLOR)}
                                        style={layer.getStylePreview({ number: { min: -3, max: 3 }, camelCase: true })}
                                    >
                                        { isTextShadow && 'T' }
                                    </div>
                                    <IconButton size="small" onClick={() => layer.remove()}>
                                        <Icon size={0.7} path={mdiDelete}/>
                                    </IconButton>
                                </div>
                                {
                                    layer.isSelected() &&
                                    <div className="p-2 flex flex-wrap">
                                        {stackProp.getProperties().map(prop => (
                                            <StylePropertyField key={prop.getId()} prop={prop} />
                                        ))}
                                    </div>
                                }
                            </div>
                    ))}
                </div>
            );
        } break;
    }

    return (
        <div {...rest} className={cx('mb-3 px-1', prop.isFull() ? 'w-full' : 'w-1/2')} >
            <div className={cx('flex mb-2 items-center', canClear && 'text-sky-300')}>
                <div className="flex-grow capitalize">{ prop.getLabel() }</div>
                {
                    canClear &&
                    <button onClick={() => prop.clear()}>
                        <Icon path={mdiClose} size={0.7}/>
                    </button>
                }
                {
                    type === 'stack' &&
                    <IconButton
                        size="small"
                        className="!ml-2"
                        onClick={() => (prop as PropertyStack).addLayer({}, { at: 0 })}
                    >
                        <Icon size={1} path={mdiPlus}/>
                    </IconButton>
                }
            </div>
            { inputToRender }
        </div>
    );
}