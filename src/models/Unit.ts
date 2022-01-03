
export default interface Unit {
    id: number;
    name: string;
    Lesson: {
        name: string;
        id: number;
    };
    Grade: {
        name: string;
        id: number;
    };
    SubUnits: Array<{
        name: string;
        id: number;
    }>;
    Notes: Array<string>;
    Questions: Array<{
        Q: string;
        A: string;
    }>;
    Units: Array<{
        name: string;
        id: number;
    }>;
}