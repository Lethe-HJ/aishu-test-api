const Koa = require('koa');
const router = require('koa-route'); 
const koaBody = require('koa-body');
const path = require('path');
// const cors = require('koa-cors');
const app = new Koa();

// app.use(cors());
app.use(koaBody({
  // 支持文件格式
  multipart: true,
  formidable: {
    // 上传目录
    uploadDir: path.join(__dirname, 'public/uploads'),
    // 保留文件扩展名
    keepExtensions: true,
  }
}));


const apiTest1 = ctx => {
  ctx.set("Content-Type", "application/json")
  ctx.response.body =  JSON.stringify({ success: true}); 
}

router.get('/api', apiTest1);
router.post('/upload', ctx => {
  const file = ctx.request.files.file
  ctx.body = { path: file.path }
})
app.use(router.routes());
app.listen(8000, () => {
    console.log('[demo] server is starting at port 8000');
});
