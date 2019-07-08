import React from 'react';
import PropTypes from 'prop-types';
import { Upload, Icon, message } from 'antd';
import autoBind from 'react-autobind';


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
            type: props.type
        }
    }
    componentDidMount() {

    }
    // handleChange = ({ fileList }) => this.setState({ fileList });
    //上传成功失败都会调用
    handleChange({ file,fileList }) {
        console.log('上传回调：：', file,fileList);
        if(file.status === 'uploading') {
            this.setState({
                loading: true
            });
            return;
        }
        if(file.status === 'done') {
            const {max_length} = this.state;
            const fileList_state = this.state.fileList;
            // if(max_length&&fileList_state.length>=max_length.length) {
            //     return;
            // }
            let img = new Image();
            img.src = file.response.url;
            img.onerror=()=>{
                this.setState({
                    iserror: true,
                    loading: false
                })
            };
            img.onload=()=>{
                this.setState({
                    iserror: false,
                    fileList,
                    loading: false
                })
            };
            return;
        }
        if(file.status === "error") {
            this.setState({
                fileList,
                loading: false
            })
        }
        if(file.status === "removed") {
            this.setState({
                fileList
            })
        }
    }
    handleBeforeUpload(file) {
        //限制图片 格式、size、分辨率
        let {type} = this.state;
        if(type) {
            type=type.replace(/\s*/g,"");
            let type_arr = type.split(',');
            let flag = false;
            for(let i = 0; i < type_arr.length;i++) {
                if(file.type == `image/${type_arr[i]}`) return;
            }
            if(!flag) {
                message.error('只能上传JPG 、JPEG 、GIF、 PNG格式的图片~');
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
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('超过2M限制，不允许上传~');
            return;
        }
        return isLt2M && this.checkImageWH(file);
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

    render() {
        const { fileList, multiple, max_length } = this.state;
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        console.log(fileList)
        const props = {
            showUploadList: true,
            listType: 'picture-card',
            action: `${window.apiHost || 'http://localhost:9527'}/api/image`,
            accept: 'image/*',
            name: 'file',
            multiple: multiple,
            onChange: this.handleChange,
            onPreview: this.handlePreview,
            beforeUpload: this.handleBeforeUpload,
        };
        return <div>
            <Upload {...props}>
                {fileList.length >= max_length ? null : uploadButton}
            </Upload>
        </div>
    }
}

UploadPhoto.propTypes = {
    max_length: PropTypes.number,
    multiple: PropTypes.bool,
    type: PropTypes.string,
};

export default UploadPhoto;