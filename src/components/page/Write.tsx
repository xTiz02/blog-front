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

//Marks
import { Bold, Italic, CodeMark, Underline, Strike, Highlight } from '@yoopta/marks';
import { Button } from '../ui/button';
import PublishDialog from './PublishDialog';

const plugins = [Paragraph, 
  HeadingOne.extend({
    options: {
      HTMLAttributes: {
        className : "text-amber-400"
        // style: {
        //  color: 'red',
        // }
      }
    }
  })
  , HeadingTwo, HeadingThree, Blockquote, Callout, 
  Image.extend({
    options: {
      maxSizes:{
        maxWidth: 400,
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

function Write() {
  const editor = useMemo(() => createYooptaEditor(), []);
  const [value, setValue] = useState<YooptaContentValue>({});
  const onChange = (value: YooptaContentValue, options: YooptaOnChangeOptions) => {
    setValue(value);
  };

  const [editorStyle, setEditorStyle] = useState<React.CSSProperties>({});

  const onPublish = () => {
    const editorContent = editor.getEditorValue();
    //const parsedData = data as YooptaContentValue;
    //editor.setEditorValue(parsedData);
    console.log(editorContent);
  }

  useEffect(() => {
    const updateStyles = () => {
      if (window.innerWidth < 900) {
        setEditorStyle({
          padding: "16px 16px 16px 42px", //Editando en movil
          width: "100%",
          minWidth: "300px",
          margin: "0 auto",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxSizing: "border-box"
        });
      } else {
        setEditorStyle({
          width: "100%",
          maxWidth: "800px",
          margin: "0 auto",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxSizing: "border-box"
        });
      }
    };
    updateStyles();
    window.addEventListener("resize", updateStyles);
    
    return () => window.removeEventListener("resize", updateStyles);
  }, []);

  
  
  return (
    <div className='flex flex-col justify-center items-center lg:w-full py-8 gap-12'>
      
      <YooptaEditor style={editorStyle}
      //width={300}
      editor={editor}
      plugins={plugins}
      placeholder="Type something"
      //selectionBoxRoot={selectionRef}
      value={value}
      onChange={onChange}
      tools={TOOLS}
      marks={MARKS}
      autoFocus
      readOnly={false}
      />
      <PublishDialog data={value}/>
    </div>
  )
}

export default Write