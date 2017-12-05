'use strict';

let jwtToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOjU5NywiaXNzIjoiaGFja2VyYmF5IiwiaWF0IjoxNTEy' +
    'NDE0MjQ3LCJzVG9rZW4iOiI2ZDI4NGQwYjVlYTZmMWZhMWViMGY4YmZiYTNlMWViZDVlYmQyYzk2NDIzYzAwZmQxZGQ2NmE0Mzlk' +
    'NzU3YTJlNGZlOThhYzcwYzUyNDdjNGM1YWI5MDVmZDhiZmE5NTc1OGNiNjU0ZjcyMDc3YzA4ZDM5N2JjMWE0ZDA4ZGEzMyIsImV4' +
    'cCI6MTAwMDAwMDAwMDE1MTI0MTUwMDB9.I5dpck6XB5zvP7UgKxVJKeYjqZl-p51EILw5-XZjGnsdp5JjWY74U0Eqd4afehKFjcmF' +
    '-mqAXGlQYpYgPvCo8xftRGIR_yYOiMrVxfL6gCuF5sjAeiTRDEYw6RlPrN9bZkDohW02clycsYmGj_-tMf2-ogw9I0yIMKC0DH7BFX4';

let jwtTokenData = {
    jti: 597,
    iss: 'hackerbay',
    iat: 1512414247,
    sToken: '6d284d0b5ea6f1fa1eb0f8bfba3e1ebd5ebd2c96423c00fd1dd66a439d757a2e4fe98ac70c5247c4c5ab905fd8b' +
    'fa95758cb654f72077c08d397bc1a4d08da33',
    exp: 10000000001512415000
};

let JwtTokenEntity = {
    id: jwtTokenData.jti,
    token: jwtToken,
    is_active: true
};

module.exports = {
    jwtToken,
    JwtTokenEntity
};
