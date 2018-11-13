import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendMessage } from '../../store/Actions/message'
import { updateLastChatUser } from '../../store/Actions/user'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add(faImage)
class MessageInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            listImages: [],
            previewImage: [],
        }
    }
    onChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value,
        })
    }
    onHandleChooseImage = (e) => {
        let image = e.target.files[0];

        let reader = new FileReader()
        reader.onloadend = () => {
            if (image) {
                this.setState({
                    previewImage: [...this.state.previewImage, reader.result],
                    listImages: [...this.state.listImages, image],
                })
            }
        }
        reader.readAsDataURL(image);
        e.target.value = null;
    }
    onHanleKey = (e) => {
        if (e.keyCode === 13) {
            this.onSubmit(e);
        }
        if (e.keyCode === 16 && e.keyCode === 13) {
            let str = this.state.message + '\n';
            this.setState({ message: str });
        }
    }
    onSubmit = (e) => {
        e.preventDefault();
        const idSender = this.props.auth.uid;
        const idReceiver = this.props.idReceiver;
        const idMessage = (idSender < idReceiver) ? (idSender + idReceiver) : (idReceiver + idSender);
        if (this.state.message !== '' || this.state.listImages.length !== 0) {
            const item = {
                message: this.state.message,
                idSender: idSender,
                idReceiver: idReceiver,
                idMessage: idMessage,
                time: Date.now(),
                listImgs: this.state.listImages,
            }
            const id = {
                idSender: idSender,
                idReceiver: idReceiver,
            }
            // console.log(item);
            this.props.sendMessage(item);
            this.props.updateLastChatUser(id);
            this.setState({
                message: '',
                listImages: [],
                previewImage: [],
            })
            e.target.value = null;
        }

    }
    onDelete = (index) => {
        let preImgs = this.state.previewImage;
        preImgs.splice(index, 1);
        let listImgs = this.state.listImages;
        listImgs.splice(index, 1);
        this.setState({
            previewImage: preImgs,
            listImages: listImgs,
        })
        console.log(this.state.listImages);
    }
    render() {

        // console.log(this.state.previewImage);
        // console.log(this.state.listImages);
        let listPreviewImgs = this.state.previewImage;
        let listPreImgs = null;
        if (listPreviewImgs.length > 0) {
            listPreImgs = listPreviewImgs.map((preImg, index) => {
                return (
                    <div key={index} className="previewImages">
                        <div className="Image">
                            <button onClick={() => this.onDelete(index)} style={{ color: "red" }}>x</button>
                            <img src={preImg} />
                        </div>
                    </div>

                )
            })
        }
        return (
            <div className="chat-message clearfix">
                <textarea name="message" value={this.state.message} onChange={this.onChange} onKeyDown={this.onHanleKey} id="message-to-send" placeholder="Type your message" rows="3"></textarea>
                <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
                {/* <i className="fa fa-file-image-o"></i> */}

                <div className="uploadImage" >
                    <label htmlFor="file">
                        <FontAwesomeIcon icon="image" size="2x" />
                    </label>
                    <input type="file" id="file" accept="image/*" ref="fileUploader" onChange={(e) => this.onHandleChooseImage(e)} />
                </div>
                {listPreImgs}
                <button onClick={this.onSubmit} >Send</button>

            </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (message) => dispatch(sendMessage(message)),
        updateLastChatUser: (id) => dispatch(updateLastChatUser(id))
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageInput);