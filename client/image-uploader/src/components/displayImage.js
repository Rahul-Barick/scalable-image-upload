import React, { Component } from "react";
import axios from "axios";

export default class DisplayImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      getURL: null,
    };
  }

  formHandler = (e) => {
    e.preventDefault();
    this.setState({ message: "Loading..." });
    const filename = document.querySelector("#filename").value;
    const generateGetUrl = "http://localhost:4500/render/image";
    const options = {
      params: {
        Key: filename,
        ContentType: "image/jpeg",
      },
    };
    axios.get(generateGetUrl, options).then((res) => {
      const { getSignedUrl } = res.data;

      this.setState({ getURL: getSignedUrl });
    });
  };

  handleImageLoaded = () => {
    this.setState({ message: "Done" });
  };

  handleImageError = () => {
    this.setState({
      message:
        "Sorry, something went wrong. Please check if the remote file exists.",
    });
  };

  render() {
    const { getURL, message } = this.state;
    return (
      <>
        <h1>Retrieve Image from AWS S3 Bucket</h1>
        <form onSubmit={this.formHandler}>
          <label> Image name:</label>
          <input id="filename" />
          <p>
            <i>Image name must include the extension, eg. cat.jpeg</i>
          </p>
          <button>Load</button>
        </form>
        <p>{message}</p>
        <div className="preview-container">
          {getURL && (
            <>
              <div className="preview">
                <img
                  id="show-picture"
                  src={getURL}
                  alt="File stored in AWS S3"
                  onLoad={this.handleImageLoaded}
                  onError={this.handleImageError}
                />
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}
