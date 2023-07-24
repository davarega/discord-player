const { default: axios } = require('axios');

axios.get('https://api.waifu.pics/sfw/waifu').then(responnse => console.log(responnse.data)).catch((error) => console.log(error));