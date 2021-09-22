import React, { useState, useRef } from 'react';
import classnames from 'classnames';
import { useIntersection } from './intersectionObserver';
import './imageRenderer.scss';
import axios from 'axios';

const ImageRenderer = ({ url, thumb, width, height, onImgError }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [showImage, setShowImage] = useState("inherit");
  const imgRef = useRef();
  useIntersection(imgRef, () => {
    setIsInView(true);
  });

  const onError = () => {
    setShowImage("none");
  }

  const handleOnLoad = () => {
    setIsLoaded(true);
  };

  const copyImageToClipboard = async (ev, url) => {
    ev.preventDefault();

    async function toDataURLAxios(url) {
      return axios.get(url, {
          responseType: 'arraybuffer'
        })
        .then(response => response.data).then(data => {
            let blob = new Blob([data]);
            return blob
        }).then(blob => {
          return URL.createObjectURL(blob);
      });
  }

    const img = new Image
    const c = document.createElement('canvas')
    const ctx = c.getContext('2d')


    function setCanvasImage(path, func) {
      img.onload = function () {
        c.width = this.naturalWidth
        c.height = this.naturalHeight
        ctx.drawImage(this, 0, 0)
        c.toBlob(blob => {
          func(blob)
        }, 'image/png')
      }
      img.src = path

      console.log(img);
    }

    await toDataURLAxios(url).then(path => {
      setCanvasImage(path, (imgBlob) => {
        console.log('doing it!')
        navigator.clipboard.write(
          [
            new ClipboardItem({ 'image/png': imgBlob })
          ]
        )
          .then(e => { console.log('Image copied to clipboard') })
          .catch(e => { console.log(e) })
      })
    });
  }

  return (
    <div
      className="image-container"
      ref={imgRef}
      style={{
        paddingBottom: `10px`,
        minHeight: '240px',
        display: showImage
      }}
    >
      {isInView && (
        <>
          <a href={url} target={"_blank"} rel="noopener noreferrer" >
            <img
              className={classnames('image', 'thumb', {
                ['isLoaded']: !!isLoaded
              })}
              src={thumb}
            />
            <img
              className={classnames('image', {
                ['isLoaded']: !!isLoaded
              })}
              src={thumb}
              onLoad={handleOnLoad}
              onError={onError}
            />
            </a>
            <button onClick={(ev) => copyImageToClipboard(ev,url)} className={"btn-standard"} >Copy Image</button>
        </>
      )}
    </div>
  );
};

export default ImageRenderer;
