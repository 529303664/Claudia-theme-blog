<template>
  <div class="tmpl">
    <a-upload
      name="file"
      accept=".xlsx, .xls"
      @change="handleUploadTag"
      :fileList="fileList"
      :disabled="disabled">
      <a-button> <a-icon type="upload" />{{ text }}</a-button>
    </a-upload>
  </div>
</template>



<script>
  /**
   * 支持上传.xls .xlsx的Excel文件，返回第一个表格的json数据，不支持多表格，默认只显示一个上传文件
   * @authors Rosie (liluoxing@bigo.sg)
   * @date    2020-01-03 18:08:11
   * @param {String} text 按钮文字
   * @param {Number, String} fileShowNum 显示上传文件个数，默认一个
   * @return {Array} 第一个工作表的json数据
   * @example [{标签名: "猫耳朵1",类别: "一级标签",特效类型: "贴纸"}, {...}]
   */
  // import { mapState } from 'vuex';
  import XLSX from 'xlsx';

  export default {
    name: 'UploadExcel',

    props: {
      text: {
        type: String,
        default: '上传 Excel'
      },
      fileShowNum: {
        type: [Number, String],
        default: 1
      },
      disabled: Boolean
    },

    data: () => ({
      fileList: []
    }),

    created() {},

    methods: {
      handleUploadTag(info) {
        this.handleFileShowNum(info);
        if (info.file.status == 'removed') {
          return
        }
        if (info.file.status == 'done') {
          const file = info.file.originFileObj;
          const fileName = info.file.name;
          const reader = new FileReader();

          reader.onload = (event) => {
            const data = event.target.result;
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetJson = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
            this.$emit('input', sheetJson);
            this.$emit('change', sheetJson);
          }

          reader.readAsArrayBuffer(file);
        }
      },

      handleFileShowNum(info) {
        let fileList = [...info.fileList];
        const fileShowNum = +this.fileShowNum;
        fileList = fileList.slice(-fileShowNum);

        this.fileList = fileList;
      }
    }
  };
</script>



<style lang="scss" scoped>
/* @import '~@assets/css/mixin'; */

</style>
