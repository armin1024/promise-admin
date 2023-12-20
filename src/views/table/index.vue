<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="顾客">
        <el-input v-model="formInline.customerName" placeholder="顾客"></el-input>
      </el-form-item>
      <el-form-item label="预约项目">
        <el-input v-model="formInline.reserveItems" placeholder="预约项目"></el-input>
      </el-form-item>
      <el-form-item label="预约日期">
        <el-input v-model="formInline.reserveDate" placeholder="预约日期"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="formInline.remark" placeholder="备注"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <div align="right">
      <el-button class="button-container" type="primary" @click="dialogFormVisible = true">新增</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
<!--      <el-table-column label="ID" width="95">-->
<!--        <template slot-scope="scope">-->
<!--          {{ scope.row.id }}-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="顾客" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.customerName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预约项目" width="310" align="center">
        <template slot-scope="scope">
          {{ scope.row.reserveItems }}
        </template>
      </el-table-column>
<!--      <el-table-column class-name="status-col" label="Status" width="110" align="center">-->
<!--        <template slot-scope="scope">-->
<!--          <el-tag :type="scope.row.remark | statusFilter">{{ scope.row.status }}</el-tag>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column align="center" prop="created_at" label="预约日期" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.reserveDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template slot-scope="scope">
          {{ scope.row.remark }}
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="data">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="data.customerName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="data.reserveItems" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="data.reserveDate" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="data.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onInsert">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>


<script>
import { getList } from '@/api/table'
import { addRecord } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: [
        {
          id: '',
          customerName: '',
          reserveItems: '',
          reserveDate: '',
          remark: ''
        }
      ],
      listLoading: true,
      formInline: {
        id: '',
        customerName: '',
        reserveItems: '',
        reserveDate: '',
        remark: ''
      },
      data: {
        // id: '',
        customerName: '',
        reserveItems: '',
        reserveDate: '',
        remark: ''
      },
      dialogFormVisible: false,
      formLabelWidth: '220px'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.body.records
        this.listLoading = false
      })
    },
    onSubmit() {
      this.listLoading = true
      getList(this.formInline).then(response => {
        this.list = response.body.records
        this.listLoading = false
      })
    },
    onInsert() {
      this.dialogFormVisible = false
      this.listLoading = true
      console.log(this.data)
      addRecord(this.data).then(response => {
        console.log(response)
      })
      getList(this.formInline).then(response => {
        this.list = response.body.records
        this.listLoading = false
      })
    }
  }
}
</script>
