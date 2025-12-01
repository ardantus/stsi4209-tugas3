Vue.component('ba-status-badge', {
  template: '#tpl-status-badge',
  props: ['qty', 'safety'],
  computed: {
    status() {
      if (this.qty == 0) return {text:'Kosong', cls:'status-kosong'};
      if (this.qty < this.safety) return {text:'Menipis', cls:'status-menipis'};
      return {text:'Aman', cls:'status-aman'};
    }
  }
});