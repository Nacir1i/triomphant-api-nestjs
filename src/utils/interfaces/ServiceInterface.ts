export interface ServiceInterface<D, U, P> {
  create(dto: D): Promise<P>;
  findOne(id: number): Promise<P | null>;
  findSearch(search: string): Promise<P[] | []>;
  findAll(): Promise<P[] | []>;
  getPage(page: number, limit: number): Promise<object>;
  update(id: number, dto: U): Promise<P>;
  delete(id: number): Promise<P>;
}
