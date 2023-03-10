import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FactsheetContext } from '../Report';

export default function SelectBox({ id, label, options, defaultValue }) {
    
    const { filledValues, setFilledValues } = React.useContext(FactsheetContext) || { filledValues: {}, setFilledValues: ()=>{} };
    const originalValue = (id && filledValues && filledValues[id]) || defaultValue || '';
    
    const handleChange = (event) => {
        if(id) setFilledValues(values => ({ ...values, [id]: event.target.value }));
    };

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
                <InputLabel id={id + '-label'}>{label}</InputLabel>
                <Select
                    labelId={id + '-label'}
                    id={id}
                    value={originalValue}
                    onChange={handleChange}
                    autoWidth
                    label={label}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {
                        options ? options.map(option => (
                            <MenuItem key={id+'-'+option.value} value={option.value}>{option.text}</MenuItem>

                        )
                        ) : ''

                    }
                </Select>
            </FormControl>
        </div>
    );
}