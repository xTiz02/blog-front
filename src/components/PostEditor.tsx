
import React, { useEffect, useMemo, useState } from 'react'
import YooptaEditor, { createYooptaEditor, YooptaContentValue, YooptaOnChangeOptions } from "@yoopta/editor";
import Paragraph from "@yoopta/paragraph";
import { HeadingOne, HeadingTwo, HeadingThree } from '@yoopta/headings';
import Blockquote from '@yoopta/blockquote';
import Callout from '@yoopta/callout';
import Image from '@yoopta/image';
import Code from '@yoopta/code';
import Link from '@yoopta/link';
import Divider from '@yoopta/divider';
import { NumberedList, BulletedList } from '@yoopta/lists';
//Tools
import ActionMenuList, { DefaultActionMenuRender } from '@yoopta/action-menu-list';
import Toolbar, { DefaultToolbarRender } from '@yoopta/toolbar';
import LinkTool, { DefaultLinkToolRender } from '@yoopta/link-tool';
import { Bold, Italic, CodeMark, Underline, Strike, Highlight } from '@yoopta/marks';
const plugins = [Paragraph, 
    HeadingOne.extend({
      options: {
        // HTMLAttributes: {
        //   className : "text-amber-400"
        //   // style: {
        //   //  color: 'red',
        //   // }
        // }
      }
    })
    , HeadingTwo, HeadingThree, Blockquote, Callout, 
    Image.extend({
      options: {
        maxSizes:{
          maxWidth: 300,
          maxHeight: 400
        },
        HTMLAttributes: {
          className : "md:mx-[680px] w-full rounded-xl shadow-md"
        }
      },
    }),
    NumberedList, BulletedList, Code, Link, Divider];
  
  const MARKS = [Bold, Italic, CodeMark, Underline, Strike, Highlight];
  
  const TOOLS = {
    ActionMenu: {
      render: DefaultActionMenuRender,
      tool: ActionMenuList,
    },
    Toolbar: {
      render: DefaultToolbarRender,
      tool: Toolbar,
    },
    LinkTool: {
      render: DefaultLinkToolRender,
      tool: LinkTool,
    },
  };

interface PostEditorProps {
    readOnly : boolean,
    initialContent?:YooptaContentValue,
    customStyle?:React.CSSProperties
}
function PostEditor({
    readOnly = false,
    initialContent,
    customStyle
} : PostEditorProps) {
    const editor = useMemo(() => createYooptaEditor(), []);
    const [value, setValue] = useState(initialContent);
    //const [editorStyle, setEditorStyle] = useState({});
  
    const onChange = (newValue:YooptaContentValue) => {
      if (!readOnly) {
        setValue(newValue);
      }
    };
  
    // useEffect(() => {
    //   const updateStyles = () => {
    //     let baseStyle = {};
    //     if (window.innerWidth < 900) {
    //       baseStyle = {
    //         padding: "16px 16px 16px 42px",
    //         width: "100%",
    //         minWidth: "300px",
    //         margin: "0 auto",
    //         border: "1px solid #ccc",
    //         borderRadius: "8px",
    //         boxSizing: "border-box"
    //       };
    //     } else {
    //       baseStyle = {
    //         width: "100%",
    //         maxWidth: "800px",
    //         margin: "0 auto",
    //         border: "1px solid #ccc",
    //         borderRadius: "8px",
    //         boxSizing: "border-box"
    //       };
    //     }
    //     setEditorStyle({ ...baseStyle, ...customStyle });
    //   };
      
    //   updateStyles();
    //   window.addEventListener("resize", updateStyles);
    //   return () => window.removeEventListener("resize", updateStyles);
    // }, [customStyle]);
  
    return (
      <YooptaEditor
        style={customStyle}
        editor={editor}
        plugins={plugins}
        placeholder="Type something"
        value={value}
        onChange={onChange}
        tools={TOOLS}
        marks={MARKS}
        autoFocus={!readOnly}
        readOnly={readOnly}
      />
    );
}

export default PostEditor