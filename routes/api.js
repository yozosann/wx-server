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
  let Administrators = ctx.modules.Administrators;
  let {cipher, userId} = ctx.request.body, data = false;
  // console.log(Administrators);
  // let admini = await Administrators.create({
  //   'userid': userId,
  //   'cipher': cipher,
  // });

  let user = await Administrators.findAll({
    'where' : {
      'userid': userId,
    }
  });

  if(user[0] && user[0].cipher) {
    let plaintext1 = CryptoJS.AES.decrypt(cipher, 'yozo').toString(CryptoJS.enc.Utf8);
    let plaintext2 = CryptoJS.AES.decrypt(user[0].cipher, 'yozo').toString(CryptoJS.enc.Utf8);

    if(plaintext1 === plaintext2) {
      ctx.cookies.set('isyozo', 'yes', {httpOnly: false, maxAge: 3 * 24 * 60 * 60 * 1000});
      data = true;
    }
  }

  ctx.body = {
    code: 0,
    data
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