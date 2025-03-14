import React, { useCallback, useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { YooptaContentValue } from '@yoopta/editor'
import { ScrollArea } from '../ui/scroll-area'
import { Input } from '../ui/input'
import { ImagePlus, Trash2, Upload, X } from 'lucide-react'
import { useImageUpload } from '@/hooks/user-image-upload'
import { cn } from '@/lib/utils'

function PublishDialog({data}:{data:YooptaContentValue}) {

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



  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Publish</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:hidden">
        <ScrollArea className="flex max-h-1/2 flex-col">
          <DialogHeader className="contents space-y-0 text-left">
            <DialogTitle className="px-6 pt-6">Frequently Asked Questions (FAQ)</DialogTitle>
            <DialogDescription asChild>
              <div className="p-6">
                <div className="space-y-4 [&_strong]:font-semibold [&_strong]:text-foreground">
                  
                <div className="w-full max-w-md space-y-6 rounded-xl border border-border bg-card p-6 shadow-sm">
                    <div className="space-y-2">
                        <h3 className="text-lg font-medium">Image Upload</h3>
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
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="px-6 pb-6 sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="button">Okay</Button>
            </DialogClose>
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