import React, { useState, useRef } from 'react';
import classnames from 'classnames';
import { useIntersection } from './intersectionObserver';
import './imageRenderer.scss';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faDownload, faSitemap, faImages } from '@fortawesome/free-solid-svg-icons'



const ImageRenderer = ({ url, thumb, width, height, onImgError, original }) => {
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

  const copyImageBBToClipboard = async (ev, url) => {
    ev.preventDefault();
    let text = `[IMG]${url}[/IMG]`
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  }

  const downloadImage = async (ev,url) => {
    ev.preventDefault();
    console.log("origina ", url);
    let filename = url.split('/').pop();

    downloadBlob(url, filename);

    function downloadBlob(url, filename) {
      const a = document.createElement("a");
      a.href = url;
      a.download = filename || "download";
      const onClick = (ev) => {
        //ev.preventDefault();
        URL.revokeObjectURL(url);
        this.removeEventListener("click", onClick);
      };
      a.addEventListener("click", onClick, false);
      a.click();
      return a;
    }
  }


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
          <div className="button-list">
            <button onClick={(ev) => copyImageToClipboard(ev, url)} className={"btn-standard"} ><FontAwesomeIcon icon={faCopy} /></button>
            <button onClick={(ev) => downloadImage(ev, original)} className={"btn-standard"} ><FontAwesomeIcon icon={faDownload} /></button>
            <button onClick={(ev) => copyImageBBToClipboard(ev, url)} className={"btn-standard"} ><FontAwesomeIcon icon={faSitemap} /></button>
          </div>

        </>
      )}
    </div>
  );
};

export default ImageRenderer;
