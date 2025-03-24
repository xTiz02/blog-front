import React, { useEffect, useState } from 'react'
import PostEditor from '../PostEditor'
import data from '/src/data/publish-data.json' 
import { YooptaContentValue } from '@yoopta/editor'

function PostPage() {
  const [editorStyle, setEditorStyle] = useState<React.CSSProperties>({});
  useEffect(() => {
    const updateStyles = () => {
      if (window.innerWidth < 900) {
        setEditorStyle({
          //padding: "16px 16px 16px 42px", //Editando en movil
          width: "100%",
          minWidth: "300px",
          boxSizing: "border-box"
        });
      } else {
        setEditorStyle({
          width: "100%",
          maxWidth: "800px",
          boxSizing: "border-box"
        });
      }
    };
    updateStyles();
    window.addEventListener("resize", updateStyles);
    
    return () => window.removeEventListener("resize", updateStyles);
  }, []);
  return (
    <div className='flex flex-col justify-center items-center lg:w-full p-10 gap-12'>
      <div className=''>
        <h1 className='text-4xl font-bold'>Titulo del post</h1>
        <p className='text-lg font-light'>Descripcion del post</p>
        <div className='flex items-center gap-4'>
          <img src='https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png' alt='user' className='w-10 h-10 rounded-full'/>
          <p className='text-lg font-light'>Nombre del usuario</p>
        </div>
      </div>
      <PostEditor 
      readOnly={true} 
      initialContent={data as YooptaContentValue} 
      customStyle={editorStyle}/>
    </div>
  )
}

export default PostPage