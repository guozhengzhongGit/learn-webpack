import http from 'src/utils/http';
const url = devMode ? '/topic/' : '/issues/'
export const fetContent = async (id) => {
  return http(url + id);
}