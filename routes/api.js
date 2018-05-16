const getToken = require('../utils/qiniu/getToken');
const router = require('koa-router')();
const CryptoJS = require("crypto-js");

router.prefix('/api')

router.get('/getImages', async function (ctx, next) {
  ctx.body = {
    code: 0,
    data: {
      images: await ctx.modules.Images.findAll()
    }
  }
})

router.post('/saveImages', async function (ctx, next) {
  let images = await ctx.modules.Images.findAll(), now = Date.now();
  images.length && images.forEach(async (item) => {
    await item.destroy();
  })

  await ctx.modules.Images.bulkCreate(
    ctx.request.body.map((url, index) => {
      return { id: index + now, url: url, created_at: now }
    })
  );

  ctx.body = {
    code: 0,
    data: null
  }
})

router.post('/login', async function (ctx, next) {
  let {cipher, userId} = ctx.request.body;
  ctx.cookies.set('name', 'tobi');

  let bytes = CryptoJS.AES.decrypt(cipher, 'yozo');
  let plaintext = bytes.toString(CryptoJS.enc.Utf8);

  console.log(plaintext);

  ctx.body = {
    code: 0,
    data: null
  }
})

router.get('/getUploadToken', function (ctx, next) {
  ctx.body = {
    code: 0,
    data: {
      token: getToken()
    }
  }
})

module.exports = router