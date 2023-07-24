export class FromControlDto {
  readonly macnumber: string;
  readonly imei: string;
  readonly token: string;

  constructor(mac: string, imei: string, token: string) {
    this.macnumber = mac;
    this.imei = imei;
    this.token = token;
  }
}
