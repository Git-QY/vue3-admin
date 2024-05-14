<template>
  <div class="birthday-record">
    <Page main="/tools/birthdayRecord">
      <page-table v-bind="tableConfig" ref="tableRef">
        <template #btnleft>
          <el-button type="primary" @click="onAdd">新增</el-button>
        </template>
        <template #operate="{ item }">
          <el-table-column v-slot="{ row }" v-bind="item">
            <el-button type="primary" link @click="onEdit(row)">编辑</el-button>
            <el-button type="danger" link @click="onDelete(row.id)">删除</el-button>
          </el-table-column>
        </template>
        <!-- <template #status="{ item }">
          <el-table-column v-slot="{ row }" v-bind="item">
            <el-switch v-model="row.status" active-text="启用" inactive-text="停用" active-value="1" inactive-value="0"
              :inline-prompt="true" @click="onChangeStatus(row)"> </el-switch>
          </el-table-column>
        </template> -->
      </page-table>
      <el-drawer
        v-model="drawer"
        :title="title"
        :direction="direction"
        :before-close="handleClose"
      >
      <el-form ref="formRef" :inline="true" :rules="rules" :model="formData" class="demo-form-inline">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input style="width: 240px" v-model="formData.name" placeholder="请输入姓名" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出生日期" prop="birthdayTime">
              <el-date-picker
                v-model="formData.birthdayTime"
                type="date"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                :disabledDate="isDisabled"
                placeholder="请选择出生日期"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="性别" prop="sex">
              <el-select
                style="width: 240px"
                v-model="formData.sex"
                placeholder="请选择性别"
                clearable
              >
                <el-option label="男" value="1" />
                <el-option label="女" value="2" />
              </el-select>
            </el-form-item>          
          </el-col>
          <el-col :span="8">
            <el-form-item label="生日类型" prop="birthdayType">
              <el-select
                style="width: 220px"
                v-model="formData.birthdayType"
                placeholder="请选择生日类型"
                clearable
              >
                <el-option label="农历" value="1" />
                <el-option label="阳历" value="2" />
              </el-select>
            </el-form-item>          
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="头像">
              <el-input v-model="formData.name" placeholder="请选择头像" clearable />
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>
      </el-drawer>
    </Page>
  </div>
</template>


