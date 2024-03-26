export class SerialNumberGenerator {
  private currentNumber: number;

  constructor() {
      this.currentNumber = 0;
  }

  generateSerialNumber(): string {
      const serialNumber = this.currentNumber.toString().padStart(3, '0');
      this.currentNumber = (this.currentNumber + 1) % 1000;
      return serialNumber;
  }
}

export const generator = new SerialNumberGenerator();