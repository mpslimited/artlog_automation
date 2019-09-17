import {
      trigger,
      state,
      style,
      animate,
      transition,
      keyframes
} from '@angular/animations';





export const popInLimit = [

      trigger('popInLimit', [
            transition(':enter', [
                  // animate(500, style({ transform: 'translateX(100%)' }))
                  animate(250, keyframes([
                        style({
                              opacity: 0,
                              transform: 'translateX(-100%)',
                              offset: 0
                        }),
                        style({
                              opacity: 1,
                              transform: 'translateX(15px)',
                              offset: 0.3,
                        }),
                        style({
                              opacity: 1,
                              transform: 'translateX(0)',
                              offset: 1.0
                        })
                  ]))
            ])
            ,
            transition(':leave', [
                  animate(250, keyframes([
                        style({
                              opacity: 1,
                              transform: 'translateX(0)',
                              offset: 0
                        }),
                        style({
                              opacity: 1,
                              transform: 'translateX(-15px)',
                              offset: 0.7
                        }),
                        style({
                              opacity: 0,
                              transform: 'translateX(100%)',
                              offset: 1.0
                        })
                  ]))
            ])

      ])



];




export const showHideAnimate = [
      trigger('showHide', [
            transition(':enter', animate(250,

                  keyframes([
                        style({
                              opacity: 0,
                              offset: 0
                        }),
                        style({
                              opacity: 0.3,
                              offset: 0.3,
                        }),
                        style({
                              opacity: 0.5,
                              offset: 1.0
                        })
                  ])

            )),


            transition(':leave', animate(250,

                  keyframes([
                        style({
                              opacity: 0.5,
                              offset: 0
                        }),
                        style({
                              opacity: 0.3,
                              offset: 0.3,
                        }),
                        style({
                              opacity: 0,
                              offset: 1.0
                        })
                  ])

            ))

      ])


];

