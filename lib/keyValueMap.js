import {emptyCell} from '@/utils'
// 用于放置系统中需要统一转换的文案
const NoticeTypeWord = ['', '系统公告', '公司公告', '运营中心公告', '业务地区公告']
export function NoticeTypeSwitch (key, defValue) {
  return NoticeTypeWord[key] ? NoticeTypeWord[key] : (defValue || '公告')
}
// 单位性质
const dTypeMap = {'10': '国有', '60': '私营', '70': '个体', '110': '民营', '190': '其他'}
export function dType (value) {
  return emptyCell(dTypeMap[value])
}
// 关系文案转换
const relationshipMap = ['其他', '父子', '母子', '父女', '母女', '兄弟姐妹', '亲属', '同学', '朋友', '同事', '同乡']
export function relationship (value) {
  return emptyCell(relationshipMap[value])
}
// 房屋类型转换
const homeStatMap = ['--', '自有住房', '分期付款购房', '租房', '其他', '集体宿舍', '单位分配']
export function homeStat (value) {
  return emptyCell(homeStatMap[value])
}

// 教育程度转换
const eduLvlMap = ['未知', '博士及以上', '硕士研究生', '大学本科', '大学专科', '中专', '技校职高', '高中', '初中', '小学及以下']
export function eduLvl (value) {
  return emptyCell(eduLvlMap[value])
}

// 职业转换
const occpTnMap = {'1': '公务员', '3': '其它行业职员', '4': '军人', '5': '自由职业者', '7': '农民', '17': '学生', '26': '管理人员', '29': '无职业', '30': '私人业主'}
export function occpTn (value) {
  return emptyCell(occpTnMap[value])
}
//
export function evalCar (value) {
  if (value === '1') {
    return '杭州华丰二手车评估鉴定有限公司'
  }
}
// 车辆类型转换
const carTypeMap = {'XC': '新车', 'ES': '二手车'}
export function carType (type) {
  return emptyCell(carTypeMap[type])
}
// 担保人状态转换
const hasBondsmanMap = ['--', '有担保人', '无担保人']
export function hasBondsman (value) {
  return emptyCell(hasBondsmanMap[value])
}
// 婚姻状态转换
const maritalStatusMap = ['未知', '已婚', '未婚', '离婚', '丧偶', '分居', '其他']
export function maritalStatus (status) {
  return emptyCell(maritalStatusMap[status])
}
// 联系人关系转换
const contactsManRelationshipMap = ['--', '父母', '朋友', '亲戚', '其他']
export function contactsManRelationship (val) {
  return emptyCell(contactsManRelationshipMap[val])
}
// 保险状态转换
const hasInsuranceMap = ['--', '有保险', '无保险']
export function hasInsurance (value) {
  return emptyCell(hasInsuranceMap[value])
}
// 客户类型
const memberTypeMap = ['', '客户', '配偶', '担保人']
export function memberType (val) {
  return memberTypeMap[val]
}
// 客户类型
export function usrType (val, uname) {
  let useTypes = ['主贷人', '主贷人', '(' + uname + ')配偶', '(' + uname + ')担保人']
  return useTypes[val]
}
//  通过与否
export function isTonggou (val) {
  let useTypes = ['--', '通过', '不通过', '征信中...']
  return useTypes[val]
}
export const switchMaps = {
  bankType: {
    '01': '济南市中工行',
    '02': '济南乐源支行',
    '03': '临沂经开行',
    '04': '杭州朝晖支行'
  }
}
export function convertImgs (recordImgs) {
  const result = {
    add: {},
    delete: []
  }
  const {add, delete: del} = result
  const imgSwitch = (obj, clsId, fid, fpath) => {
    const fileId = 'file_' + clsId
    !obj[fileId] && (obj[fileId] = {source_type: 'image', source_lists: []})
    obj[fileId].source_lists.push({
      org: fpath,
      src: fpath,
      alt: fid
    })
  }
  recordImgs.forEach((item, index) => {
    const {class_id, list} = item
    list.forEach((val, index) => {
      const {file_id, file_path} = val
      imgSwitch(add, class_id, file_id, file_path)
    })
  })
  return result
}
// 银行类型转换
const bankTypeMap = {'01': '济南市中工行', '02': '济南乐源支行', '03': '临沂经开行', '04': '杭州朝晖支行'}
export function bankType (value) {
  return emptyCell(bankTypeMap[value])
}