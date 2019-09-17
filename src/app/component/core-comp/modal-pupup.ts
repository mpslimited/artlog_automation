declare var $;

export class ModalPopUp {

      protected show(id: string) {
            $(`#${id}`).modal('show');
      }

      protected hide(id: string) {
            $(`#${id}`).modal('hide');
      }

}
