// ba-stock-table.js
Vue.component('ba-stock-table', {
  template: '#tpl-stock-table',
  data() {
    return {
      raw: [],
      list: [],
      upbjjList: [],
      kategoriList: [],
      filterUpbjj: '',
      filterKategori: '',
      filterKritis: false,
      sortKey: '',
      sortAsc: true,
      form: {kode:'', judul:'', kategori:'', upbjj:'', lokasiRak:'', harga:0, qty:0, safety:0, catatanHTML:''},
      editIndex: -1,
      showForm: false
    }
  },
  async created() {
    const data = await loadData();
    this.raw = data.stok;
    this.list = [...this.raw];
    this.upbjjList = data.upbjjList;
    this.kategoriList = data.kategoriList;
  },
  computed: {
    filtered() {
      let res = [...this.raw];

      if (this.filterUpbjj) res = res.filter(x => x.upbjj === this.filterUpbjj);
      if (this.filterKategori) res = res.filter(x => x.kategori === this.filterKategori);
      if (this.filterKritis) res = res.filter(x => x.qty < x.safety || x.qty === 0);

      if (this.sortKey) {
        res.sort((a,b) => {
          let A = a[this.sortKey], B = b[this.sortKey];
          if (typeof A === 'string') { A = A.toLowerCase(); B = B.toLowerCase(); }
          return (A > B ? 1 : -1) * (this.sortAsc ? 1 : -1);
        });
      }
      return res;
    },
    kategoriByUpbjj() {
      if (!this.filterUpbjj) return this.kategoriList;
      return [...new Set(this.raw.filter(x=>x.upbjj===this.filterUpbjj).map(x=>x.kategori))];
    }
  },
  watch: {
    filterUpbjj() { this.filterKategori = ''; }, // dependent options
    raw() { this.list = [...this.raw]; }
  },
  methods: {
    formatRupiah(n) { return 'Rp ' + n.toLocaleString('id-ID'); },
    formatBuah(n) { return n + ' buah'; },
    sortBy(key) {
      if (this.sortKey === key) this.sortAsc = !this.sortAsc;
      else { this.sortKey = key; this.sortAsc = true; }
    },
    resetFilter() {
      this.filterUpbjj = ''; this.filterKategori = ''; this.filterKritis = false; this.sortKey = '';
    },
    startAdd() {
      this.form = {kode:'', judul:'', kategori:'', upbjj:'', lokasiRak:'', harga:0, qty:0, safety:0, catatanHTML:''};
      this.editIndex = -1;
      this.showForm = true;
    },
    startEdit(item, idx) {
      this.form = {...item};
      this.editIndex = idx;
      this.showForm = true;
    },
    save(e) {
      if (e.key && e.key !== 'Enter') return;
      if (!this.form.kode || !this.form.judul) {
        alert('Kode dan Judul wajib diisi');
        return;
      }
      if (this.editIndex >= 0) {
        this.raw[this.editIndex] = {...this.form};
      } else {
        this.raw.push({...this.form});
      }
      this.showForm = false;
    },
    hapus(idx) {
      if (confirm('Yakin menghapus bahan ajar ini?')) {
        this.raw.splice(idx, 1);
      }
    },
    showCatatan(item) {
      app.showCatatan(item);
    }
  }
});