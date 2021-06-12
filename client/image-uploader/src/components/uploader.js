import React, { Component } from "react";
import axios from "axios";

export default class Uploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      file: null,
    };
  }

  getImage = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      this.setState({ file });
    }
  };

  uploadFile = async (event) => {
    event.preventDefault();

    const { file } = this.state;
    this.setState({ message: "Uploading..." });
    const contentType = file.type; // eg. image/jpeg or image/svg+xml

    const generatePutSignUrl = "http://localhost:4500/api/upload";
    const options = {
      params: {
        Key: file.name,
        ContentType: contentType,
      },
      headers: {
        "Content-Type": contentType,
      },
    };

    const uploadConfig = await axios.get(generatePutSignUrl, options);

    await axios.put(uploadConfig.data.url, file, {
      headers: {
        "Content-Type": file.type,
      },
    });
  };

  render() {
    return (
      <>
        <h1>Upload an image to AWS S3 bucket</h1>
        <input
          id="upload-image"
          type="file"
          accept="image/*"
          onChange={this.getImage}
        />
        <p>{this.state.message}</p>
        <form onSubmit={this.uploadFile}>
          <button id="file-upload-button">Upload</button>
        </form>
      </>
    );
  }
}
