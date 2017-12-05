'use strict';

let imageURL = 'https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg';
let invalidimageURL = '.thtt@gfjmhg4upload.wikimedia.org/wik&*ipedia/commons/3/36/Hopetoun_falls.jpg';

let jwtToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOjU5NywiaXNzIjoiaGFja2VyYmF5IiwiaWF0Ijox' +
    'NTEyNDE0MjQ3LCJzVG9rZW4iOiI2ZDI4NGQwYjVlYTZmMWZhMWViMGY4YmZiYTNlMWViZDVlYmQyYzk2NDIzYzAwZmQxZGQ2' +
    'NmE0MzlkNzU3YTJlNGZlOThhYzcwYzUyNDdjNGM1YWI5MDVmZDhiZmE5NTc1OGNiNjU0ZjcyMDc3YzA4ZDM5N2JjMWE0ZDA4ZG' +
    'EzMyIsImV4cCI6MTAwMDAwMDAwMDE1MTI0MTUwMDB9.I5dpck6XB5zvP7UgKxVJKeYjqZl-p51EILw5-XZjGnsdp5JjWY74U0Eq' +
    'd4afehKFjcmF-mqAXGlQYpYgPvCo8xftRGIR_yYOiMrVxfL6gCuF5sjAeiTRDEYw6RlPrN9bZkDohW02clycsYmGj_-tMf2-ogw9' +
    'I0yIMKC0DH7BFX4';

let JwtTokenEntity = {
    id: 597,
    token: jwtToken,
    is_active: true
};

module.exports = {
    imageURL,
    invalidimageURL,
    jwtToken,
    JwtTokenEntity
};
