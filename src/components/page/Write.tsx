import React, { useEffect, useState } from 'react'

import PublishDialog from './PublishDialog';
import PostEditor from '../PostEditor';


function Write() {

  const [editorStyle, setEditorStyle] = useState<React.CSSProperties>({});


  useEffect(() => {
    const updateStyles = () => {
      if (window.innerWidth < 900) {
        setEditorStyle({
          //padding: "16px 16px 16px 42px", //Editando en movil
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
    <div className='flex flex-col justify-center items-center lg:w-full p-10 gap-12'>
      
        <PostEditor 
        customStyle={editorStyle}
        readOnly={false}
        />
      
      
      <PublishDialog />
    </div>
  )
}

export default Write