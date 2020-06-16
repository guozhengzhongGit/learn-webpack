import http from 'src/utils/http';
const url = devMode ? '/topics' : '/issues'
export const fetchList = async () => {
  return http(url);
}