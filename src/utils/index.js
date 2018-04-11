export default {
    getRandom (much) {
      let arr = [];
      for (let i = 0; i < much; i++) {
        arr[i] = Math.floor(Math.random() * (9 - 0 + 1) + 0);
      };
      return arr;
    },
    validatenull(val) {
        if (val instanceof Array) {
            if (val.length == 0) return true;
        } else if (val instanceof Object) {
            if (JSON.stringify(val) === '{}') return true;
        } else {
            if (val == 'null' || val == null || val == 'undefined' || val == undefined || val == '') return true;
            return false;
        }
        return false;
    
    },
    isvalidatemobile(phone) {
        let list = [];
        let result = true;
        let msg = '';
        var isPhone = /^0\d{2,3}-?\d{7,8}$/;
        //增加134 减少|1349[0-9]{7}，增加181,增加145，增加17[678]  
        var isMob = /^((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|15[012356789][0-9]{8}|18[012356789][0-9]{8}|14[57][0-9]{8}|17[3678][0-9]{8})$/;
        if (!this.validatenull(phone)) {
            if (phone.length == 11) {
                if (isPhone.test(phone)) {
                    msg = '手机号码格式不正确';
                } else {
                    result = false;
                }
            } else {
                msg = '手机号码长度不为11位';
            }
        } else {
            msg = '手机号码不能为空';
        }
        list.push(result);
        list.push(msg);
        return list;
    }
  }