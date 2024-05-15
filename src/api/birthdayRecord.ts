import request from '@/utils/request'

// 用户
export interface birthdayRecordUser {
  id?: string
  name: string
  sex: string
  birthdayTime: string
  birthdayType:string
}

export default {
  // 新增用户
  addBirthdayRecordUser(data: birthdayRecordUser): Promise<response> {
    return request({
      url: `/birthdayRecords/add`,
      method: 'post',
      data,
    })
  },
  // 删除用户
  deleteBirthdayRecordUser(data: string): Promise<response> {
    return request({
      url: `/birthdayRecords/delete`,
      method: 'delete',
      data,
    })
  },
  // 更新用户
  updateBirthdayRecordUser(data: birthdayRecordUser): Promise<response> {
    return request({
      url: `/birthdayRecords/update`,
      method: 'put',
      data,
    })
  },
  // 查询用户
  queryBirthdayRecordUser(data: birthdayRecordUser): Promise<response> {
    return request({
      url: `/birthdayRecords/query`,
      method: 'put',
      data,
    })
  },
}
