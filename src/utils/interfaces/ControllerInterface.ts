export interface ControllerInterface<D, U, P> {
  create(dto: D): Promise<null | P> | void;
  findOne(id: number): Promise<null | P>;
  findSearch(search: string): Promise<null | P[]>;
  findAll(): Promise<[] | P[]>;
  getPage(page: number, limit: number): Promise<Object> | void;
  update(id: number, dto: U): Promise<null | P>;
  delete(id: number): Promise<null | P> | void;
}
