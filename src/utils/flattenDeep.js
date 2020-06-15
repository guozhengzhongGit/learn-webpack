import _ from 'lodash';
export const flatten = arr => {
  return _.flattenDeep(arr);
}