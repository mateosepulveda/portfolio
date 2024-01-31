export interface Slide {
    imageFile: string;
    description: string;
}

export interface Project {
    id: number;
    title: string;
    description: string;
    slides: Slide[];
    technologies: string[];
    tags: string[];
}
  
export default Project;