
import React, { useState } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';

interface StorySegment {
  id: string;
  text: string;
  unlockOrder: number;
}

interface StoryUploadProps {
  onStoryUploaded: (storyData: StorySegment[]) => void;
}

const StoryUpload: React.FC<StoryUploadProps> = ({ onStoryUploaded }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const parseStoryFile = (content: string, filename: string): StorySegment[] => {
    try {
      // Try parsing as JSON first
      if (filename.endsWith('.json')) {
        const data = JSON.parse(content);
        if (Array.isArray(data)) {
          return data.map((item, index) => ({
            id: item.id || `segment-${index}`,
            text: item.text || item.content || String(item),
            unlockOrder: item.unlockOrder || item.order || index + 1
          }));
        }
        throw new Error('JSON must be an array of story segments');
      }
      
      // Handle plain text - split by double newlines or numbered sections
      const segments = content
        .split(/\n\n+|\d+\.\s*/)
        .filter(segment => segment.trim().length > 0)
        .map((text, index) => ({
          id: `segment-${index}`,
          text: text.trim(),
          unlockOrder: index + 1
        }));
      
      if (segments.length === 0) {
        throw new Error('No story content found in file');
      }
      
      return segments;
    } catch (error) {
      throw new Error(`Failed to parse story file: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const storyData = parseStoryFile(content, file.name);
        
        // Store in localStorage
        localStorage.setItem('custom-story-data', JSON.stringify(storyData));
        
        onStoryUploaded(storyData);
        setUploadStatus('success');
        setErrorMessage('');
      } catch (error) {
        setUploadStatus('error');
        setErrorMessage(error instanceof Error ? error.message : 'Failed to upload file');
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const file = files[0];
    
    if (file && (file.type === 'application/json' || file.type === 'text/plain' || file.name.endsWith('.txt') || file.name.endsWith('.json'))) {
      handleFileUpload(file);
    } else {
      setUploadStatus('error');
      setErrorMessage('Please upload a .txt or .json file');
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <div className="mb-8">
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
          isDragging 
            ? 'border-amber-400 bg-amber-50/50' 
            : uploadStatus === 'success'
            ? 'border-emerald-400 bg-emerald-50/50'
            : uploadStatus === 'error'
            ? 'border-red-400 bg-red-50/50'
            : 'border-amber-300 bg-gradient-to-br from-amber-50/30 to-orange-50/30 hover:border-amber-400'
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
      >
        <input
          type="file"
          accept=".txt,.json"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="flex flex-col items-center space-y-4">
          {uploadStatus === 'success' ? (
            <CheckCircle className="w-12 h-12 text-emerald-600" />
          ) : uploadStatus === 'error' ? (
            <AlertCircle className="w-12 h-12 text-red-600" />
          ) : (
            <Upload className="w-12 h-12 text-amber-600" />
          )}
          
          <div>
            <h3 className="font-cinzel font-bold text-xl text-amber-900 mb-2">
              Upload Your Story
            </h3>
            <p className="font-crimson text-amber-700 mb-2">
              Drag & drop your story file here, or click to browse
            </p>
            <p className="font-crimson text-sm text-amber-600">
              Supports .txt and .json files
            </p>
          </div>
          
          {uploadStatus === 'success' && (
            <p className="font-crimson text-emerald-700 text-sm">
              ✨ Story uploaded successfully! Your custom adventure awaits.
            </p>
          )}
          
          {uploadStatus === 'error' && (
            <p className="font-crimson text-red-700 text-sm">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
      
      {uploadStatus === 'idle' && (
        <div className="bg-gradient-to-r from-purple-100 to-indigo-100 border border-purple-300 rounded-lg p-4 mt-4">
          <h4 className="font-cinzel font-semibold text-purple-900 mb-2">Story Format Examples:</h4>
          <div className="font-crimson text-purple-800 text-sm space-y-2">
            <p><strong>JSON format:</strong> [{"text": "Your story begins...", "unlockOrder": 1}, ...]</p>
            <p><strong>Text format:</strong> Separate story segments with double line breaks</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryUpload;
