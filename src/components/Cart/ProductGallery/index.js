import React, { PureComponent } from "react";
import { ReactComponent as BackwardIcon } from "../../../assets/backward.svg";
import { ReactComponent as ForwardIcon } from "../../../assets/forward.svg";
import "./ProductGallery.css";

export class ProductGallery extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { index: 0 };
    this.nextImage = this.nextImage.bind(this);
    this.previousImage = this.previousImage.bind(this);
  }

  nextImage() {
    const maxIndex = this.props.gallery.length - 1;
    if (this.state.index < maxIndex) {
      this.setState((state, props) => ({ index: state.index + 1 }));
    } else if (this.state.index === maxIndex) {
      // last image then reset to 0 index
      this.setState({ index: 0 });
    }
  }

  previousImage() {
    const maxIndex = this.props.gallery.length - 1;
    if (this.state.index > 0) {
      // reduce index backward
      this.setState((state, props) => ({ index: state.index - 1 }));
    } else if (this.state.index === 0) {
      // first image, start from end
      this.setState({ index: maxIndex });
    }
  }

  render() {
    const { gallery, controls, small, controlsOnHover, className } = this.props;
    return (
      <div className={`images-gallery ${className}`}>
        <img src={gallery[this.state.index]} alt="Product" loading="lazy" />
        {gallery.length > 1 && (controls || controlsOnHover) ? (
          <div
            className={`carousal-controls pos-bottom-right ${
              small && "smallSize"
            } ${controlsOnHover && "controlsVisibleOnHover"}`}
          >
            <BackwardIcon onClick={this.previousImage} />
            <ForwardIcon onClick={this.nextImage} />
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default ProductGallery;
