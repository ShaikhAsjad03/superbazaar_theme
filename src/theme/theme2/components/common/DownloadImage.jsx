import { downloadAllImages } from '@/helper/imageDownload';
import { Download } from 'lucide-react';
import React from 'react'

const DownloadImage = ({ CatalogueDetailData }) => {
    return (
        <button
            onClick={() => { downloadAllImages(CatalogueDetailData) }}
            title="Product Download"
            className="p-2 border rounded-md border-s border-gray-400 hover:bg-sky-100"
        >
            <Download size={20} />
        </button>
    )
}

export default DownloadImage
