export class Room {
  constructor(
    public id: string,
    public title: string,
    public type: 'single' | 'dual' | 'quad',
    public price: number,
    public address: string
  ) {}
}
