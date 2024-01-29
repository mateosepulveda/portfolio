interface GalleryItem {
    imageFile: string;
    text: string;
}
  
interface Project {
    id: number;
    title: string;
    gallery: GalleryItem[];
    tags: string[];
}
  
export default Project;