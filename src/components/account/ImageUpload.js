import React, { Component } from "react";
import {Image} from "react-bootstrap";

export default class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: ''
        };
        this._handleImageChange = this._handleImageChange.bind(this);
        ImageUpload._handleSubmit = ImageUpload._handleSubmit.bind(this);
    }

    static _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
            this.props.callbackFromParent(this.state.file);
        };

        reader.readAsDataURL(file)
    }

    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<Image src={imagePreviewUrl} responsive alt={'../../static/images.png'}/>);
        }

        return (
            <div>
                <form onSubmit={ImageUpload._handleSubmit}>
                    <input type="file" onChange={this._handleImageChange} />
                </form>
                {$imagePreview}
            </div>
        )
    }
}