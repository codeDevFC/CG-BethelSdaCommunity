"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, X, ChevronLeft, ChevronRight, 
  Grid, LayoutGrid, Image as ImageIcon, 
  Calendar, Heart, Share2, Download, ZoomIn,
  Play, Pause, Volume2, VolumeX, Music
} from "lucide-react";
import Link from "next/link";
import DashboardShell from "@/components/DashboardShell";
import AuthGuard from "@/components/AuthGuard";
import Image from "next/image";

// Gallery images data
const galleryImages = [
  { id: 1, src: "/images/gallery/cg-01.jpg", title: "Worship Night", category: "worship", date: "2024-01-15" },
  { id: 2, src: "/images/gallery/cg-02.jpg", title: "Bible Study", category: "study", date: "2024-01-22" },
  { id: 3, src: "/images/gallery/cg-03.jpg", title: "Fellowship", category: "fellowship", date: "2024-01-29" },
  { id: 4, src: "/images/gallery/cg-04.jpg", title: "Outreach", category: "outreach", date: "2024-02-05" },
  { id: 5, src: "/images/gallery/cg-05.jpg", title: "Prayer Meeting", category: "prayer", date: "2024-02-12" },
  { id: 6, src: "/images/gallery/cg-06.jpg", title: "Retreat", category: "retreat", date: "2024-02-19" },
  { id: 7, src: "/images/gallery/cg-07.jpg", title: "Baptism", category: "baptism", date: "2024-02-26" },
  { id: 8, src: "/images/gallery/cg-08.jpg", title: "Conference", category: "conference", date: "2024-03-04" },
  { id: 9, src: "/images/gallery/cg-09.jpg", title: "Youth Event", category: "youth", date: "2024-03-11" },
  { id: 10, src: "/images/gallery/cg-10.jpg", title: "Women's Ministry", category: "ministry", date: "2024-03-18" },
  { id: 11, src: "/images/gallery/cg-11.jpg", title: "Men's Fellowship", category: "fellowship", date: "2024-03-25" },
  { id: 12, src: "/images/gallery/cg-12.jpg", title: "Christmas Celebration", category: "celebration", date: "2024-12-25" },
  { id: 13, src: "/images/gallery/cg-13.jpg", title: "Easter Service", category: "worship", date: "2024-03-31" },
  { id: 14, src: "/images/gallery/cg-14.jpg", title: "Community Service", category: "outreach", date: "2024-04-07" },
  { id: 15, src: "/images/gallery/cg-15.jpg", title: "Leadership Training", category: "training", date: "2024-04-14" },
  { id: 16, src: "/images/gallery/cg-16.jpg", title: "Music Ministry", category: "worship", date: "2024-04-21" },
  { id: 17, src: "/images/gallery/cg-17.jpg", title: "Children's Day", category: "children", date: "2024-04-28" },
  { id: 18, src: "/images/gallery/cg-18.jpg", title: "Harvest Festival", category: "celebration", date: "2024-05-05" },
  { id: 19, src: "/images/gallery/cg-19.jpg", title: "Mission Trip", category: "mission", date: "2024-05-12" },
  { id: 20, src: "/images/gallery/cg-20.jpg", title: "Anniversary", category: "celebration", date: "2024-05-19" }
];

const categories = [
  { id: "all", name: "All Photos", icon: Grid },
  { id: "worship", name: "Worship", icon: Music },
  { id: "fellowship", name: "Fellowship", icon: Heart },
  { id: "outreach", name: "Outreach", icon: Share2 },
  { id: "study", name: "Bible Study", icon: ImageIcon },
  { id: "celebration", name: "Celebration", icon: Calendar }
];

