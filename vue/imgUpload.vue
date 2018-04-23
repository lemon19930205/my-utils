<template>
  <div class="demo">
    <!--多张上传  elementUI-->
    <el-upload class="upload-img"
               action="http://47.93.56.177:8082/juyi-web-backstage/file/uploadFile.do"
               :headers="{token:newToken}"
               :on-preview="imgPreview"
               :on-remove="imgRemove"
               :on-success="imgSuccess"
               :file-list="file"
               list-type="picture"
               accept="image/gif,image/jpeg,image/jpg,image/png"
               multiple
    >
      <el-button type="primary">上传文件</el-button>
    </el-upload>

    <!--原生上传 单张-->
    <input type="file" name="avatar" accept="image/gif,image/jpeg,image/jpg,image/png"
           @change="changeImage($event)" ref="avatarInput">
    <img class="update-img" :src="updateImgUrl">
  </div>
</template>

<script>
  export default {
    data(){
      return {
        file:[]
      }
    },
    methods:{
      imgPreview:function (file) {
        console.log(file);
      },
      imgRemove:function (file, fileList) {
        console.log(file, fileList);
      },
      imgSuccess:function (response, file, fileList) {
        console.log(response, file, fileList);
      }

      changeImage(e) {
        let file = e.target.files[0]
        let reader = new FileReader()
        let that = this
        reader.readAsDataURL(file)
        reader.onload = function (e) {
          that.formData.file = this.result
        }
      },
    },
    computed:{
      newToken:function () {
        return sessionStorage.getItem('token')
      }
    },
    components:{
    }
  }
</script>

<style>

</style>
