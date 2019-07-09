import React from 'react';
import PropTypes from 'prop-types';
import { Upload, Icon, message } from 'antd';
import autoBind from 'react-autobind';
import { Rotate } from 'rotate-h5';

class UploadPhoto extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state={
            loading: false,
            iserror: false,
            fileList: [],
            max_length: props.max_length,
            multiple: props.multiple || false,
            type: props.type,
            visible: false
        }
    }
    componentDidMount() {

    }
    handleChange(file) {
        //上传成功失败都会调用
        console.log('上传回调：：', file);
        const {handleChange} = this.props;
        if(handleChange&&typeof handleChange==='function') {
            handleChange();
            return;
        }
        if(file.file.status === 'uploading') {
            this.setState({
                loading: true
            });
            return;
        }
        if(file.file.status === 'done') {
            let img = new Image();
            img.src = file.file.response.url;
            img.onerror=()=>{
                this.setState({
                    iserror: true,
                    loading: false
                })
            };
            img.onload=()=>{
                this.setState({
                    iserror: false,
                    fileList: file.fileList,
                    loading: false
                })
            };
            return;
        }
        if(file.file.status === "error") {
            this.setState({
                fileList: file.fileList,
                loading: false
            })
        }
        if(file.file.status === "removed") {
            this.setState({
                fileList: file.fileList
            })
        }
    }
    handleBeforeUpload(file) {
        const size = this.props.size || 3;
        const isLt3M = file.size / 1024 / 1024 < size;
        if (!isLt3M) {
            message.error(`超过${size}M限制，不允许上传~`);
            return;
        }
        return this.checkImageType(file) && isLt3M && this.checkImageWH(file);
    }
    checkImageWH(file) {
        return new Promise(function(resolve, reject) {
            let filereader = new FileReader();
            filereader.onload = e => {
                let src = e.target.result;
                const image = new Image();
                image.onload = function() {
                    // 获取图片的宽高，并存放到file对象中
                    console.log('file width :' + this.width);
                    console.log('file height :' + this.height);
                    file.width = this.width;
                    file.height = this.height;
                    resolve();
                };
                image.onerror = reject;
                image.src = src;
            };
            filereader.readAsDataURL(file);
        });
    }
    checkImageType(file) {
        //限制图片 格式、size、分辨率
        let {type} = this.state;
        if(type) {
            type=type.replace(/\s*/g,"").toLowerCase();
            let type_arr = type.split(',');
            let flag = false;
            for(let i = 0; i < type_arr.length;i++) {
                if(file.type == `image/${type_arr[i]}`) return true;
            }
            if(!flag) {
                message.error(`只能上传${type}格式的图片~`);
                return false;
            }
        }else {
            const isJPG = file.type === 'image/jpeg';
            const isJPEG = file.type === 'image/jpeg';
            const isGIF = file.type === 'image/gif';
            const isPNG = file.type === 'image/png';
            if (!(isJPG || isJPEG || isGIF || isPNG)) {
                message.error('只能上传JPG 、JPEG 、GIF、 PNG格式的图片~');
                return false;
            }
        }
        return true;
    }
    onRemove(file) {
        console.log('removed::', file);
        const onRemove = this.props.onRemove;
        onRemove&&typeof onRemove==='function'&&onRemove(file);
    }
    handlePreview(file) {
        const { onPreview } = this.props;
        if(onPreview&&typeof onPreview==='function') {
            onPreview(file);
            return;
        }
        this.setState({
            visible: true,
            src: file.thumbUrl
        })
    }
    onCancel(file) {
        const { onCancel } = this.props;
        if(onCancel&&typeof onCancel==='function') {
            onCancel(file);
            return;
        }
        this.setState({
            visible: false,
            src: ''
        })
    }
    render() {
        let { fileList, multiple, max_length, visible, src } = this.state;
        let visible_props = this.props.visible;
        let src_props = this.props.src;
        let isRotate_props = this.props.isRotate;
        if(visible_props != undefined && typeof visible_props === 'boolean') visible=visible_props;
        if(src_props != undefined) src=src_props;
        if(isRotate_props == undefined || typeof isRotate_props != 'boolean') isRotate_props=false;
        const { apiHost } = this.props;
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        let disabled = this.props.disabled;
        if(disabled==undefined || typeof disabled != 'boolean') disabled=false;
        console.log('fileList::::', fileList);
        const props = {
            showUploadList: true,
            listType: 'picture-card',
            action: `${apiHost || window.apiHost || 'http://localhost:9527'}/api/image`,
            accept: 'image/*',
            name: 'file',
            multiple: multiple,
            onChange: this.handleChange,
            onPreview: this.handlePreview,
            beforeUpload: this.handleBeforeUpload,
            onRemove: this.onRemove,
            disabled
        };
        return <div>
            <Upload {...props}>
                {fileList.length >= max_length ? null : uploadButton}
            </Upload>
            <Rotate isRotate={isRotate_props} visible={visible} src={src} onCancel={this.onCancel}/>
        </div>
    }
}

UploadPhoto.propTypes = {
    max_length: PropTypes.number,
    multiple: PropTypes.bool,
    type: PropTypes.string,
    onRemove: PropTypes.func,
    size: PropTypes.number,
    onPreview: PropTypes.func,
    onCancel: PropTypes.func,
    disabled: PropTypes.bool,
    visible: PropTypes.bool,
    src: PropTypes.string,
    isRotate: PropTypes.bool,
    apiHost: PropTypes.string
};

export default UploadPhoto;