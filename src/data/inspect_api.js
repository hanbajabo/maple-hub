async function getMapleroad() {
  const url = 'https://api.mapleroad.kr/field?level=210';
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
}
getMapleroad();
