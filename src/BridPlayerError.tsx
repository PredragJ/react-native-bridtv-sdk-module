export class BridPlayerError {
    name: string;
    message: string;
    code: string;
  
    constructor(name: string, message: string, code: string) {
      this.name = name;
      this.message = message;
      this.code = code;
    }
  }