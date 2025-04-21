import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

export default function ImageGalery({ media }: { media: { id: number; file_path: string; media_type: string }[] }) {
    const galleryItems = media
        .filter((item) => item.media_type === 'image')
        .map((item) => ({
            original: `../../storage/${item.file_path}`,
        }));

    return (
        <div className="flex justify-center p-20">
            <div className="max-w-[350px]">
                {media.length > 0 && (
                    <ImageGallery
                        items={galleryItems}
                        showThumbnails={false}
                        showPlayButton={false}
                        showBullets={galleryItems.length > 1}
                    />
                )}
            </div>
        </div>
    );
}
