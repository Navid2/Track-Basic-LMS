
export default interface SubUnit {
    id: number;
    name: string;
    Lesson: {
        name:string;
        id: number;
    };
    Grade: {
        name: string;
        id: number;
    };
    Unit: {
        name: string;
        id: number;
    };
    Notes: Array<string>;
    Questions: Array<
        {
            Q: string;
            A: string;
        }
    >
}