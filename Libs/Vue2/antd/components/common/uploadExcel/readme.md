<template>
  <div class="tmpl">
    <uploadExcel text="批量上传标签" v-model="batchTags" @change="getUploadData"></uploadExcel>
  </div>
</template>

<script type="text/javascript">
  /**
   * 支持上传.xls .xlsx的Excel文件，返回第一个表格的json数据，不支持多表格
   * @authors Rosie (liluoxing@bigo.sg)
   * @date    2020-01-03 18:08:11
   * @return {Array} 第一个工作表的json数据
   * @example [{标签名: "猫耳朵1",类别: "一级标签",特效类型: "贴纸"}, {...}]
   */
  import UploadExcel from '@components/common/uploadExcel';

  export default {
    name: 'tmpl',

    data: {
        batchTags: ''
    },

    watch: {
      batchTags(val) {
        console.log('?batchTags', val)
      }
    },

    components: {
      UploadExcel
    },

    methods: {
      getUploadData(data) {
        console.log('?data', data)
      }
    }
}
</script>