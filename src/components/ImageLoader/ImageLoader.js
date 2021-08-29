import React, { useEffect, useState } from 'react';
import ImageRenderer from '../../ImageRenderer';
import ArchiveHelper from "../../services/archive-helper";
import HttpUtil from "../../services/http-util";






const ImageLoader = ({selectedIdentifier}) => {
    const [data, setData] = useState(null);
    const [images, setImages] = useState(null);
    const [imageFiles, setImageFiles] = useState(null);

    const getData = async () => {
        const itemId = selectedIdentifier;
        const url  = ArchiveHelper.getArchiveUrl(itemId);
        const data = await HttpUtil.getImagesData(url);
        const sourceData = ArchiveHelper.parseArchiveData(data);
        
        const {sourceFiles, dir, server} = sourceData;
        let imgArray = sourceFiles.filter(x => x.format == "JPEG");
        let imgs = imgArray.map(x => ({
            img: `https://i0.wp.com/${server}/${dir}/${x.name}`,
            thumb: `https://i0.wp.com/${server}/${dir}/${x.name}?w=320`
        }));
        console.log(imgs);
        setImageFiles(imgs);
        //console.log(images);
        console.log(sourceFiles);

        setData(data);
    }

    useEffect(() => {
        getData();
    }, [selectedIdentifier]);

    return imageFiles && imageFiles.map(x => 
        <ImageRenderer
        key={x.img}
        url={x.img}
        thumb={x.thumb}
        width={640}
        height={480}
      />
    )
        
    ;
}

export default ImageLoader;