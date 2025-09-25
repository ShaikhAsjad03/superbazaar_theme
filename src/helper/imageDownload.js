import { ImageUrl } from "./imageUrl";
import JSZip from 'jszip';
import { saveAs } from "file-saver";

const downloadImage = async (url, index) => {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = `product-image-${index + 1}.webp`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
    } catch (err) {
        return err;
    }
};

const downloadAllImages = async (CatalogueDetailData) => {
    const allImageUrls = CatalogueDetailData?.Product.map(
        (product) => ImageUrl(product.image)
    );

    await Promise.all(
        allImageUrls.map((url, index) => downloadImage(url, index))
    );
};


 const ImageZip = async (CatalogueDetailData) => {
        const allImageUrls = CatalogueDetailData?.Product?.map(
            (product) => ImageUrl(product.image)
        );

        const zip = new JSZip();

        await Promise.all(
            allImageUrls.map(async (url, index) => {
                try {
                    const response = await fetch(url);
                    const blob = await response.blob();
                    zip.file(`product-image-${index + 1}.webp`, blob);
                } catch (err) {
                    return err;
                }
            })
        );

        const zipBlob = await zip.generateAsync({ type: "blob" });
        saveAs(zipBlob, "product-images.zip");
    };
export   {downloadAllImages,ImageZip}