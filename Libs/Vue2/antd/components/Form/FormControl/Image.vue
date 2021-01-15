<template>
  <a-upload
    name="avatar"
    listType="picture-card"
    class="avatar-uploader"
    :showUploadList="false"
    action="/"
    :customRequest="customRequest"
    :beforeUpload="beforeUpload"
    @change="handleChange"
  >
    <a-icon v-if="value" class="image-setting" @click="handleDel" :size="small" type="close" style="font-size: 20px; color: rgba(0,0,0,.65)"/>
    <a-tooltip class="image-tooltip" v-if="value">
      <template slot="title">
        <div class="image-big">
          <img style="width: 100%" :src="value" alt="avatar"/>
        </div>
      </template>
       <img :src="value" style="object-fit: contain;" alt="avatar"/>
    </a-tooltip>
    <div class="uploader-image-size" v-if="value">
     {{imageWidth}} * {{imageHeigth}}，大小：{{imageSize}}
    </div>
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
import { upload, hkBs2FileUpload } from "@services/common";
import { imageUploadApi as bigoGameSpecialImageUploadApi } from "@services/bigoGameSpecial";
import FormControlProps from '../mixins/FormControlProps';
import { filter } from 'lodash';
import { FansListText } from '../../../views/clearFans/constant';
export default {
  mixins: [FormControlProps],
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  computed: {
    maxImageSize() {
      return this.options ? this.options.acceptSize : null;
    },
    acceptSize() {
      return this.options ? this.options.acceptSize : null;
    },
    uploadFunc() {
      // uploadType => 'common': 自家bfsc上传接口 'hk-old': 兼容旧hk运营后台保持一致 'hk-old-bigoGameSpecial'
      const { uploadType='common' } = this.options || { uploadType: 'common' };
      let func = upload;
      switch (uploadType) {
        case 'common':
          func = upload;
          break;
        case 'hk-old':
          func = hkBs2FileUpload;
          break;
        case 'hk-old-bigoGameSpecial':
          func = bigoGameSpecialImageUploadApi;
          break;
        default:
          break;
      }

      return func;
    }
  },
  data() {
    return {
      loading: false,
      imageWidth: 0,
      imageHeigth: 0,
      imageSize: 0
    };
  },
  watch: {
    value(val) {
      this.resetImageSize(val);
      this.getImageUrlSize(val)
    }
  },
  mounted() {
    this.resetImageSize(this.value);
    if(this.value) {
      this.getImageUrlSize(this.value)
    }
  },
  methods: {
    bytesToSize(bytes) {
      if (bytes === 0) return '0 B';
      let k = 1024;
      let sizes = ['B','KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return Math.ceil((bytes / Math.pow(k, i))) + ' ' + sizes[i];
    },
    handleLongpress() {
    },
    customRequest(data) {
      const formdata = new FormData();
      formdata.append("file", data.file);
      // upload(formdata)
      this.uploadFunc(formdata)
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
    handleDel(e) {
      e.stopPropagation(); 
      this.$emit("uploaded", '');
      this.$emit("input", '');
      this.$emit("change", '');
    },
    handleChange(info) {
      console.log(info.file)
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
    },
    beforeUpload(file) {
      let largeThanMaxSize = false;
      if(this.maxImageSize && file.size > this.maxImageSize) {
        largeThanMaxSize = true;
      }
      return new Promise(async (resolve, reject) => {
        let checkImageSize = await this.checkFileImageSize(file);
        if(checkImageSize && !largeThanMaxSize) {
          resolve(true)
          return;
        }
        let flag = checkImageSize;
        flag = !checkImageSize && await new Promise((res, rej) => {
          this.$confirm({
            title: `图片尺寸不符合以下尺寸：${this.acceptSize.join(',')}，是否执意上传`,
            okText: '继续上传',
            cancelText: '重新选择',
            onOk: () => {
              res(true)
            },
            onCancel: () => {
              res(false);
            }
          })
        })
        if(!flag) {
          reject(false)
          return;
        }
        if(largeThanMaxSize) {
          this.$confirm({
            title: `图片大小大于：${this.bytesToSize(this.maxImageSize)}`,
            content: `图片大小为：${this.bytesToSize(file.size)}，前往tiny压缩后再上传`,
            okText: '去压缩',
            cancelText: '继续上传',
            onOk: () => {
              reject(false)
              window.open('https://tinypng.com');
            },
            onCancel: () => {
              resolve(true)
            }
          })
        } else {
          resolve(true)
        }
      })
    },
    checkFileImageSize(file) {
      return new Promise((resvole, reject) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          const image = new Image();
          image.src = e.target.result;
          image.style = 'display: none';
          image.onload = () => {
            resvole(this.acceptSize ? this.acceptSize.includes(`${image.width}*${image.height}`) : true);
            document.body.removeChild(image);
          }
          image.onerror = () => {
            document.body.removeChild(image)
            resolve(true)
          }
          document.body.appendChild(image)
        }
        reader.onerror = (err) => {
          resolve(true)
        }
      })
    },
    resetImageSize(src) {
      const image = new Image();
      image.src = src;
      image.style = 'display: none';
      image.onload = () => {
        this.imageWidth = image.width;
        this.imageHeigth = image.height;
        document.body.removeChild(image);
      }
      image.onerror = () => {
        document.body.removeChild(image)
      }
      document.body.appendChild(image)
    },
    /**
     * 获取图片大小
     */
    async getImageUrlSize(url) {
     return fetch(url).then((res) => {
        return res.blob();
      }).then((data) => {
        this.imageSize = this.bytesToSize(data.size);
      })
    }
  },
};
</script>
<style lang="scss">
.avatar-uploader > .ant-upload {
  width: 128px;
  min-height: 128px;
  height: auto;
  // padding-bottom: 20px;
  position: relative;
  .uploader-image-size{
    // position: absolute;
    // bottom: 0;
    // left: 5px;
  }
  .image-setting{
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 100;
  }
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
  width: 200px;
  height: auto;
  // height: 120px;
}
</style>