import request from 'umi-request';

const devMode = process.env.NODE_ENV === 'development';
const baseUrl = devMode ? 'https://cnodejs.org/api/v1' : 'https://api.github.com/repos/guozhengzhongGit/blog'


export default async function http(url, options={}) {
  return request.get(`${baseUrl}${url}`, {
    params: options
  })
}