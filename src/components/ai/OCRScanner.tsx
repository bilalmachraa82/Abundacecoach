import React, { useRef, useState } from 'react';
import { Camera, X } from 'lucide-react';
import { createWorker } from 'tesseract.js';
import { useTransactions } from '../../hooks/useTransactions';
import { extractReceiptData } from '../../utils/receiptParser';

interface OCRScannerProps {
  onClose: () => void;
  onScanComplete: (data: { amount: number; description: string; category?: string }) => void;
}

export function OCRScanner({ onClose, onScanComplete }: OCRScannerProps) {
  const [processing, setProcessing] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processImage = async (file: File) => {
    try {
      setProcessing(true);
      const worker = await createWorker('eng');
      const {
        data: { text },
      } = await worker.recognize(file);
      await worker.terminate();

      const extractedData = extractReceiptData(text);
      onScanComplete(extractedData);
    } catch (error) {
      console.error('OCR processing failed:', error);
    } finally {
      setProcessing(false);
      onClose();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
      processImage(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-xl bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Scan Receipt</h3>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div
          className="mb-4 flex aspect-video cursor-pointer items-center justify-center rounded-lg bg-gray-100"
          onClick={() => fileInputRef.current?.click()}
        >
          {processing ? (
            <div className="text-center">
              <div className="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-b-2 border-purple-600" />
              <p className="text-sm text-gray-500">Processing receipt...</p>
            </div>
          ) : preview ? (
            <img src={preview} alt="Receipt preview" className="max-h-full rounded-lg" />
          ) : (
            <div className="text-center">
              <Camera className="mx-auto mb-2 h-8 w-8 text-gray-400" />
              <p className="text-sm text-gray-500">Click to capture receipt</p>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
}
