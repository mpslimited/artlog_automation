export interface MyRoutesI {
      label: string;
      path: string;
}

export class GlobalRouting {

      myRoutes: Array<MyRoutesI>;

      findPath(label: string) {
            const path = this.myRoutes
                  .find((item: MyRoutesI) => {
                        return item.label === label;
                  });

            if (path) {
                  return path.path;
            } else {
                  return '**';
            }
      }
}
