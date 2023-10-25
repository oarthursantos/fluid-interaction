export interface Service<T, CreateDTO, UpdateDTO> {
    create(item: CreateDTO): Promise<T | void>;
    update(id: string, item: UpdateDTO): Promise<void>;
    findAll(): Promise<T[]>;
    findByEmail(email: string): Promise<T | null>;
    findById(id: string): Promise<T | null>;
    delete(id: string): Promise<void>;
  }
  