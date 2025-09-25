import { ImageUrl } from '@/helper/imageUrl';
import JSZip from 'jszip';
import { FileArchive } from 'lucide-react';
import React from 'react'
import { saveAs } from "file-saver";

const DownloadZip = ({ CatalogueDetailData }) => {
    return (
        <button
            onClick={() => { ImageZip(CatalogueDetailData) }}
            title="Product Zip"
            className="p-2 border rounded-md border-s border-gray-400 hover:bg-sky-100">
            <FileArchive size={20} />
        </button>
    )
}

export default DownloadZip
