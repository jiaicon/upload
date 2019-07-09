#npm_pro
#项目参考地址：https://www.jianshu.com/p/db6113c94dbc
#打包 npm run build
#增加版本号 npm version patch
#发布npm包 npm publish

#本地测试 npm run dev

#如遇到代理问题  允许  npm config set proxy null

#安装 npm i [包名]

disabled            bool      是否允许使用
apiHost             string    上传的地址 (存在是window的无效)
window.apiHost      string    上传的地址 (http://localhost:9527/api/image)
length              number    上传的个数
multiple            bool      是否支持多选，浏览器command键多选，建议设为false，
onRemove            func      删掉图片时的回调
handleChange        func      图片改变时的回调，上传成功失败都会调用

//预览
onPreview           func      自定义预览,点击预览时的回调
onCancel            func      关闭预览时的回调
visible             bool      是否打开预览modal
src                 string    预览的图片
isRotate            bool      是否旋转  默认false  


//需要server端配合
type                string    上传图片的格式，逗号分隔（设置handleBeforeUpload时无效）
size                number    限制大小，默认3M（设置handleBeforeUpload时无效）
handleBeforeUpload  func      图片上传前的回调，可以用来对图片进行判断，
