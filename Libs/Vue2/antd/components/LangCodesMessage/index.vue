<template>
  <div>
    <a-form :form="langForm" :label-col="{ span: 3 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="model_code">
        <template>{{model_code}}</template>
      </a-form-item>

      <a-form-item label="语言码">
        <a-select
          v-decorator="['lang', { initialValue: 'default', rules: [ { required: true, message: '请选择国家码' } ] }]"
          placeholder="选择国家码"
        >
          <a-select-option
            v-for="(item, index) in langMap"
            :key="index"
            :value="item.lang"
          >{{item.lang}}:{{item.name}}</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="文案">
        <a-textarea
          v-decorator="['model_text', { initialValue: '', rules: [ { required: true, message: '请输入文案' } ] }]"
          placeholder="请输入活动主题多语言"
        />
      </a-form-item>
    </a-form>

    <div class="btn-group">
      <a-button
        type="primary"
        :style="{backgroundColor: '#2db7f5', border:'none'}"
        @click="handleSubmit"
      >添加</a-button>

      <a-button
        type="default"
        :style="{backgroundColor: '#f90', border:'none', color: '#fff'}"
        @click="handelClear"
      >清空</a-button>

      <a-button type="primary" icon="download" :style="{backgroundColor: '#2d8cf0', border:'none'}">
        <a
          class="download"
          href="https://static-web.likeevideo.com/as/bigo-static/act_20602/langTpl.xlsx"
          download="tpl"
        >下载模板</a>
      </a-button>
      <a-upload
        name="file"
        accept=".xlsx, .xls"
        class="upload-excel"
        :multiple="false"
        :fileList="fileList"
        :beforeUpload="beforeUpload"
        :showUploadList="false"
      >
        <a-button>
          <a-icon type="upload" />导入
        </a-button>
      </a-upload>
    </div>

    <a-table
      :columns="columns"
      :dataSource="langList"
      :pagination="false"
      :rowKey="record => record.lang"
      :scroll="{ y: 200 }"
      :loading="loading"
    >
      <template slot="action" slot-scope="text, record, index">
        <a href="javascript:;" @click.stop="handelDeleteRecord(record, index)">删除</a>
      </template>
    </a-table>
  </div>
</template>

<script>
import { columns } from "./static";
import langMap from "./langMap";

import UploadExcel from "@components/common/uploadExcel";

import { add, del, search, upload } from "@services/langCodesMessage";

export default {
  name: "langCodesMessage",
  props: {
    model_code: {
      type: String,
      required: true,
      defautl: "0"
    },
    isImmediate: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  components: { UploadExcel },
  created() {
    this.langForm = this.$form.createForm(this);
    this.fetchList();
  },
  watch: {
    model_code: {
      immediate: true,
      handler() {
        if (this.isImmediate) {
          this.fetchList();
        }
      }
    }
  },
  data() {
    return {
      langMap,
      columns,
      langList: [],
      fileList: [],
      loading: false
    };
  },
  methods: {
    resetFields() {
      this.langList = [];
      this.langForm.resetFields();
    },
    async handelDeleteRecord(record, index) {
      const { model_code, lang } = record;
      const res = await del({ model_code, lang });
      if (res.status == 200) {
        this.$message.success("操作成功");
        this.langList.splice(index, 1);
      } else {
        this.$message.error("操作失败");
      }
    },
    handleSubmit() {
      this.langForm.validateFields().then(async value => {
        const { lang, model_text } = value;
        const { model_code } = this;
        const res = await add({ model_code, lang, model_text });
        if (res.status == 200) {
          const { type, lang, model_text } = res.data;
          if (type == 1) {
            this.$message.success("添加成功");
            this.langList.unshift(res.data);
          } else {
            this.$message.success("修改成功");
            const index = this.langList.findIndex(item => item.lang == lang);
            this.langList[index].model_text = model_text;
          }
          this.langForm.resetFields();
        } else {
          this.$message.error("添加失败");
        }
      });
    },
    async handelClear() {
      const { model_code } = this;
      const res = await del({ model_code });
      if (res.status == 200) {
        this.$message.success("操作成功");
        this.langList = [];
      } else {
        this.$message.error("操作失败");
      }
    },

    async beforeUpload(file) {
      this.fileList = [file];

      const hideLoading = this.$message.loading("正在导入数据", 0);

      if (!this.fileList[0]) {
        this.$message.error("文件不能为空");
        setTimeout(() => {
          hideLoading();
        }, 0);
        return;
      }

      let formData = new FormData();
      formData.append("model_code", this.model_code);
      formData.append("file", this.fileList[0]);

      try {
        const res = await upload(formData);
        this.fileList = [];
        hideLoading();

        if (res.status == 200) {
          this.$message.success("操作成功");
          setTimeout(this.fetchList, 100);
        } else {
          this.$message.error(res.msg);
        }
      } catch (e) {
        hideLoading();
        this.$message.error(e.msg || e.errorMessages || e.message);
      }

      return false;
    },

    async fetchList() {
      const { model_code } = this;
      this.loading = true;
      const res = await search({ model_code });
      if (res.status == 200) {
        this.langList = res.data.rows;
      }
      this.loading = false;
    }
  }
};
</script>

<style lang="scss">
.btn-group {
  margin-bottom: 20px;

  button {
    margin-right: 5px;
  }

  .anticon-download,
  .anticon-upload {
    position: relative;
    top: -2px;
    vertical-align: middle;
  }
}

.download {
  text-decoration: none;
  color: #fff;
  &:hover {
    color: #fff;
  }
}

.upload-excel {
  ::v-deepbutton,
  ::v-deepbutton:hover,
  ::v-deepbutton:focus {
    color: #fff;
    background-color: #19be6b;
  }
}
</style>