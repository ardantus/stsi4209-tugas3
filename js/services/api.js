async function loadData() {
  const res = await fetch('data/dataBahanAjar.json');
  return await res.json();
}