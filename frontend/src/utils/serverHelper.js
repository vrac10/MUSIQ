async function makeUnauthenticatedPostRequest(route,body) {
    const response = await fetch("http://localhost:8000/" + route, {
        method : "POST",
        headers : {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(body),
    });
    const formattedResponse = await response.json();
    return formattedResponse;
};

async function makeUnauthenticatedGetRequest(route,body) {
    const response = await fetch("http://localhost:8000/" + route, {
        method : "GET",
        headers : {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(body),
    });
    const formattedResponse = await response.json();
    return formattedResponse;
};


export {makeUnauthenticatedPostRequest,makeUnauthenticatedGetRequest};