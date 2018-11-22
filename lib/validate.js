/**
 * 本系统中用于表单验证所需要的方法
 */
/** 表单通用验证规则/函数 **/
/* 手机号正则 */
export const telphoneReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/

/* 身份证正则 */
export const idCardReg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i
/* 身份证合法性验证 */
export function idCardValid (idNo) {
  const idNumber = idNo.toString().toUpperCase()
  const provCodes = ['11', '12', '13', '14', '15', '21', '22', '23', '31', '32', '33', '34', '35', '36', '37', '41', '42', '43', '44', '45', '46', '50', '51', '52', '53', '54', '61', '62', '63', '64', '65', '71', '81', '82', '91']
  const lastCodeCheck = () => {
    if (idNumber.length === 18) {
      const chars = idNumber.split('')
      // ∑(ai×Wi)(mod 11)
      // 加权因子
      const factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ]
      // 校验位
      const parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ]
      let sum = 0
      let ai = 0
      let wi = 0
      for (let i = 0; i < 17; i++) {
        ai = chars[i]
        wi = factor[i]
        sum += ai * wi
      }
      const last = parity[sum % 11]
      return last.toString() === chars[17]
    }
    return true
  }
  return idCardReg.test(idNumber) && provCodes.includes(idNumber.substr(0, 2)) && lastCodeCheck()
}
export function idCardValidate (rule, value, callback) {
  return idCardValid(value) ? callback() : callback(new Error('身份证号码不合法'))
}

/** 以下为待整理内容，整理完后移动到上方 **/
export function checkHasUsedName (rule, value, callback) {
  if (value === '0') {
    return callback()
  } else if (!value) {
    return callback(new Error('请确保有无曾用名！'))
  } else {
    return callback()
  }
}
export function validateImges (rule, value, callback) {
  if (!Array.isArray(value)) {
    return callback(new Error('请上传对应图片！'))
  } else if (value.some(item => (!item.disabled && !item.list.length))) {
    return callback(new Error('请上传对应图片！'))
  } else {
    return callback()
  }
}
export function IdentityCodeValid (code) { 
  return idCardValid(code)
}
export function checkEmpty1 (rule, value, callback){

  if (value === '' || value === null || value === undefined) {
    return callback(new Error('此项为必填项'));
  } else {
    return callback();
  }
}
export function checkEmpty (rule, value, callback) {
  if (!value) {
    return callback(new Error('此项为必填项'))
  } else {
    return callback()
  }
}

export function checkImageEmpty (value) {
  let noImage = true
  value.forEach((item) => {
    noImage = noImage && (noImage = (item.list.length !== 0))
  })
  return !noImage
}

export function checkPhoneNotreq (rule, value, callback) {
  if (!value) {
    return callback()
  } else if (!(/^[1]\d{10}$/.test(value))) {
    return callback(new Error('请填写正确信息'))
  } else {
    return callback()
  }
}
export function specialChar (rule, value, callback) {
  const re = /[，\s_'’‘\"”“|\\~#$@%^&*;\/<>\?？]/
  if (!value) {
    return callback(new Error('此项为必填项'))
  } else if ((re.test(value))) {
    return callback(new Error('请填写正确信息'))
  } else {
    return callback()
  }
}
export function checkPhone1 (rule, value, callback){//  去掉首位为1
  if (!value) {
    return callback();
  } else if(!(/^\d{11}$/.test(value))){
    return callback(new Error('请填写正确信息'));
  } else {
    return callback()
  }
}
export function checkPhone (rule, value, callback){
  if (!value) {
    return callback(new Error('此项为必填项'));
  } else if(!(/^[1]\d{10}$/.test(value))){
    return callback(new Error('请填写正确的手机号'));
  } else {
    return callback();
  }
}
export function checkNo (rule, value, callback){
  if (!value) {
    return callback(new Error('此项为必填项'));
  }else if(!IdentityCodeValid(value)){
    return callback(new Error('请填写正确的身份证号'));
  } else {
    return callback()
  }
}

export function validateRequire (rule, value, callback) {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(null)
      } else {
        callback()
      }
    }
    export function validateSourceUri(rule, value, callback) {
      if (value) {
        if (validateURL(value)) {
          callback()
        } else {
          this.$message({
            message: '外链url填写不正确',
            type: 'error'
          })
          callback(null)
        }
      } else {
        callback()
      }
    }

 export function checkMoney (rule, value, callback){
      if (!value) {
        // return false;
				return callback(new Error('此项为必填项'));
      } else if(!/^(0|[1-9][0-9]*)$/.test(value)){
      	return callback(new Error('请填写正确信息'));
      } else {
				return callback();
			}
  }

 export function checkMoney2 (rule, value, callback) {
      if (!value) {
        // return false;
				return callback();
      } else if(!/^(0|[1-9][0-9]*)$/.test(value)){
      	return callback(new Error('请填写正确信息'));
      } else {
				return callback();
			}
  }
 //费用合计
export function checkMoney1 (rule, value, callback) {
	if(!value){
		return callback();
	}else if(!/^(0|[1-9][0-9]*)(\.\d{1,2})?$/.test(value)){
  	return callback(new Error('请填写正确的信息'));
  }else{
  	return callback();
  }
}

export function checkMoney3 (rule, value, callback) {
	if(!value){
		return callback(new Error('此项为必填项'));
	}else if(!/^(0|[1-9][0-9]*)(\.\d{1,2})?$/.test(value)){
  	return callback(new Error('请填写正确的信息'));
  }else{
  	return callback();
  }
}


export function checkDate (rule, value, callback) {
		if(value == null || !value){
			return callback(new Error('请选择时间'));
		}else if(value == ''){
			return callback(new Error('请选择时间'));
		}else{
			return callback()
		}
	}

	export function checkNo1 (rule, value, callback) {
		if (value) {
			if(!/(^\d{15}$)|(^\d{17}([0-9]|[xX])$)/.test(value)){
				return callback(new Error('请填写正确信息'));
			} else {
				return callback()
			}
		}else{
			return callback()
		}
	}

	export function phoneLgh (rule, value, callback) {
		if(value){
				if(!(/^[1]\d{10}$/.test(value))){
					return callback(new Error('请填写正确信息'));
				} else {
					return callback();
				}
		}else{
			return callback();
		}
	}
	export function checkConstact (rule, value, callback) {
		if (!value) {
			return callback();
		}else if(value.length >20){
			return callback(new Error('此项最多为20位'));
		}else {
				return callback();
		}
	}
	export function checkVehicle (rule, value, callback) {
      if (!value) {
        return callback();
      } else if(!(/^[a-zA-Z0-9]{17}$/.test(value))){
      	// /[^\d|.]/
      	///^\d+(\.\d+)?$/
      	return callback(new Error('此项为17数字和字母组合'));
      } else {
				return callback();
			}
  }

  export function checkVehicle1 (rule, value, callback) {
      if(!(/^[a-zA-Z0-9]{17}$/.test(value))){
        return callback(new Error('此项为17数字和字母组合'));
      } else {
        return callback();
      }
  }

export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}


/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

