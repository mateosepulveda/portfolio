export interface Date {
    month: number;
    year: number;
}

export interface Link {
    url: string;
    caption: string;
}

export interface Project {
    id: number;
    shortTitle: string;
    longTitle: string;
    completed: boolean;
    startDate: Date;
    endDate: Date;
    dateString?: string;
    description: string;
    images: string[];
    technologies: string[];
    links: Link[];
    tags: string[];
}
  
export default Project;