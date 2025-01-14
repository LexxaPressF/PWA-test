export interface NestedItem {
    id: number;
    tittle: string;
    description: string;
    status: boolean;
    child?: NestedItem | undefined;
}
