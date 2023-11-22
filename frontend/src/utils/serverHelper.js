const  local = "http://localhost:8000/"
const Site = "https://musiq-api.onrender.com/"

async function makeUnauthenticatedPostRequest(route,body) {
    const response = await fetch(Site + route, {
        method : "POST",
        headers : {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(body),
    });
    const formattedResponse = await response.json();
    return formattedResponse;
};

async function makeUnauthenticatedGetRequest(route) {
    const response = await fetch(Site+ route, {
        method : "GET"
    });
    const formattedResponse = await response.json();
    return formattedResponse;
};


async function makeAuthenticatedGetRequest(route) {
    var token = getToken();
    const response = await fetch(Site + route, {
        method : "GET",
        headers : {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    });
    const formattedResponse = await response.json();
    return formattedResponse;
};

async function makeAuthenticatedPostRequest(route,body) {
    var token = getToken();
    const response = await fetch(Site + route, {
        method : "POST",
        headers : {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body : JSON.stringify(body),
    });
    const formattedResponse = await response.json();
    return formattedResponse;
};


async function makeFrontPageRequest(){
    const response = await fetch(Site + "playlist/get/frontPage", {
        method : 'GET',
        headers : {
            "Content-Type": "application/json",
        },
    });
    const formattedResponse = await response.json();
    return formattedResponse;
}

const getToken = () => {
    const accessToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    return accessToken;
};

export {makeUnauthenticatedPostRequest,makeUnauthenticatedGetRequest, makeAuthenticatedGetRequest, makeAuthenticatedPostRequest, makeFrontPageRequest};