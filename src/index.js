import React, { Component } from "react";
import { render } from "react-dom";
import WebFont from "webfontloader";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./style.css";

class App extends Component {
  constructor() {
    super({});
    this.state = {
      scale: 1,
      name: "School Name Below"
    };
  }

  componentDidMount() {
    WebFont.load({
      google: {
        families: ["Roboto:400", "Product Sans", "Product Sans:400"]
      },
      fontactive: (familyName, fvd) => {
        this.drawImage();
        this.drawImageOld();
      }
    });
  }

  render() {
    return (
      <div className="main">
        <h1>DSC Lockup Generator</h1>
        <div style={hidden}>
          <img
            ref={e => {
              this.dscLogo = e;
            }}
            onLoad={() => {
              this.drawImage();
            }}
            src="dsc_icon-01.svg"
            alt={`DSC Icon`}
          />
        </div>
        <p>Start editing to see some magic happen :)</p>
        {this.renderScaleButton()}
        <TextField
          label="University"
          margin="normal"
          onChange={e => {
            this.setState(
              {
                name: e.target.value
              },
              () => {
                this.drawImage();
                this.drawImageOld();
              }
            );
          }}
        />
        <br />
        <canvas
          style={hidden}
          ref={e => {
            this.logoCanvas = e;
          }}
        />

        <div className="full-logo-container">
          <img
            ref={e => {
              this.fullLogoImg = e;
            }}
            alt={`DSC ${this.state.name} Logo`}
            src={this.state.fullLogoUrl}
          />
        </div>
        <div className="full-logo-container">
          <img
            ref={e => {
              this.fullLogoImg = e;
            }}
            alt={`DSC ${this.state.name} Logo`}
            src={this.state.fullLogoUrlOld}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          href={this.state.fullLogoUrl}
          download={`DSC ${this.state.name} Logo x${this.state.scale}.png`}
        >
          SAVE IMAGE
        </Button>
        {/* <footer>
          Made with{" "}
          <span role="img" aria-label="love">
            ❤️{" "}
          </span>{" "}
          by <a href="https://twitter.com/shanggyilim">@shanggyilim</a> •{" "}
          <a href="https://github.com/shangyilim/dsc-logo-generator">GitHub</a>
          &nbsp;• Modified also with{" "}
          <span role="img" aria-label="love">
            ❤️{" "}
          </span>
          by <a href="https://github.com/simonpham">@simonpham</a>.{" "}
          <a href="https://github.com/DSC-Ton-Duc-Thang-University/dsc-logo-generator">
            GitHub
          </a>
        </footer> */}
      </div>
    );
  }

  drawImage() {
    const name = this.state.name;
    const scale = this.state.scale;
    const ctx = this.logoCanvas.getContext("2d");
    ctx.font = `94px "Product Sans"`;

    const canvasWidth =
      ctx.measureText("Developer Student Clubs").width +
      this.dscLogo.width +
      80;
    const canvasHeight = this.dscLogo.height + 80;

    this.logoCanvas.setAttribute("width", canvasWidth * scale);
    this.logoCanvas.setAttribute("height", canvasHeight * scale);

    ctx.scale(scale, scale);
    ctx.fillStyle = "#000";
    ctx.font = `400 94px "Product Sans"`;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    // ctx.fillStyle = "rgba(0, 0, 0, 0.54)";
    ctx.fillStyle = "#fff";

    ctx.drawImage(this.dscLogo, 20, 0, this.dscLogo.width, this.dscLogo.height);

    ctx.fillText("Developer Student Clubs ", this.dscLogo.width + 40, 110);

    ctx.font = `400 64px "Product Sans"`;
    ctx.fillText(name, this.dscLogo.width + 45, 200);

    this.setState({
      fullLogoUrl: this.logoCanvas.toDataURL()
    });
  }

  drawImageOld() {
    const name = this.state.name;
    const scale = this.state.scale;
    const ctx = this.logoCanvas.getContext("2d");
    ctx.font = `94px "Product Sans"`;

    const canvasWidth =
      ctx.measureText("Developer Student Clubs").width +
      this.dscLogo.width +
      80;
    const canvasHeight = this.dscLogo.height + 80;

    this.logoCanvas.setAttribute("width", canvasWidth * scale);
    this.logoCanvas.setAttribute("height", canvasHeight * scale);

    ctx.scale(scale, scale);
    ctx.font = `400 94px "Product Sans"`;
    ctx.fillStyle = "rgba(0, 0, 0, 0.54)";

    ctx.drawImage(this.dscLogo, 20, 0, this.dscLogo.width, this.dscLogo.height);

    ctx.fillText("Developer Student Clubs ", this.dscLogo.width + 40, 110);

    ctx.font = `400 64px "Product Sans"`;
    ctx.fillText(name, this.dscLogo.width + 45, 200);

    this.setState({
      fullLogoUrlOld: this.logoCanvas.toDataURL()
    });
  }

  renderScaleButton() {
    return (
      <div className="scale-button">
        <button
          onClick={() =>
            this.setState(
              {
                scale:
                  this.state.scale > 1 ? this.state.scale - 1 : this.state.scale
              },
              () => {
                this.drawImage();
              }
            )
          }
        >
          -
        </button>
        <span>Scale</span>
        <button
          onClick={() =>
            this.setState(
              {
                scale:
                  this.state.scale < 5 ? this.state.scale + 1 : this.state.scale
              },
              () => {
                this.drawImage();
              }
            )
          }
        >
          +
        </button>
      </div>
    );
  }
}

const hidden = {
  display: "none"
};

render(<App />, document.getElementById("root"));
