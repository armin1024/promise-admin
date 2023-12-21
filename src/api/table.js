import request from '@/utils/request'
import Axios from 'axios'

export function getList(params) {
  return request({
    url: '/promise/reserve',
    method: 'get',
    params
  })
}

export function addRecord(params) {
  return request({
    url: '/promise/reserve',
    method: 'post',
    params
  })
}

export function delReocrd(params) {
  return request({
    url: '/promise/reserve',
    method: 'delete',
    params
  })
}
