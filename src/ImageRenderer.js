import React, { useState, useRef } from 'react';
import classnames from 'classnames';
import { useIntersection } from './intersectionObserver';
import './imageRenderer.scss';

const ImageRenderer = ({ url, thumb, width, height }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();
  useIntersection(imgRef, () => {
    setIsInView(true);
  });

  const handleOnLoad = () => {
    setIsLoaded(true);
  };
  return (
    <div
      className="image-container"
      ref={imgRef}
      style={{
        paddingBottom: `10px`,
        minHeight: '240px'       
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
          />
          </a>
        </>
      )}
    </div>
  );
};

export default ImageRenderer;
