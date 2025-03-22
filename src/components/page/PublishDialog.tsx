import React, { useCallback, useEffect, useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { YooptaContentValue } from '@yoopta/editor'
import { ScrollArea } from '../ui/scroll-area'
import { Input } from '../ui/input'
import { ImagePlus, Trash2, Upload, X } from 'lucide-react'
import { useImageUpload } from '@/hooks/user-image-upload'
import { cn } from '@/lib/utils'
import { useTags } from '@/hooks/use-tags'


interface Tag {
  id: string;
  label: string;
  color?: string;
}

interface PublishData{
  tags: Tag[];
  image: File;
  data: YooptaContentValue;
}



function PublishDialog({data}:{data:YooptaContentValue}) {
    console.log("publish dialog")
    const {
    previewUrl,
    fileName,
    fileInputRef,
    file,
    handleThumbnailClick,
    handleFileChange,
    handleRemove,
    } = useImageUpload({
    onUpload: (url) => console.log("Uploaded image URL:", url),
    })

    const [isDragging, setIsDragging] = useState(false)

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
    }

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
    }

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
      
      const file:File = e.dataTransfer.files?.[0]
      if (file && file.type.startsWith("image/")) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        const fakeEvent = {
          target: {
            files: dataTransfer.files,
          },
        } as React.ChangeEvent<HTMLInputElement>;

        handleFileChange(fakeEvent)
      }
    },[handleFileChange],)


    const [inputValue, setInputValue] = useState("");
    const [results, setResults] = useState<Tag[]>([]); 
    const [showResults, setShowResults] = useState<boolean>(false); 
    const { tags, addTag, removeTag, removeLastTag, hasReachedMax } = useTags({
      maxTags: 4,
      onChange: (tags) => console.log("Tags updated:", tags),
    });
  
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Backspace" && !inputValue) {
        e.preventDefault();
        removeLastTag();
      }
      if (e.key === "Enter" && inputValue) {
        e.preventDefault();
        addTag({ id: inputValue.toLowerCase(), label: inputValue });
        setInputValue("");
      }
    };

    useEffect(() => {
      if (inputValue.length < 2) {
        setResults([]); 
        setShowResults(false);
        return;
      }
  
      const delaySearch = setTimeout(() => {
        fetch(`https://api.ejemplo.com/busqueda?q=${inputValue}`)
          .then(res => res.json())
          .then(data => {
            setResults(data); 
            setShowResults(true);
          })
          .catch(err => console.error(err))
          //.finally(() => setLoading(false));
      }, 500);
  
      return () => clearTimeout(delaySearch); // Limpiar timeout si el usuario sigue escribiendo
    }, [inputValue]);
    


    const publishPost = () => {
      const publishData:PublishData = {
        tags: tags,
        image: file!,
        data: data
      }
      console.log(publishData)
      
      const formData: FormData = new FormData();

      formData.append("image",publishData.image);
      formData.append("tags",JSON.stringify(publishData.tags));
      formData.append("data",JSON.stringify(publishData.data));

      fetch("https://api.ejemplo.com/publish",{
        method: "POST",
        body: formData
      })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err))

    }



  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Publish</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:hidden">
        <ScrollArea className="flex min-h-full flex-col">
          <DialogHeader className="contents space-y-0 text-left">
            <DialogTitle className="px-6 pt-6">Complete this fields to Publish Post</DialogTitle>
            <DialogDescription asChild>
              <div className="p-6">
                <div className="space-y-7 [&_strong]:font-semibold [&_strong]:text-foreground">
                  
                    <div className="w-full space-y-2">
                      <div>
                        <label className="text-sm font-medium">Tags <span className='text-muted-foreground text-[12px]'> : (Max 4)</span></label>
                      </div>
                      <div className="rounded-lg border border-input bg-background p-1">
                        <div className="flex flex-wrap gap-1">
                          {tags.map((tag) => (
                            <span
                              key={tag.id}
                              className={cn(
                                "inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm",
                                tag.color || "bg-primary/10 text-primary"
                              )}
                            >
                              {tag.label}
                              <button
                                onClick={() => removeTag(tag.id)}
                                className="rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/20"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </span>
                          ))}
                          <input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={hasReachedMax ? "Max tags reached" : "Add tag..."}
                            disabled={hasReachedMax}
                            className="flex-1 bg-transparent px-2 py-1 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
                          />
                        </div>
                      </div>
                    </div>
                    {showResults && (
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Suggestions</label>
                      <div className="flex flex-wrap gap-2">
                        {results.map((suggestion) => (
                          <Button
                            key={suggestion.id}
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              if (!tags.find(t => t.id === suggestion.id)) {
                                addTag(suggestion);
                              }
                            }}
                            disabled={hasReachedMax || tags.find(t => t.id === suggestion.id) && true}
                          >
                            {suggestion.label}
                          </Button>
                        ))}
                      </div>
                    </div> )}
                  
                    <div className="w-full space-y-2">
                      <div>
                        <label className="text-sm font-medium">Upload Image :</label>
                      </div>
                      <div className="w-full space-y-6 rounded-xl border border-border bg-card p-6 shadow-sm">
                        
                          <div className="space-y-2">
                              <p className="text-sm text-muted-foreground">
                              Supported formats: JPG, PNG, GIF
                              </p>
                          </div>

                          <Input
                              type="file"
                              accept="image/x-png,image/gif,image/jpeg"
                              className="hidden"
                              ref={fileInputRef}
                              onChange={handleFileChange}
                          />

                        {!previewUrl ? (
                            <div
                            onClick={handleThumbnailClick}
                            onDragOver={handleDragOver}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop} //cuando se suelta el archivo en el area de drop
                            className={cn(
                                "flex h-64 cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors hover:bg-muted",
                                isDragging && "border-primary/50 bg-primary/5",
                            )}
                            >
                            <div className="rounded-full bg-background p-3 shadow-sm">
                                <ImagePlus className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-medium">Click to select</p>
                                <p className="text-xs text-muted-foreground">
                                or drag and drop file here
                                </p>
                            </div>
                            </div>
                        ) : (
                            <div className="relative">
                            <div className="group relative h-64 overflow-hidden rounded-lg border">
                                <img
                                src={previewUrl}
                                alt="Preview"
                              
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />
                                <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={handleThumbnailClick}
                                    className="h-9 w-9 p-0"
                                >
                                    <Upload className="h-4 w-4" />
                                </Button>
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={handleRemove}
                                    className="h-9 w-9 p-0"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                                </div>
                            </div>
                            {fileName && (
                                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                                <span className="truncate">{fileName}</span>
                                <button
                                    onClick={handleRemove}
                                    className="ml-auto rounded-full p-1 hover:bg-muted"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                                </div>
                            )}
                            </div>
                        )}
                      </div>
                      </div>
                    </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="px-6 pb-6 sm:justify-center">
            
              <Button type="button" onClick={publishPost} disabled={tags.length === 0 || file == null}>Publish</Button>
            
          </DialogFooter>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default PublishDialog


