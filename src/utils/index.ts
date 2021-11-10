/** 自定义方法 */
import numeral from 'numeral';

import moment from 'moment';
import type { Moment } from 'moment';

/** 统一判断方法
 */
export const regex = {
  urlRegex: /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i,
  mobileRegex: /^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[235-8]\d{2}|4(?:0\d|1[0-2]|9\d))|9[0-35-9]\d{2}|66\d{2})\d{6}$/,

  isUrl: (url: string) => {
    return regex.urlRegex?.test(url);
  },
  isMobile: (mobile: string) => {
    return regex.mobileRegex?.test(mobile);
  },
};

// 通过属性键值对找到数组对象中的某个对象
export const getKeyValue = (array: any[], key: string, value: any) =>
  array.find((item: any) => item[key] === value);

/** 日期选择器，禁用今天以前的日期
 * @param now
 * @returns
 */
export const disableBeforeDays = (now: Moment) => now < moment().subtract(1, 'day').endOf('day');

/** 将数字文本转为千分位格式
 * @param text
 * @returns
 */
export const toThousandth = (text: string): string => {
  let result = `${text}`;
  if (!text.includes('.')) {
    result += '.';
  }
  return result.replace(/(\d)(?=(\d{3})+\.)/g, ($0, $1) => `${$1},`).replace(/\.$/, '');
};

/** 获取小数位
 * @param integer
 * @returns
 */
export const getDigit = (integer: number) => {
  let digit = -1;
  let number = integer;
  while (number >= 1) {
    digit += 1;
    number /= 10;
  }
  return digit;
};

/** 添加「万」单位
 * @param integer
 * @param number
 * @param mutiple
 * @param decimalDigit
 * @returns
 */
export const addTenThousand = (
  integer: any,
  number: number,
  mutiple: number,
  decimalDigit: number,
) => {
  const digit = getDigit(integer);
  if (digit > 3) {
    let remainder = digit % 8;
    if (remainder >= 5) {
      // ‘十万’、‘百万’、‘千万’显示为‘万’
      remainder = 4;
    }
    return `${
      Math.round(number / 10 ** (remainder + mutiple - decimalDigit)) / 10 ** decimalDigit
    }万`;
  }
  return Math.round(number / 10 ** (mutiple - decimalDigit)) / 10 ** decimalDigit;
};

/** 添加中文单位
 *
 * @param {number} number 输入数字.
 * @param {number} _decimalDigit 小数点后最多位数，默认为2
 * @return {string} 加上单位后的数字
 */
export const addChineseUnit = (number: number, _decimalDigit?: number) => {
  const decimalDigit = !_decimalDigit ? 2 : _decimalDigit;
  const integer = Math.floor(number);
  const digit = getDigit(integer);
  // ['个', '十', '百', '千', '万', '十万', '百万', '千万'];
  const unit = [];
  if (digit > 3) {
    const multiple = Math.floor(digit / 8);
    if (multiple >= 1) {
      const tmp = Math.round((integer / 10 ** 8) * multiple);
      unit.push(addTenThousand(tmp, number, 8 * multiple, decimalDigit));
      for (let i = 0; i < multiple; i += 1) {
        unit.push('亿');
      }
      return unit.join('');
    }
    return addTenThousand(integer, number, 0, decimalDigit);
  }
  return number;
};

/** 将中文单位转为数字
 * @param {string} _value
 * @returns {string}
 */
export const parseChineseUnitToNumber = (_value: string): string => {
  // const ThousandRegex = /千/g;
  // const TenThousandRegex = /万/g;
  // const HundredThousandRegex = /十万/g;

  // const MillionRegex = /百万/g;
  // const TenMillionRegex = /千万/g;
  // const HundredMillionRegex = /亿/g;

  // const BillionRegex = /十亿/g;
  // const TenBillionRegex = /百亿/g;
  // const HundredBillionRegex = /千亿/g;

  // const TrillionRegex = /万亿/g;
  if (_value.includes('万')) {
    return `${numeral(_value.split('万')[0]).multiply(10000).value()}`;
  }

  if (_value.includes('亿')) {
    return `${numeral(_value.split('亿')[0]).multiply(100000000).value()}`;
  }

  return _value;
};

/** 菜单遍历递归，只返回 hideInMenu = false 的菜单项
 * @param array
 * @returns
 */
export function menuDfs(array: any[]) {
  const transArray = [...array];
  for (let i = 0; i < transArray?.length; i += 1) {
    if (transArray[i].hideInMenu) {
      transArray.splice(i, 1);
      i -= 1;
    }
    if (transArray[i]?.children?.length) {
      transArray[i].children = menuDfs(transArray[i].children)?.length
        ? menuDfs(transArray[i].children)
        : null;
    }
  }
  return transArray;
}
