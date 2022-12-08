

function getListings(num=10) {
    const modules = import.meta.glob('$lib/content/listings/*.json', { eager: true });
    const listings = Object.keys(modules).map((key) => {
        const filename = key.split('/').at(-1)?.split('.').at(0);
        const url = `/listings/${filename}`;
        return { ...modules[key], json_url: key, url };
    });
    return listings.slice(0,num)    
}


export {getListings}