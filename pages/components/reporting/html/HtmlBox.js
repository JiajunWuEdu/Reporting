import * as React from 'react';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { Editor, Transforms, createEditor, Range } from 'slate';
import { withHistory } from 'slate-history';

import { Paper, MenuList, MenuItem, ListItemText } from '@mui/material';

import { FactsheetContext } from '../Report';
import Artifact, { insertArtifact, withArtifact } from './Artifact';

import Portal from './Portal';

import HoveringToolbar from './HoveringToolbar';



export default function HtmlBox({ id, defaultValue, value, placeholder, onBlur, onKeyUp }) {
  const editor = React.useMemo(() => withArtifact(withHistory(withReact(createEditor()))), [])

  const { filledValues, setFilledValues } = React.useContext(FactsheetContext) || { filledValues: {}, setFilledValues: ()=>{} };
  const originalValue = (id && filledValues && filledValues[id]) || defaultValue || '';

  const slateValue = (!originalValue || typeof originalValue === 'string') ? [{ type: 'paragraph', children: [{ text: originalValue }] }] : originalValue;

  /* autocomplete */
  const { autoCompleteList } = React.useContext(FactsheetContext) || { autoCompleteList: [], autoReplaceList: [] };
  const ref = React.useRef()

  const [replaceTarget, setReplaceTarget] = React.useState()
  const [KeywordTarget, setKeywordTarget] = React.useState()
  const [index, setIndex] = React.useState(0)
  const [search, setSearch] = React.useState('')

  const chars = autoCompleteList.filter(c => {
    return c.label.toLowerCase().startsWith(search.toLowerCase())
  }).slice(0, 10)

  const handleChange = (value) => {

    const { selection } = editor

    if (selection && Range.isCollapsed(selection)) {
      // start == end : isCollapsed == true
      const [start] = Range.edges(selection)
      const currentNode = Editor.node(editor, [start.path[0], start.path[1]]);
      if (currentNode && currentNode[0].type === 'Artifact') {
        console.log('currentNode', currentNode, 'start', start);
        if (currentNode[0].resized) {
          // Do not go back to source code if resized
          return true;
        }

        Transforms.insertNodes(editor, { text: '/' + currentNode[0].name }, { at: currentNode[1] });
        Transforms.removeNodes(editor, { at: currentNode[1] });

        // Transforms.setNodes(editor, {type:null,text:'/'+currentNode[0].name}, { at: currentNode[1] });
        return true;
        // const pathnew = ReactEditor.findPath(editor, element);
        // Transforms.setNodes(editor, {type:'text',text:'/'+currentNode.name}, { at: [start.path[0],start.path[1]] });
      }
      const beginning = { ...start, offset: 0 };

      const beforeRange = Editor.range(editor, beginning, start)
      const beforeText = beforeRange && Editor.string(editor, beforeRange)
      const beforeMatch = beforeText && beforeText.match(/\/(image|table|metric|param):([\w\d_.]*)$/)

      const after = Editor.after(editor, start)
      const afterRange = Editor.range(editor, start, after)
      const afterText = Editor.string(editor, afterRange)
      const afterMatch = afterText.match(/^([^\d\w\.]|$)/)

      if (beforeMatch && afterMatch) {

        const ReplaceRange = Editor.range(editor, { ...start, offset: start.offset - beforeMatch[0].length }, start)
        const KeywordRange = Editor.range(editor, { ...start, offset: start.offset - beforeMatch[2].length }, start)

        setReplaceTarget(ReplaceRange)
        setKeywordTarget(KeywordRange)
        setSearch(beforeMatch[0].substring(1))

        setIndex(0)
        return

      }

    }
    setReplaceTarget(null)
    setKeywordTarget(null)
    setFilledValues(values => ({ ...values, [id]: value }));

  };
  const onKeyDown = React.useCallback(
    event => {
      if (replaceTarget && chars.length > 0) {
        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault();
            const prevIndex = index >= chars.length - 1 ? 0 : index + 1;
            setIndex(prevIndex);
            break;
          case 'ArrowUp':
            event.preventDefault();
            const nextIndex = index <= 0 ? chars.length - 1 : index - 1;
            setIndex(nextIndex);
            break
          case 'ArrowRight':
          case 'Tab':
          case ' ':
          case 'Enter':
            event.preventDefault();
            Transforms.select(editor, replaceTarget);
            insertArtifact(editor, chars[index]['apply']);
            setReplaceTarget(null);
            break
          case 'Escape':
            event.preventDefault();
            setReplaceTarget(null);
            break
          default:
        }
      } else if (event.key == 'Backspace') {
        const { selection } = editor;
        if (selection && Range.isCollapsed(selection)) {
          const [start] = Range.edges(selection);
          const before = Editor.before(editor, start);
          if (before) {
            const currentNode = Editor.node(editor, [before.path[0], before.path[1]]);
            // console.log('Backspace', currentNode)
            if (currentNode && currentNode[0].type == 'Artifact') {
              // console.log('currentNode', currentNode, 'start', start);
              Transforms.insertNodes(editor, { text: '/' + currentNode[0].name }, { at: currentNode[1] });
              Transforms.removeNodes(editor, { at: currentNode[1] });
              event.preventDefault();
            }
          }
        }
      }
    }, [index, search, replaceTarget]);

  React.useEffect(() => {
    if (replaceTarget && chars.length > 0) {
      const el = ref.current
      const domRange = ReactEditor.toDOMRange(editor, KeywordTarget)
      const rect = domRange.getBoundingClientRect()
      el.style.top = `${rect.top + window.pageYOffset + 24}px`
      el.style.left = `${rect.left + window.pageXOffset}px`
    }
  }, [chars.length, editor, index, search, replaceTarget]);

  return (
    <Slate editor={editor} value={slateValue} onChange={handleChange}>
      <HoveringToolbar />
      <Editable
        renderLeaf={props => <Leaf {...props} />}
        renderElement={props => <Element {...props} />}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
      />
      {KeywordTarget && chars.length > 0 && (
        <Portal>
          <div
            ref={ref}
            style={{ top: '-9999px', left: '-9999px', position: 'absolute', zIndex: 1 }}
            data-cy="mentions-portal"
          >
            <Paper>
              <MenuList style={{ padding: '0 0' }}>
                {chars.map((char, i) => (
                  <MenuItem
                    key={char.label}
                    onClick={(event) => {
                      event.preventDefault();
                      Transforms.select(editor, replaceTarget);
                      insertArtifact(editor, chars[i]['apply']);
                      setReplaceTarget(null);
                      setKeywordTarget(null);
                    }}
                    style={{ color: "#000000", borderRadius: '3px', background: i === index ? '#99eeff33' : '' }}
                  >
                    <ListItemText>{char.label.split(':', 2)[1]}</ListItemText>
                  </MenuItem>
                ))}
              </MenuList>
            </Paper>
          </div>
        </Portal>
      )}
    </Slate>
  )
}

const Element = props => {
  const { attributes, children, element } = props;
  switch (element.type) {
    case 'Artifact':
      return <Artifact {...props} />;
    default:
      return <div {...attributes}>{children}</div>;
  }
}


const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underlined) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
}



