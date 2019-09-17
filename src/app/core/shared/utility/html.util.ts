
declare var $;

export class HtmlUtil {

    public checkBox(conditionValue?: string | any, baseKey?: string, key?: string): any {
        if (conditionValue) {
            return (val) => {
                this.boolToCheckBox(val[baseKey][key] === conditionValue);
            };
        } else {
            return this.boolToCheckBox;
        }
    }



    public boolToCheckBox(val: boolean, disabled: '' | 'disabled' = '') {
        if (val) {
            return `<input type="checkbox" name="check" checked ${disabled}>`;
        } else {
            return `<input type="checkbox" name="check"   ${disabled} >`;
        }
    }

    public radio(conditionValue, baseKey, key, ...values): any {
        return (val) => {
            if (val[baseKey][key] === conditionValue) {
                return '<input type="radio" checked="true" name="' + val[baseKey][key] + '-role" value="' + values[1] + '" >';
            } else {
                return '<input type="radio" name="' + val[baseKey][key] + '-role" value="' + values[0] + '">';
            }
        };
    }


    fadeIn(id: string, durationInMilliseconds: number |
        string | 'slow' | 'fast' = 'slow') {
        $('#' + id).fadeIn(durationInMilliseconds);
    }


    fadeOut(id: string, durationInMilliseconds: number |
        string | 'slow' | 'fast' = 'slow') {
        $('#' + id).fadeOut(durationInMilliseconds);
    }


    showMsgForDuration(id: string, time: number = 2000) {
        this.fadeIn(id);
        setTimeout(() => {
            this.fadeOut(id);
        }, time);
    }

    anchorTag(value: any) {
        return '<a href="javascript:;">' + value.value + '</a>';
    }

    numericValidation(e: any) {  // to be fire on keydown

        let input;
        if (e.which > 95 && e.which < 107) {
            return true;
        } else if ((e.which > 34 && e.which < 38) || e.which === 39 || e.which === 46) {
            return true;
        } else if (e.metaKey || e.ctrlKey) {
            return true;
        } else if (e.which === 32) {
            return false;
        } else if (e.which === 0) {
            return true;
        } else if (e.which < 33) {
            return true;
        } else if (e.which === 110 || e.which === 190) {
            return true;
        }

        input = String.fromCharCode(e.which);
        return !!/[\d\s]/.test(input);
    }

    numericValidationOnPaste(e: any) { // to be fire on paste event;
        const prevValue = e.target.value;
        setTimeout(() => {
            if (isNaN(e.target.value)) {
                e.target.value = prevValue;
            }
        }, 1);
    }

    scrollToTop() {
        const scrollingElement = (document.scrollingElement || document.body);
        $(scrollingElement).animate({
            scrollTop: 0
        }, 1000);
    }


    // To call the method pass array of id as param
    validator(array: Array<any>) {
        array.forEach(element => {
            const name = document.getElementById(element);
            if (name !== null) {
                if (name['value'] === '') {
                    $('#' + element).css('border', '1px solid red');
                } else {
                    $('#' + element).css('border', '1px solid #ced4da');
                }
            }
        });
    }
}
