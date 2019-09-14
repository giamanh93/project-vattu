export function getDates(startDate, endDate) {
    var dates = [],
        currentDate = startDate,
        addDays = function(days) {
          var date = new Date(this.valueOf());
          date.setDate(date.getDate() + days);
          return date;
        };
    while (currentDate <= endDate) {
      dates.push(currentDate);
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  };

export function arrayUnique(arr) {
    return arr.filter(function(item, index){
      return arr.indexOf(item) >= index;
    });
  };
  export function validNumber1(e, elm) {
    let str = '', err
    if (elm.company_flg != 1) {
        if (!elm.land_number && !elm.mobile_number) {
            err = true
        } else {
            err = false
        }
    } else {
        if (!elm.work_mobile && !elm.corporate_number) {
            err = true
        } else {
            err = false
        }
    }
    if (e) {
        if (e.target.value == '' || e.target.value == undefined) {
            str = ''
        }
        if (e.target.value) {
            let string = e.target.value.toString().split('');
            if (string.length > 0 && string.indexOf('-') > -1) {
                str = '電場番号は、ハイフン(-)なしで入力してください。'
                return { str: str, err: err }
            }
            if (isNaN(e.target.value) == true && e.target.value != '') {
                str = '電話番号は、半角数字で入力してください。'
                return { str: str, err: err }
            } else if (e.target.value && (e.target.value.trim().length < 10)) {
                str = '電話番号は、10文字以上で入力してください。';
                return { str: str, err: err }
            }else {
                str = '';
                return { str: str, err: err }
            }
        }
    }else {
        let str_land_number = elm.land_number ? elm.land_number.toString().split('') : '';
        let str_mobile_number = elm.mobile_number ? elm.mobile_number.toString().split('') : '';
        let str_work_mobile = elm.work_mobile ? elm.work_mobile.toString().split('') : '';
        let str_corporate_number = elm.corporate_number ? elm.corporate_number.toString().split('') : '';
        if (elm.company_flg != 1) {
            if (((str_land_number.length > 0) && (str_land_number.indexOf('-') > -1)) || ((str_mobile_number.length > 0) && (str_mobile_number.indexOf('-') > -1))) {
                str = '電場番号は、ハイフン(-)なしで入力してください。'
                return { str: str, err: err }
            }
            if (((elm.land_number != '') && (isNaN(elm.land_number) == true)) || ((elm.mobile_number != '') && (isNaN(elm.mobile_number) == true))) {
                str = '電話番号は、半角数字で入力してください。'
                return { str: str, err: err }
            } else if ((elm.land_number && (elm.land_number.trim().length < 10)) || (elm.mobile_number && (elm.mobile_number.trim().length < 10))) {
                str = '電話番号は、10文字以上で入力してください。';
                return { str: str, err: err }
            }if ((elm.land_number && elm.land_number.length > 12)  || (elm.mobile_number && elm.mobile_number.length > 12)) {
                str = '電話番号を11文字以下入力してください。'
                err = true
                return { str: str, err: err }
              } else if (!elm.land_number && !elm.mobile_number) {
                err = true
                str = ''
                return { str: str, err: err }
              } else {
                err = false
                str = ''
                return { str: str, err: err }
              }
          } else {
            if (((str_work_mobile.length > 0) && (str_work_mobile.indexOf('-') > -1)) || ((str_corporate_number.length > 0) && (str_corporate_number.indexOf('-') > -1))) {
                str = '電場番号は、ハイフン(-)なしで入力してください。'
                return { str: str, err: err }
            }
            if (((elm.work_mobile != '') && (isNaN(elm.work_mobile) == true)) || ((elm.corporate_number != '') && (isNaN(elm.corporate_number) == true))) {
                str = '電話番号は、半角数字で入力してください。'
                return { str: str, err: err }
            } else if ((elm.work_mobile && (elm.work_mobile.trim().length < 10)) || (elm.corporate_number && (elm.corporate_number.trim().length < 10))) {
                str = '電話番号は、10文字以上で入力してください。';
                return { str: str, err: err }
            }if ((elm.work_mobile && elm.work_mobile.length > 12)  || (elm.corporate_number && elm.corporate_number.length > 12)) {
                str = '電話番号を11文字以下入力してください。'
                err = true
                return { str: str, err: err }
              } else if (!elm.work_mobile && !elm.corporate_number) {
                err = true
                str = ''
                return { str: str, err: err }
              } else {
                err = false
                str = ''
                return { str: str, err: err }
              }
          }
    }
    return { str: str, err: err }
  }
