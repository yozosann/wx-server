const getToken = require('../utils/qiniu/getToken');
const router = require('koa-router')();

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
  images.length && images.forEach(async (item)=>{
    await item.destroy();
  })

  await ctx.modules.Images.bulkCreate(
    ctx.request.body.map((url,index) => {
      return {id: index + now, url: url, created_at: now }
    })
  );

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