// const myString = z.string().refine((val) => val.length <= 255, {
//   message: "String can't be more than 255 characters",
// });

// const longString = z.string().refine(
//   (val) => val.length > 10,
//   (val) => ({ message: `${val} is not more than 10 characters` })
// );

// const passwordForm = z
//   .object({
//     password: z.string(),
//     confirm: z.string(),
//   })
//   .refine((data) => data.password === data.confirm, {
//     message: "Passwords don't match",
//     path: ["confirm"], // path of error
//   });

// passwordForm.parse({ password: "asdf", confirm: "qwer" });

// validations
// z.string().max(5);
// z.string().min(5);
// z.string().length(5);
// z.string().email();
// z.string().url();
// z.string().emoji();
// z.string().uuid();
// z.string().nanoid();
// z.string().cuid();
// z.string().cuid2();
// z.string().ulid();
// z.string().regex(regex);
// z.string().includes(string);
// z.string().startsWith(string);
// z.string().endsWith(string);
// z.string().datetime(); // ISO 8601; by default only `Z` timezone allowed
// z.string().ip(); // defaults to allow both IPv4 and IPv6
// z.string().cidr(); // defaults to allow both IPv4 and IPv6

// // transforms
// z.string().trim(); // trim whitespace
// z.string().toLowerCase(); // toLowerCase
// z.string().toUpperCase(); // toUpperCase

// // added in Zod 3.23
// z.string().date(); // ISO date format (YYYY-MM-DD)
// z.string().time(); // ISO time format (HH:mm:ss[.SSSSSS])
// z.string().duration(); // ISO 8601 duration
// z.string().base64();

// z.number().gt(5);
// z.number().gte(5); // alias .min(5)
// z.number().lt(5);
// z.number().lte(5); // alias .max(5)

// z.number().int(); // value must be an integer

// z.number().positive(); //     > 0
// z.number().nonnegative(); //  >= 0
// z.number().negative(); //     < 0
// z.number().nonpositive(); //  <= 0

// z.number().multipleOf(5); // Evenly divisible by 5. Alias .step(5)

// z.number().finite(); // value must be finite, not Infinity or -Infinity
// z.number().safe(); // value must be between Number.MIN_SAFE_INTEGER and Number.MAX_SAFE_INTEGER