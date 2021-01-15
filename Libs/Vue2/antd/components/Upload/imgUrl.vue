<template>
  <a-upload
    name="avatar"
    listType="picture-card"
    class="avatar-uploader"
    :showUploadList="false"
    action="/"
    :customRequest="customRequest"
    :beforeUpload="beforeUpload"
    :disabled="disabled"
    :accept="accept"
    @change="handleChange"
  >
    <img v-if="value" :src="value" alt="avatar" />
    <div v-else>
      <a-icon :type="loading ? 'loading' : 'plus'" />
      <div class="ant-upload-text">Upload</div>
    </div>
  </a-upload>
</template>
<script>
/**
 * 使用方式
 * <upload-image
    v-model="image"
    :options="uploadOptions"
    @uploaded="onUploaded"
  />

  其中，image为上传后抛出的url值
 */
import { upload } from "@services/common";

export default {
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: {
      type: String,
      required: true,
      default: "",
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    accept: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      // value: '',
    };
  },
  methods: {
    customRequest(data) {
      const formdata = new FormData();
      formdata.append("file", data.file);
      console.log(data.file)
      upload(formdata)
        .then((resp) => {
          if (resp.code === 0) {
            const { url } = resp.data[0];
            this.value = url;
            this.$emit("uploaded", url);
            // 这里有个技巧，发射input事件，调用时可以使用v-model="url"即可获取到url的值
            this.$emit("input", url);
            this.$emit("change", url);
          } else {
            this.$message.error("upload failed");
          }
          this.loading = false;
        })
        .catch((e) => {
          this.$message.error("upload failed");
          this.loading = false;
        });
    },
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
    },
    beforeUpload(file) {
      const largeThan300K = file.size / 1024 < 300;
      if (!largeThan300K) {
        this.$message.error("图片不能超过300k!");
      }
      return largeThan300K;
    },
  },
};
</script>
<style>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

.avatar-uploader {
  overflow: hidden;
}
.avatar-uploader img {
  width: 120px;
  height: 120px;
}
</style>