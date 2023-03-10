import React from "react";
import HtmlBox from "./html/HtmlBox";
import SelectBox from "./selectbox/SelectBox";
import { FactsheetContext } from "./Report";

const nameToComponentType = n => {
    switch (n) {
        case 'HtmlBox':
            return HtmlBox;
        case 'SelectBox':
            return SelectBox;
        default:
            return n;
    }
}

const Template = ({ content, onChange }) => {

    const { filledValue } = React.useContext(FactsheetContext) || { filledValue: {} };

    // Normally, prop.content should be an array or a string.
    // Since content is the only prop of Template, if it is empty, the component will do nothing.
    if (!content) return null;
    // If the content is a string, just display it.
    if (typeof content === 'string') return content;
    // Then it must be an arrray, or just give up.
    if (!Array.isArray(content)) return null;
    // Iterate the array.
    // console.log('filledValue', filledValue);

    return content.map((obj, index) => {
        if (!obj) return '';
        if (typeof obj === 'string') return obj.content;
        if (typeof obj === 'object') {
            if (obj.id && filledValue && filledValue.hasOwnProperty(obj.id)) obj.value = filledValue[obj.id];
            if (obj.content)
                return React.createElement(nameToComponentType(obj.type), { ...obj.prop, key: index } || { key: index }, <Template content={obj.content} />);
            else
                return React.createElement(nameToComponentType(obj.type), { ...obj.prop, key: index } || { key: index });
        }
        return '';
    });
};

export default Template;