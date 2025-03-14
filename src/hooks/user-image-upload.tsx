import { useCallback, useEffect, useRef, useState } from "react";

interface UseImageUploadProps {
  onUpload?: (url: string) => void;
}

export function useImageUpload({ onUpload }: UseImageUploadProps = {}) {
  const previewRef = useRef<string | null>(null);
  const [file,setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleThumbnailClick = useCallback(() => {
    fileInputRef.current?.click();
    console.log("handleThumbnailClick");
  }, []);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file:File| undefined = event.target.files?.[0];
      if (file) {
        setFileName(file.name);

        const url = URL.createObjectURL(file);
        setFile(file);
        setPreviewUrl(url);
        previewRef.current = url;
        onUpload?.(url);
      }
      console.log("handleFileChange");
    },
    [],//useCallback no se ejecuta si no cambia la referencia de la funcion que se le pasa que es onUpload
  );

  const handleRemove = useCallback(() => {
    if (previewUrl) { //Este valor siempre sera el mismo a menos que pongag [previewUrl] en el array de dependencias
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setFileName(null);
    setFile(null);
    previewRef.current = null;
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    console.log("handleRemove");
  }, [previewUrl]);

  useEffect(() => {
    return () => {
      if (previewRef.current) {
        URL.revokeObjectURL(previewRef.current);
      }
      console.log("useEffect");
    };
  }, []);

  return {
    previewUrl,
    fileName,
    fileInputRef,
    file,
    handleThumbnailClick,
    handleFileChange,
    handleRemove,
  };
}