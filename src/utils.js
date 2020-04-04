export const findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index && item != 0)
export const countItemInArray = (arr, el) => arr.filter(item => item == el).length;