export interface UseCase {
    execute(data: unknown): Promise<unknown>
}