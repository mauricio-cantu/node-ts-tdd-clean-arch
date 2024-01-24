export interface PaginationResult<T> {
    data: T[];
    pagination: {
        totalRows: number;
        currentPage: number;
        totalPages: number;
    }
}