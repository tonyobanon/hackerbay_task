'use strict';

let jsonPatchResponse = {
    name: 'Tony',
    age: '22',
    profession: 'programmer'
};

let originalJson = {
    name: 'Tony',
    age: '22'
};

let pathJson = [{op: 'add', path: '/profession', value: 'programmer'}];

let jwtToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOjU5NywiaXNzIjoiaGFja2VyYmF5IiwiaWF0IjoxNTEyNDE0' +
    'MjQ3LCJzVG9rZW4iOiI2ZDI4NGQwYjVlYTZmMWZhMWViMGY4YmZiYTNlMWViZDVlYmQyYzk2NDIzYzAwZmQxZGQ2NmE0MzlkNzU3YTJl' +
    'NGZlOThhYzcwYzUyNDdjNGM1YWI5MDVmZDhiZmE5NTc1OGNiNjU0ZjcyMDc3YzA4ZDM5N2JjMWE0ZDA4ZGEzMyIsImV4cCI6MTAwMDAw' +
    'MDAwMDE1MTI0MTUwMDB9.I5dpck6XB5zvP7UgKxVJKeYjqZl-p51EILw5-XZjGnsdp5JjWY74U0Eqd4afehKFjcmF-mqAXGlQYpYgPvC' +
    'o8xftRGIR_yYOiMrVxfL6gCuF5sjAeiTRDEYw6RlPrN9bZkDohW02clycsYmGj_-tMf2-ogw9I0yIMKC0DH7BFX4';

let JwtTokenEntity = {
    id: 597,
    token: jwtToken,
    is_active: true
};

module.exports = {
    jsonPatchResponse,
    originalJson,
    pathJson,
    jwtToken,
    JwtTokenEntity
};
