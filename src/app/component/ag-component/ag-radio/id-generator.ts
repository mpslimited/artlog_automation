

export class IdGenerator {
      private idCount = 0;
      private idName: string = null;

      constructor(idName: string) {
            this.idName = idName + '-';
      }

      genrateID() {
            return this.idName + (++this.idCount);
      }
}
