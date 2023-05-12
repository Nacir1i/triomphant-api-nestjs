export interface ServiceInterface<D, U, P> {
  create(dto: D): Promise<P>;
  findOne(id: number): Promise<P>;
  findSearch(search: string): Promise<P[] | []>;
  findAll(): Promise<P[] | []>;
  getPage(page: number, limit: number): object;
  update(id: number, dto: U): Promise<P>;
  delete(id: number): Promise<P>;
}
