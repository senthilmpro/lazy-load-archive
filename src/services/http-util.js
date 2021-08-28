import axios from 'axios';

const parseImages = (data) => {

}   

const getImagesData = async (url) => {
    const response = await axios.get(url);
    const data = await response.data;
    return data;
}

const getIdentifierData = async () => {
    let url = `https://archive.org/advancedsearch.php?q=creator%3Apix0x&fl%5B%5D=identifier&sort%5B%5D=publicdate+desc&sort%5B%5D=&sort%5B%5D=&rows=50&page=1&output=json&save=yes`;
    const response = await axios.get(url);
    const data = await response.data;
    return data.response.docs.map(x => x.identifier);
}



const HttpUtil = {
    getImagesData,
    getIdentifierData
}

export default HttpUtil;