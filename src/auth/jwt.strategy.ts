import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ControlService } from 'src/controles/control.service';

@Injectable()
export class AuthService {
  constructor(
    private controlService: ControlService,
    private jwtTokenService: JwtService,
  ) {}

  async validateControlCredentials(macnumber: string): Promise<any> {
    const control = await this.controlService.getForMacNumber(macnumber);
    if (control) {
      return control;
    }
  }
  async loginWithCredentials(control: any) {
    const payload = { macnumber: control.macnumber, sub: control.id };
    return {
      access_token: this.jwtTokenService.sign(payload),
    };
  }
}
