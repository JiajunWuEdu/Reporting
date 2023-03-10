import * as React from 'react';
import { useSlate, useFocused } from 'slate-react';
import { Editor, Transforms, Text, Range } from 'slate';
import { css, cx } from '@emotion/css';
import 'material-icons/iconfont/material-icons.css';

import Portal from './Portal';

export default function HoveringToolbar() {
    const ref = React.useRef()
    const editor = useSlate()
    const inFocus = useFocused()

    React.useEffect(() => {
        const el = ref.current
        const { selection } = editor

        if (!el) {
            return
        }

        if (!selection ||
            !inFocus ||
            Range.isCollapsed(selection) ||
            Editor.string(editor, selection) === '') {
            el.removeAttribute('style')
            return
        }

        const domSelection = window.getSelection()
        const domRange = domSelection.getRangeAt(0)
        const rect = domRange.getBoundingClientRect()
        el.style.opacity = '1'
        el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`
        el.style.left = `${rect.left +
            window.pageXOffset -
            el.offsetWidth / 2 +
            rect.width / 2}px`
    })

    return (
        <Portal>
            <Menu
                ref={ref}
                className={css`
            padding: 8px 7px 6px;
            position: absolute;
            z-index: 1;
            top: -10000px;
            left: -10000px;
            margin-top: -6px;
            opacity: 0;
            background-color: #222;
            border-radius: 4px;
            transition: opacity 0.75s;
          `}
                onMouseDown={e => {
                    // prevent toolbar from taking focus away from editor
                    e.preventDefault()
                }}
            >
                <FormatButton format="bold" icon="format_bold" />
                <FormatButton format="italic" icon="format_italic" />
                <FormatButton format="underlined" icon="format_underlined" />
            </Menu>
        </Portal>
    )
}

const toggleFormat = (editor, format) => {
    const isActive = isFormatActive(editor, format)
    Transforms.setNodes(
        editor,
        { [format]: isActive ? null : true },
        { match: Text.isText, split: true }
    )
}

const isFormatActive = (editor, format) => {
    const [match] = Editor.nodes(editor, {
        match: n => n[format] === true,
        mode: 'all',
    })
    return !!match
}

const FormatButton = ({ format, icon }) => {
    const editor = useSlate()
    return (
        <Button
            reversed
            active={isFormatActive(editor, format)}
            onClick={() => toggleFormat(editor, format)}
        >
            <Icon>{icon}</Icon>
        </Button>
    )
}

const Button = React.forwardRef(({ className, active, reversed, ...props }, ref) => (
    <span  {...props} ref={ref} className={
        cx(className,
            css`
            cursor: pointer;
            color: ${reversed
                    ? active
                        ? 'white'
                        : '#aaa'
                    : active
                        ? 'black'
                        : '#ccc'};
          `
        )}
    />
)
)

export const Icon = React.forwardRef(({ className, ...props }, ref) => (
    <span  {...props} ref={ref}
        className={cx(
            'material-icons',
            className,
            css`
            font-size: 18px;
            vertical-align: text-bottom;
          `
        )}
    />
)
)


const Menu = React.forwardRef(({ className, ...props }, ref) => (
    <div
        {...props}
        data-test-id="menu"
        ref={ref}
        className={cx(
            className,
            css`
            & > * {
              display: inline-block;
            }
  
            & > * + * {
              margin-left: 15px;
            }
          `
        )}
    />
)
)
