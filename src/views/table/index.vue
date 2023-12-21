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

    <div class="insertButton">
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
      <el-table-column label="操作" :label-width="formLabelWidth" width="150">
        <template slot-scope="scope">
          <el-popconfirm title="这是一段内容确定删除吗？"
            @onConfirm="onDel(scope)">
              <template #reference>
                <span class="delClass">删除</span>
              </template>
            </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加预约记录" :visible.sync="dialogFormVisible">
      <el-form :model="insertData">
        <el-form-item label="顾客" :label-width="formLabelWidth">
          <el-input v-model="insertData.customerName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="预约项目" :label-width="formLabelWidth">
          <el-input v-model="insertData.reserveItems" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="预约日期" :label-width="formLabelWidth">
          <el-input v-model="insertData.reserveDate" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="insertData.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onInsert">确 定</el-button>
      </div>
    </el-dialog>
    <div class="block">
    <el-pagination
      class="pageStyle"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pages.pageNum"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
  </div>
</template>


<script>
import { addRecord,delReocrd,getList } from '@/api/table'

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
      pages: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
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
      insertData: {
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
    async onDel({row}){
      try {
        const data = await delReocrd({id:row.id})
        this.getListCommon()
      } catch (error) {
        console.log(error)
      }
      
    },
    handleSizeChange(val) {
        this.pages.pageSize = val
        this.onSubmit()
      },
      handleCurrentChange(val) {
        this.pages.pageNum = val;
        this.onSubmit()
    },
    fetchData() {
      this.listLoading = true
      this.getListCommon()
    },
    onSubmit() {
      this.listLoading = true
      this.getListCommon(this.formInline)
    },
    async getListCommon(query){
      const params = {
        ...this.pages,
        ...query
      }
      const {body} = await getList(params)
      this.total = body.total
      this.list = body.records
      this.listLoading = false
    },
    onInsert() {
      this.dialogFormVisible = false
      this.listLoading = true
      // console.log(this.insertData)
      addRecord(this.insertData).then(response => {
        this.getListCommon(this.formInline)
      }).catch(e => {
        his.getListCommon(this.formInline)
      })
    }
  }
}
</script>
<style scoped>
.pageStyle{
  padding:20px;
}
.insertButton{
  padding:20px;
  text-align:right;
}
.delClass{
  color: red;
}
</style>