



export class AlertMessageModel {
      timeToLive?: number;
      type?: string | 'alert-success' | 'alert-danger';
      message: Array<string>;

      constructor(msg: Array<string>, duration: number = 2500, type: string = 'alert-success') {
            this.message = msg;
            this.type = type;
            this.timeToLive = duration;
      }
}
