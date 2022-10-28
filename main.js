const href = window.location.href;
const storage = window.localStorage;
const queryString = window.location.search;
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

if (queryString) {
    const urlParams = new URLSearchParams(queryString);
    const shortLink = urlParams.get("l");
    if (shortLink !== null){
        const value = storage.getItem(shortLink);
        if (value) {
            window.location.replace(value);
        } else {
            alert(`${shortLink} was not found`);
        }
    }
}

function makeid(length) {
    let result = '';
    for (let i=0; i<length; i++)
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    return result;
}

function isValidHttpUrl(string) {
    try {
        const url = new URL(string);
        return url.protocol === "http:" || url.protocol === "https:";
    } catch (_) {
        return false;
    }
}

function createShortLink(){
    const value = document.getElementsByTagName("input")[0].value;
    if (isValidHttpUrl(value)) {
        const key = makeid(5);
        storage.setItem(key, value);
        const fullLink = `${href}?l=${key}`;
        document.getElementsByTagName("code")[0].innerText = fullLink;
        navigator.clipboard.writeText(fullLink);
    }
}

document.addEventListener("keyup", function(event) {
    if (event.code === "Enter") 
        createShortLink();
});
