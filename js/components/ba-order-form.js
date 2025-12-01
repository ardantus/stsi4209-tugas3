Vue.component('ba-order-form', {
  template: '#tpl-order-form',
  data() {
    return {
      form: {noPo:'', tanggal:'', supplier:'', keterangan:''},
      orderList: []
    }
  },
  created() {
    // Load dari localStorage jika ada
    const saved = localStorage.getItem('orderList');
    if (saved) this.orderList = JSON.parse(saved);
  },
  methods: {
    simpanOrder() {
      if (!this.form.noPo || !this.form.supplier) {
        alert('No. PO dan Supplier harus diisi');
        return;
      }
      this.orderList.push({...this.form});
      localStorage.setItem('orderList', JSON.stringify(this.orderList));
      this.resetForm();
      alert('Order berhasil disimpan');
    },
    resetForm() {
      this.form = {noPo:'', tanggal:'', supplier:'', keterangan:''};
    },
    hapusOrder(i) {
      if (confirm('Yakin menghapus order ini?')) {
        this.orderList.splice(i, 1);
        localStorage.setItem('orderList', JSON.stringify(this.orderList));
      }
    }
  }
});
