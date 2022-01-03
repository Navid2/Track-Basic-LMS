
export default interface Grade {
    id: number;
    name: string;
    Lesson: {
        name: string;
        id: number;
    };
    Units: Array<{
        name: string;
        id: number;
    }>;
}