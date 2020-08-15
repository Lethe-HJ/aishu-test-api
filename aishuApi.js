const Koa = require('koa');
const os = require('os');
const path = require('path');
const koaBody = require('koa-body');
const route = require('koa-route');
const cors = require('koa-cors');
const fs = require('fs');
const app = new Koa();
const fileUpload =  async (ctx, next) => {
  // 上传单个文件
  // const file = ctx.request.files.file; // 获取上传文件
  // // 创建可读流
  // const reader = fs.createReadStream(file.path);
  // let filePath = path.join(__dirname, 'public/upload/') + `/${file.name}`;
  // // 创建可写流
  // const upStream = fs.createWriteStream(filePath);
  // // 可读流通过管道写入可写流
  // reader.pipe(upStream);
  console.log(ctx)
  return ctx.body = "上传成功！";
}

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*'); // 很奇怪的是，使用 * 会出现一些其他问题
  ctx.set('Access-Control-Allow-Headers', 'content-type');
  ctx.set('Access-Control-Allow-Methods', 'OPTIONS,GET,HEAD,PUT,POST,DELETE,PATCH')
  ctx.set('Access-Control-Allow-Credentials', 'true');
  await next();
});

app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, 'public/uploads'),
    keepExtensions: true,
  }
}));

const apiTest1 = ctx => {
  ctx.set("Content-Type", "application/json")
  ctx.response.body =  JSON.stringify({ success: true}); 
}

app.use(route.post('/file/', fileUpload));
app.use(route.get('/api', apiTest1));
app.listen(8000, () => {
    console.log('[demo] server is starting at port 8000');
});
