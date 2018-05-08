const qiniu = require('qiniu');
const config = require('./qiniu.config');

const mac = new qiniu.auth.digest.Mac(config.accessKey, config.secretKey);

let options = {
  scope: config.scope,
  expires: config.expires
};

let putPolicy = new qiniu.rs.PutPolicy(options);
let isObsolete = false;
let uploadToken = putPolicy.uploadToken(mac);
setTimeout(() => {
  isObsolete = true;
}, config.expires * 1000);

module.exports = () => {
  console.log(isObsolete);
  if(isObsolete) {
    uploadToken = putPolicy.uploadToken(mac);
    isObsolete = false;
    setTimeout(() => {
      isObsolete = true;
    }, config.expires * 1000);
  }
  console.log(uploadToken);
  return uploadToken;
}