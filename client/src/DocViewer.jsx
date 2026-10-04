import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ePub from 'epubjs';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function DocumentViewer() {
  const [file, setFile] = useState(null);
  const [documentData, setDocumentData] = useState(null);
  const viewerRef = useRef(null);
  const canvasRef = useRef(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('document', file);

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setDocumentData(response.data);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  useEffect(() => {
    if (!documentData) return;
    if (viewerRef.current) viewerRef.current.innerHTML = '';

    const renderDocument = async () => {
      if (documentData.originalName.endsWith('.epub')) {
        // Render EPUB using epubjs
        const book = ePub(documentData.fileUrl);
        const rendition = book.renderTo(viewerRef.current, {
          width: '100%',
          height: '600px',
          spread: 'none'
        });
        rendition.display();
      } 
      else if (documentData.originalName.endsWith('.pdf')) {
        const loadingTask = pdfjsLib.getDocument(documentData.fileUrl);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);
        
        const scale = 1.5;
        const viewport = page.getViewport({ scale });
        
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        page.render(renderContext);
      }
    };

    renderDocument();
  }, [documentData]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Upload & View Document</h2>
      
      <form onSubmit={handleUpload} style={{ marginBottom: '2rem' }}>
        <input 
          type="file" 
          accept=".pdf,.epub" 
          onChange={(e) => setFile(e.target.files[0])} 
        />
        <button type="submit">Upload</button>
      </form>

      <div style={{ border: '1px solid #ccc', minHeight: '600px', position: 'relative' }}>
        {/* EPUB cont */}
        <div ref={viewerRef} style={{ width: '100%', height: '100%' }}></div>
        
        {/* PDF cont */}
        <canvas 
          ref={canvasRef} 
          style={{ 
            display: documentData?.originalName.endsWith('.pdf') ? 'block' : 'none', 
            margin: '0 auto' 
          }}
        ></canvas>
      </div>
    </div>
  );
}