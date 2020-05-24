// write a func to retrieve a blob of json
// make an ajax request, using the 'fetch' function
// https://rallycoding.herokuapp.com/api/music_albums

// 1) .then() and promises style
// function fetchAlbums(){
//     fetch('https://rallycoding.herokuapp.com/api/music_albums')
//     // fetch returns a promise as a return object
//     .then(res => res.json())
//     // res.json() to get the json data in res, but it returns a promise too
//     .then(json => console.log(json));
//     // .then() called if request is successful w/ the value returned from the async request
// }

// 2) aync await, no promises style
// async function fetchAlbums(){
//     const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums')
//     const json = await res.json()
//     console.log(json);
// }
// identify function that deals w/ async op or promise and put down 'async' kw
// put 'await' kw in front of any statement producing promise
// in front of await assign response to some variable

// 3) no 'async function' declaration but error function 
const fetchAlbums = async() =>{
    const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums')
    const json = await res.json()
    console.log(json);
}

fetchAlbums();