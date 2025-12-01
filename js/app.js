const app = new Vue({
  el: '#app',
  data: {
    tab: 'stok',
    modal: {show:false, title:'', content:''}
  },
  methods: {
    showCatatan(item) {
      this.modal.show = true;
      this.modal.title = 'Catatan ' + item.kode;
      this.modal.content = item.catatanHTML;
    }
  }
});