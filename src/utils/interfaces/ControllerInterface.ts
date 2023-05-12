export interface ControllerInterface<D, U, P> {
  create(dto: D): any;
  findOne(id: number): any;
  findSearch(search: string): any;
  findAll(): any;
  getPage(page: number, limit: number): any;
  update(id: number, dto: U): any;
  delete(id: number): any;
}
