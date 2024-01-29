export interface Slide {
    imageFile: string;
    description: string;
}

export interface Project {
    id: number;
    title: string;
    slides: Slide[];
    tags: string[];
}
  
export default Project;