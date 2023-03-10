import * as React from 'react';
import { FactsheetContext } from '../Report';
import { Resizable } from "re-resizable";
import Tooltip from '@mui/material/Tooltip';

import { Transforms } from 'slate';
import { useSelected, useFocused, useSlateStatic, ReactEditor } from 'slate-react';

export default function Artifact({ attributes, children, element }) {

    const editor = useSlateStatic();
    const { name, size } = element;
    const defaultSize = size || { width: 'auto', height: 'auto' };
    const selected = useSelected();
    const focused = useFocused();
    const [currentSize, setCurrentSize] = React.useState(defaultSize);
    const style = {
        verticalAlign: 'baseline',
        display: 'inline-block',
        boxShadow: selected && focused ? '0 0 0 2px #B4D5FF' : 'none'
    };

    const { autoReplaceList } = React.useContext(FactsheetContext) || { autoReplaceList: [] };

    const isResizable = Boolean(name.match(/^(image|table)/));

    const artifact = autoReplaceList.filter(c => (c[0] === name));

    const handleResize = (event, direction, refToElement, delta) => {
        const newSize = { width: refToElement.scrollWidth, height: refToElement.scrollHeight };
        setCurrentSize(newSize);
        const path = ReactEditor.findPath(editor, element);
        // console.log('element,path', element, path);
        Transforms.setNodes(editor, { size: newSize, resized: 1 }, { at: path });
    };

    return (
        <Tooltip title={name}>
            <span {...attributes} contentEditable={false} data-cy={`mention-${element.name.replace(/[ :\.]/g, '-')}`} style={style}>
                {children}
                {isResizable ?
                    <Resizable size={currentSize} onResizeStop={handleResize}>
                        <span className={'html-body'} dangerouslySetInnerHTML={{ __html: artifact[0] ? artifact[0][1] : 'undefined' }}></span>
                    </Resizable>
                    :
                    <span className={'html-body'} dangerouslySetInnerHTML={{ __html: artifact[0] ? artifact[0][1] : 'undefined' }}></span>}
            </span>
        </Tooltip>
    );
}

export const insertArtifact = (editor, name) => {
    const node = {
        type: 'Artifact',
        name,
        children: [{ text: '' }],
    }
    Transforms.insertNodes(editor, node)
    Transforms.move(editor)
}

export const withArtifact = editor => {
    const { isInline, isVoid, markableVoid } = editor

    editor.isInline = element => {
        return element.type === 'Artifact' ? true : isInline(element)
    }

    editor.isVoid = element => {
        return element.type === 'Artifact' ? true : isVoid(element)
    }

    editor.markableVoid = element => {
        return element.type === 'Artifact' || markableVoid(element)
    }

    return editor
}


export const visualizeImage = (artifact, API_URL, runId) => {
    if (artifact && !artifact.is_dir) {
        return '<img src="' + API_URL + 'get-artifact?path=' + encodeURIComponent(artifact.path) + '&run_id=' + runId + '" />';
    }
}

export const visualizeTable = (artifact, JSONs) => {
    if (artifact && !artifact.is_dir && JSONs[basename(artifact.path)]) {
        //{"columns":["col A","col B"],"index":["row A","row B"],"data":[["X","Y"],["0","1"]]}
        const table = JSONs[basename(artifact.path)];

        return '<table><thead><tr><td></td>' +
            table.columns.map((columnname) => (
                '<td>' + columnname + '</td>')).join('') + '</tr></thead><tbody>' +
            table.index.map((rowname, rowid) => (
                '<tr><td>' + rowname + '</td>' + table.data[rowid].map(td => '<td>' + td + '</td>').join('') + '</tr>'
            )).join('') + '</tbody></table>';

    } else {
        return '* Error *';
    }
}

export const basename = path => path.replace(/^.*[/\\]([^/\\]+)$/, '$1');

export const isFloat = n => (Number(n) % 1 !== 0);
export const roundFloat = n => {
  let nn = Number(n);
  let str = "" + nn;
  return str.replace(/^(\d+\.\d{4})\d*(e-?\d+)$/, '$1$2');
}