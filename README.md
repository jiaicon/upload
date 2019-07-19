#upload-h5

#项目参考地址：https://www.jianshu.com/p/db6113c94dbc

#打包 npm run build

#增加版本号 npm version patch

#发布npm包 npm publish

#本地测试 npm run dev

#如遇到代理问题  允许  npm config set proxy null

#安装 npm i rotate

#使用PHPstorm，开启ESLint，使用ESLint快捷键

#开启ESLint快捷键方法：preference->Keymap->搜索ESLint->Fix ESLint Problems

#git commit时会检查ESLint，有问题时会出错，git push时Everything up-to-date

#npm run lint-fix    修复ESLint问题

#api

maxLength:        number    最大数量
multiple:        bool      是否多个上传
type:            string    上传的类型  逗号分隔
onRemove:        func       移除的回调
size:            number     图片的大小  默认3M
onPreview:       func       预览
onCancel:        func       关闭预览
disabled:        bool       是否禁用
visible:         bool       是否显示预览
src:             string     
isRotate:        bool
apiHost:         string

|   |
|---|
|   |

import React from 'react';
import ReactDOM from 'react-dom';
import '@babel/polyfill';
import autoBind from 'react-autobind';
import { UploadPhoto } from './main';

class Test extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      
    };
  }

  render() {
    const { visible, src } = this.state;
    return (
      <UploadPhoto />
    );
  }
}

ReactDOM.render(<Test />, document.getElementById('app'));