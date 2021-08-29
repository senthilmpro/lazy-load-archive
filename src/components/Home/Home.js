import React, { useEffect, useState } from 'react';
import IdentifierList from '../IdentifierList/IdentifierList';
import ImageLoader from '../ImageLoader/ImageLoader';

const ITEM_LIST = [
    'pix0x-57d723e9',
    'pix0x-257ae802',
    '2021-8-16-pix0x-d84c36573d37'
]
const Home = () => {

  const [selectedList, setSelectedList ] = useState(ITEM_LIST[0]);

  const onSelectedListChange = (ev) => {
    console.log(ev.target.value)
    setSelectedList(ev.target.value);
  }

  const loadFirstSite = (data) => {
    setSelectedList(data[0]);
  }

  return (
    <section>
      <IdentifierList onChange={onSelectedListChange} loadFirstSite={loadFirstSite} />
      <div className="ImageGallery">
        <ImageLoader selectedIdentifier={selectedList} />
      </div>
    </section>
  );
};


export default Home;