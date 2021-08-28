
const getArchiveUrl = (itemId) => {
    return `https://archive.org/metadata/${itemId}`
}

const getIdentifierCreator = (creator) => {
    return `https://archive.org/advancedsearch.php?q=creator%3Apix0x&fl%5B%5D=identifier&sort%5B%5D=publicdate+desc&sort%5B%5D=&sort%5B%5D=&rows=50&page=1&output=json&callback=callback&save=yes`;
}

const parseArchiveData = (data) => {
    if(!data) return null;
    const {files, metadata, server, dir} = data;
    const sourceFiles = files.filter(x => x.source == "original");
    const thumbs = files.map(x => x.source === "derivative" && x.format === "Thumbnail");
    return {
        metadata,
        sourceFiles,
        thumbs,
        server, 
        dir
    }
}

const ArchiveHelper = {
    getArchiveUrl,
    parseArchiveData,
    getIdentifierCreator
}

export default ArchiveHelper;