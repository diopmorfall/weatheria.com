//todo: useful functions like querybuilder, fetch, string or time formatting

export function urlBuilder(url, query) { // function that builds the API url
    return url + query;
}

export function debounceFunction(func, delay){
    let timeout;
    return function(...args){
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
}