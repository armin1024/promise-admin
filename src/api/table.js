import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/promise/reserve',
    method: 'get',
    params
  })
}

export function addRecord(data) {
  return request({
    url: '/promise/reserve',
    method: 'post',
    data
  })
}
