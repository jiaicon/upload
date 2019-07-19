// const _banner = require("./component/banner/antd");
const _uploadPhoto = require('./component/upload/upload');
// const _rotate = require('./component/rotate/rotate');
//
// Object.defineProperty(exports, 'Rotate', {
//     enumerable: true,
//     get: function get() {
//         return _rotate.default;
//     }
// });

// Object.defineProperty(exports, "Banner", {
//     enumerable: true,
//     get: function get() {
//         return _banner["default"];
//     }
// });

Object.defineProperty(exports, 'UploadPhoto', {
    enumerable: true,
    get: function get() {
        return _uploadPhoto.default;
    }
});

// export {default as Banner} from './banner/antd';
// export {default as Rotate} from './banner/rotate';
// export {default as Banner} from './banner/antd';


// module.exports = {
//     Banner: _banner['default'],
//     UploadPhoto: _uploadPhoto['default'],
//     Rotate: _rotate['default']
// };
