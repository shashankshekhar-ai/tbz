import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A gallery of images from The Bradbury Group.",
};

const placeholderImages = [
  { id: 1, label: "Image 1", color: "#0c2940" },
  { id: 2, label: "Image 2", color: "#39918d" },
  { id: 3, label: "Image 3", color: "#f8c51c" },
  { id: 4, label: "Image 4", color: "#60707A" },
  { id: 5, label: "Image 5", color: "#123856" },
  { id: 6, label: "Image 6", color: "#081b2a" },
];

export default function GalleryPage() {
  return (
    <div>
      <section className="relative -mt-20 pt-32 pb-16 bg-[#0c2940] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#123856_0%,#0c2940_45%,#081b2a_100%)] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-inter font-bold tracking-widest text-[#39918d] uppercase block mb-3">
            Gallery
          </span>
          <h1 className="text-4xl sm:text-5xl font-montserrat font-bold text-white mb-4">Gallery</h1>
          <p className="text-lg font-roboto text-[#D9E3E6] max-w-xl">
            A look at moments from our work with leaders and organizations.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {placeholderImages.map((image) => (
            <div
              key={image.id}
              className="aspect-video rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: image.color }}
            >
              <span className="text-white font-inter font-semibold text-lg">{image.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
