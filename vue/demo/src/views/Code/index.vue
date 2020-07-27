<template>
  <div class="page">
    <div class="code-box">
      <codemirror class="code" :value="code" :options="cmOptions"></codemirror>
    </div>
  </div>
</template>

<script>
import 'codemirror/theme/base16-dark.css'
export default {
  data() {
    return {
      code: '\n                                public static final String PRODUCT_INFO = \"PRODUCT_INFO\";\n    public static final String PRODUCT_CATEGORY_KEY = \"PRODUCT_CATEGORY_KEY\";\n    public static final String PRODUCT_KEY = \"PRODUCT_KEY\";\n    public static final String DEFAULT_PASSWORD = \"xxx\";\n    //正常商品个人限购数量                        ',
      cmOptions: {
        // codemirror options
        tabSize: 4,
        mode: 'text/java',
        theme: 'base16-dark',
        lineNumbers: true,
        firstLineNumber: 16,
        readOnly: true
      },
    };
  },
};
</script>

<style lang="scss">
.page {
  .code-box{
    height: 200px;
    .CodeMirror {
      height: 200px;
    }
  }
}
</style>