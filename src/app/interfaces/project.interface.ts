export interface Date {
    month: number;
    year: number;
}

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
    shortTitle: string;
    longTitle: string;
    startDate: Date;
    endDate: Date;
    dateString?: string;
    description: string;
    slides: Slide[];
    technologies: string[];
    links: Link[];
    tags: string[];
}
  
export default Project;