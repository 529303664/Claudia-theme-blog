<template>
  <a-upload
    :accept="accept"
    :multiple="multiple"
    :headers="headers"
    :fileList="fileList"
    @change="handleChange"
    :beforeUpload="beforeUpload"
    action="/"
    :customRequest="customRequest"
  >
    <a-button> <a-icon type="upload" />{{btnName}}</a-button>
  </a-upload>
</template>
<script>
  export default {
    props:{
      // 上传的处理都需要自定义(因为一般的上传都不会立马上传，而且需要通过点按钮等确认)
      /**
       *  const formdata = new FormData();
       *  formdata.append('file', this.file1);
       *  formdata.append('id', this.id);
       *  this.$message.info('批量添加中...');
       *  await uploadFile(formdata);
       */
      handleCustomRequest: {
        type: Function,
        require: true
      },
      btnName: String || '上传文件',
      accept: {
        type: String,
        default: ''
      },
      multiple: Boolean
    },
    data() {
      return {
        headers: {
          authorization: 'authorization-text',
        },
        fileList: []
      };
    },
    methods: {
      resetFileList() {
        this.fileList = [];
      },
      customRequest(data) {
        this.$emit('handleCustomRequest', data);
      },
      beforeUpload(file, fileList) {
        // 对于图片，限制最大上传大小为 300K
        let includeHugeImg = false;
        for (let i = 0; i < fileList.length; i += 1) {
          const f = fileList[i];
          if (f.type.indexOf('image/') > -1 && Math.ceil(f.size / 1000) > 300) {
            includeHugeImg = true;
            fileList.splice(i, 1);
            break;
          }
        }

        if (includeHugeImg) {
          this.$message.error('图片不能超过300K')
          return false;
        }
        
        return true;
      },
      handleChange(info) {
        const { fileList } = info;
        // 直接设置为上传完成，取消掉spin转动
        setTimeout(() => {
          info.file.status = 'done';
        }, 2000);
        this.fileList = fileList;
      },
    },
  };
</script>