export default interface IRepository<T> {
    get(id: string | any): Promise<T>;
    getAll(): Promise<T[]>;
    create(entity: T): Promise<void>;
    update(entity: T): Promise<void>;
    delete(id: string | any): Promise<void>;
}