export interface Slide {
    imageFile: string;
    caption: string;
}

export interface Link {
    url: string;
    caption: string;
}

export interface Project {
    id: number;
    title: string;
    date: string;
    description: string;
    slides: Slide[];
    technologies: string[];
    links: Link[];
    tags: string[];
}
  
export default Project;