export class FetchError extends Error {
  info: string;

  constructor(message: string, info: string) {
    super(message);
    this.info = info;
  }
}