export default function GalleryPage() {
  const params = useParams();
  const router = useRouter();
  const groupId = params?.groupId || "1";
  
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("grid");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredImages = galleryImages.filter(img => {
    const matchesCategory = selectedCategory === "all" || img.category === selectedCategory;
    const matchesSearch = img.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openLightbox = (image: typeof galleryImages[0]) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    if (direction === "prev" && currentIndex > 0) {
      setSelectedImage(filteredImages[currentIndex - 1]);
    } else if (direction === "next" && currentIndex < filteredImages.length - 1) {
      setSelectedImage(filteredImages[currentIndex + 1]);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigateLightbox("prev");
      if (e.key === "ArrowRight") navigateLightbox("next");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, filteredImages]);

  return (
    <AuthGuard>
      <DashboardShell>
        <div className="space-y-6 pb-20">
          {/* Header */}
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <Link href={`/group/${groupId}`} className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition">
                <ArrowLeft size={20} />
              </Link>
              <div>
                <h1 className="text-3xl lg:text-4xl font-black tracking-tighter uppercase" style={{ fontFamily: 'Georgia, serif' }}>
                  Gallery
                </h1>
                <p className="text-gray-500 text-sm">Capturing God's faithfulness through moments</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-xl transition ${viewMode === "grid" ? "bg-[#012169] text-white" : "bg-gray-100 text-gray-600"}`}
              >
                <LayoutGrid size={18} />
              </button>
              <button
                onClick={() => setViewMode("masonry")}
                className={`p-2 rounded-xl transition ${viewMode === "masonry" ? "bg-[#012169] text-white" : "bg-gray-100 text-gray-600"}`}
              >
                <Grid size={18} />
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="bg-gradient-to-r from-[#012169] to-[#547189] rounded-2xl p-6 text-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-3xl font-black">{galleryImages.length}</p>
                <p className="text-xs opacity-80 uppercase">Total Photos</p>
              </div>
              <div>
                <p className="text-3xl font-black">{categories.length - 1}</p>
                <p className="text-xs opacity-80 uppercase">Categories</p>
              </div>
              <div>
                <p className="text-3xl font-black">{new Date().getFullYear() - 2024 + 1}</p>
                <p className="text-xs opacity-80 uppercase">Years Active</p>
              </div>
              <div>
                <p className="text-3xl font-black">∞</p>
                <p className="text-xs opacity-80 uppercase">God's Faithfulness</p>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search photos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#012169]"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
                      selectedCategory === cat.id
                        ? "bg-[#012169] text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <Icon size={14} />
                    <span className="text-xs font-black uppercase">{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Gallery Grid */}
          {filteredImages.length === 0 ? (
            <div className="text-center py-20">
              <ImageIcon size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">No photos found in this category.</p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((image, idx) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => openLightbox(image)}
                  className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden cursor-pointer"
                >
                  <div className="relative w-full h-full">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white font-bold text-sm">{image.title}</p>
                      <p className="text-white/70 text-xs">{image.category}</p>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 bg-black/50 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn size={14} className="text-white" />
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {filteredImages.map((image, idx) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => openLightbox(image)}
                  className="break-inside-avoid mb-4 relative group cursor-pointer rounded-xl overflow-hidden"
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full rounded-xl transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white font-bold text-sm">{image.title}</p>
                      <p className="text-white/70 text-xs">{image.category}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
              onClick={closeLightbox}
            >
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 p-2 bg-white/10 rounded-full hover:bg-white/20 transition"
              >
                <X size={24} className="text-white" />
              </button>
              
              <button
                onClick={(e) => { e.stopPropagation(); navigateLightbox("prev"); }}
                className="absolute left-4 z-10 p-2 bg-white/10 rounded-full hover:bg-white/20 transition disabled:opacity-50"
                disabled={filteredImages.findIndex(i => i.id === selectedImage.id) === 0}
              >
                <ChevronLeft size={24} className="text-white" />
              </button>
              
              <button
                onClick={(e) => { e.stopPropagation(); navigateLightbox("next"); }}
                className="absolute right-4 z-10 p-2 bg-white/10 rounded-full hover:bg-white/20 transition disabled:opacity-50"
                disabled={filteredImages.findIndex(i => i.id === selectedImage.id) === filteredImages.length - 1}
              >
                <ChevronRight size={24} className="text-white" />
              </button>
              
              <div className="max-w-[90vw] max-h-[90vh] relative" onClick={(e) => e.stopPropagation()}>
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="max-w-full max-h-[90vh] object-contain rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                  <h3 className="text-white text-xl font-bold">{selectedImage.title}</h3>
                  <p className="text-white/70 text-sm mt-1 capitalize">{selectedImage.category}</p>
                  <p className="text-white/50 text-xs mt-2">{selectedImage.date}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DashboardShell>
    </AuthGuard>
  );
}
