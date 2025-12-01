Vue.component('ba-do-tracking', {
  template: '#tpl-do-tracking',
  data() { return {
    dataMaster: {},
    trackingList: [],
    search: '',
    form: {nim:'', nama:'', ekspedisi:'', paket:'', tanggalKirim:'', keteranganBaru:''},
    detailPaket: null
  }},
  async created() {
    this.dataMaster = await loadData();
    this.trackingList = this.dataMaster.tracking.map(obj => Object.values(obj)[0]);
  },
  computed: {
    hasilCari() {
      if (!this.search) return this.trackingList;
      const s = this.search.toLowerCase();
      return this.trackingList.filter(t =>
        t.DO2025?.toLowerCase().includes(s) || t.nim.includes(s)
      );
    },
    nomorDOBaru() {
      const seq = String(this.trackingList.length + 1).padStart(3,'0');
      return `DO2025-${seq}`;
    }
  },
  methods: {
    formatTanggal(d) {
      const o = new Date(d);
      const bulan = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
      return `${o.getDate()} ${bulan[o.getMonth()]} ${o.getFullYear()}`;
    },
    formatRupiah(n) { return 'Rp ' + Number(n).toLocaleString('id-ID'); },
    pilihPaket() {
      this.detailPaket = this.dataMaster.paket.find(p => p.kode === this.form.paket);
    },
    tambahDO(e) {
      if (e.key && e.key !== 'Enter') return;
      if (!this.form.nim || !this.form.nama || !this.form.paket) return alert('Lengkapi data');
      const baru = {
        [this.nomorDOBaru]: {
          nim: this.form.nim,
          nama: this.form.nama,
          paket: this.form.paket,
          total: this.detailPaket.harga,
          tanggalKirim: new Date().toISOString().split('T')[0],
          ekspedisi: this.form.ekspedisi === 'REG' ? 'JNE Regular' : 'JNE Express',
          perjalanan: [{waktu: new Date().toLocaleString('id-ID').replace(/\//g,'-'), keterangan: 'Paket diterima di loket'}]
        }
      };
      this.trackingList.push(Object.values(baru)[0]);
      this.form = {nim:'', nama:'', ekspedisi:'', paket:'', keteranganBaru:''};
      this.detailPaket = null;
    },
    tambahProgress(item) {
      const waktu = new Date().toLocaleString('id-ID').replace(/\//g,'-');
      item.perjalanan.push({waktu, keterangan: item.keteranganBaru || 'Update status'});
      item.keteranganBaru = '';
    }
  }
});