<script setup lang="ts">
// import { ref } from 'vue'
import { reactive, ref } from 'vue'
import pageTable from '@/components/Table/index.vue'
import request from '@/utils/request'
import api, { birthdayRecordUser } from '@/api/birthdayRecord'
import { ElMessage, ElMessageBox, dayjs } from 'element-plus'
import {Lunar} from 'lunar-typescript';
import { nextTick } from 'vue'
//定义表格配置
const tableConfig = reactive({
  table: { rowKey: 'id' },
  searchForm: {},
  // 可以通过pomise构建需要的格式
  api: (data: any) => {
    return request.post('/birthdayRecords/query', { ...data })
  },
  page: {
    pageSize: 2,
    pageSizes: [1, 2, 3, 4, 5],
  },
  columns: [
    { type: 'selection', fixed: 'left', 'reserve-selection': true, width: 40 },
    // { prop: 'id', label: 'ID', 'show-overflow-tooltip': true },
    { prop: 'name', label: '姓名', width: 180, query: {} },
    { 
      prop: 'sex', 
      label: '性别', 
      width: 180 ,
      formatter: (row: any) => {
        if(row.birthdayType == 1){
          return '男'
        }else if(row.birthdayType == 2){
          return '女'
        }
      }
    },
    { 
      prop: 'age', 
      label: '周岁',
      formatter: (row: any) => computeAge(row.birthdayTime,row.birthdayType),
    },
    // { prop: 'img', label: '头像' },
    { prop: 'birthdayTime', label: '生日' },
    { 
      prop: 'birthdayType', 
      label: '生日类型' ,
      formatter: (row: any) => {
        if(row.birthdayType == 1){
          return '农历'
        }else if(row.birthdayType == 2){
          return '阳历'
        }
      }
    },
    {
      prop: 'createdTime',
      label: '创建时间',
      type: 'date',
      width: 200,
      formatter: (row: any) => dayjs(row.createdTime).format('YYYY-MM-DD HH:mm:ss'),
      query: { type: 'slot' },
      hide: true,
    },
    { prop: 'updatedTime', label: '更新时间', type: 'date', hide: true, width: 200 },
    { prop: 'operate', label: '操作', type: 'slot', fixed: 'right', width: 200 },
  ],
})
const tableRef = ref(null as any)
const formRef = ref(null as any)
//定义表单
let formData = ref({ 
  name:'',
  sex:'',
  birthdayTime: '',
  birthdayType:''
})
//定义表单规则
const rules = reactive({
  name: [{ required: true, message: '请输入用户名称', trigger: 'blur' }],
  sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
  birthdayTime: [{ required: true, message: '请选择生日', trigger: 'blur' }],
  //  邮箱 正则
  birthdayType: [
    { required: true, message: '请选择生日类型', trigger: 'blur' }
  ],
})
//新增/修改
let title = ref("")
let type = ref("")
const onAdd = () => {
  title.value = '新增'
  type.value = "add"
  drawer.value = true
}
const onEdit = (row: birthdayRecordUser) => {
  title.value = '修改' 
  type.value = "edit"
  drawer.value = true
  nextTick(()=>{
    formData.value = {...row}
  })
}
const onSubmit = async () => {
  const res = await formRef.value.validate()
  if (!res) return
  if (type.value == "add") {
    let res;
    try{
      res = await api.addBirthdayRecordUser({...formData.value})
      ElMessage.success(res.message)
      drawer.value = false
      tableRef.value.refresh()
    }catch(err:any){
      ElMessage.error(err.message)
    }

  } else {
    console.log("请求开始");
    let res;
    try{
       res = await api.updateBirthdayRecordUser({...formData.value})
       ElMessage.success(res.message)
       drawer.value = false
       tableRef.value.refresh()
    }catch(err:any){
      console.log("请求失败",res);
      ElMessage.error(err.message)
    }
  }
}
// 删除
const onDelete = (id: string) => {
  ElMessageBox.confirm('确定删除吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {     
      const res = await api.deleteBirthdayRecordUser(id)
      ElMessage.success(res.message)
      tableRef.value.refresh()
    })
    .catch(() => {
      ElMessage.info('取消删除')
    })
}
// 抽屉
let drawer = ref(false)
const direction = ref('rtl')
const handleClose = (done: () => void) => {
  formRef.value.resetFields()
  done()
  // ElMessageBox.confirm('确定关闭吗？', '提示', {
  //   confirmButtonText: '确定',
  //   cancelButtonText: '取消',
  //   type: 'warning',
  // })
  // .then(() => {
  //   done()
  //   console.log("shunxin")
  //   formRef.value.resetFields()
  // })
  // .catch(() => {
  //   // catch error
  // })
}

const isDisabled = (time: Record<string, any>): boolean => {
  // console.log(time); // time 为new Date()类型
  if (time.getTime() > new Date().getTime()) {
    return true
  }else {
    return false
  }
}
const computeAge = (date:String,type:String)=>{
  let solor = date
  if(type==='1'){//农历
    let dateArr = date.split("-")
    let year = Number(dateArr[0])
    let month = Number(dateArr[1])
    let day = Number(dateArr[2])
    const lunar = Lunar.fromYmd(year, month, day);
    solor = lunar.getSolar().toString()
  }
  let solordateAr = solor.split("-")
  let solorYear = Number(solordateAr[0])
  let solorMonth = Number(solordateAr[1])
  let solorDay = Number(solordateAr[2])
  let now = new Date()
  let nowYear = now.getFullYear()
  let nowMonth = now.getMonth() + 1
  let nowDay = now.getDate()
  let age = nowYear - solorYear
  if (nowMonth < solorMonth || (nowMonth == solorMonth && nowDay < solorDay)) {
    age--  
  }
  return age
}
</script>
<style lang="scss" scope>
.birthday-record {
  width: 100%;
  height: 100%;
}
</style>
