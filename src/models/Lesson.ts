
export default interface Lesson {
    id: number;
    name: string;
    Grades: Array<{
        name: string;
        id: number;
    }>;
}