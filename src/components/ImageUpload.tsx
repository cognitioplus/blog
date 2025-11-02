import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  currentImage?: string;
  onImageChange: (imageUrl: string) => void;
  onImageRemove: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  currentImage, 
  onImageChange, 
  onImageRemove 
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file type',
        description: 'Please select an image file.',
        variant: 'destructive'
      });
      return;
    }

    // Removed file size restriction to allow any image size
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onImageChange(result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleUrlSubmit = () => {
    if (imageUrl.trim()) {
      onImageChange(imageUrl.trim());
      setImageUrl('');
    }
  };

  return (
    <div className="space-y-4">
      <Label className="font-oswald text-cognitio-dark">Featured Image</Label>
      
      {currentImage ? (
        <div className="relative group">
          <img 
            src={currentImage} 
            alt="Featured" 
            className="w-full max-w-full h-auto object-contain rounded-lg border-2 border-gray-200"
            style={{ maxHeight: 'none', height: 'auto' }}
          />
          <Button
            onClick={onImageRemove}
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragOver ? 'border-cognitio-primary bg-cognitio-primary/5' : 'border-gray-300'
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          <ImageIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="font-montserrat text-gray-600 mb-4">
            Drag and drop any size image here, or click to select
          </p>
          <Button 
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            className="mb-4"
          >
            <Upload className="w-4 h-4 mr-2" />
            Choose File
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>
      )}
      
      <div className="flex space-x-2">
        <Input
          placeholder="Or paste image URL here..."
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="font-montserrat"
        />
        <Button 
          onClick={handleUrlSubmit}
          disabled={!imageUrl.trim()}
          variant="outline"
        >
          Add URL
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
