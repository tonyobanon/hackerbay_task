'use strict';

let loginResponse = {
    jwt_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOjY5MCwiaXNzIjoiaGFja2VyYmF5IiwiaWF0IjoxNTE' +
    'yMzQwMDQ3LCJzVG9rZW4iOiI2ZDI4NGQwYjVlYTZmMWZhMWViMGY4YmZiYTNlMWViZDVlYmQyYzk2NDIzYzAwZmQxZGQ2NmE0Mzl' +
    'kNzU3YTJlNGZlOThhYzcwYzUyNDdjNGM1YWI5MDVmZDhiZmE5NTc1OGNiNjU0ZjcyMDc3YzA4ZDM5N2JjMWE0ZDA4ZGEzMyIsImV4' +
    'cCI6MTUxMjQyNjQ0N30.SZDoKtc5gD63qAiFF8QupvGmz8qgsNO1AONwTYFIZSbvYlSYesykj_DP5YperaYrQSlOmqQEjZITlSDk' +
    'cjYP8_vf5X4NzsDHhTnys1W276oQ4Li8rpe9mjTZEF4OqdlPldOeqvlVBGoo7zBSPHVe-44oMZeJ-QHz5KqbPfwsr9o',
    timestamp: 1512340047055
};

let logoutResponse = {
    timestamp: 1512339699514
};

let jwtToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOjU5NywiaXNzIjoiaGFja2VyYmF5IiwiaWF0IjoxNTEy' +
    'NDE0MjQ3LCJzVG9rZW4iOiI2ZDI4NGQwYjVlYTZmMWZhMWViMGY4YmZiYTNlMWViZDVlYmQyYzk2NDIzYzAwZmQxZGQ2NmE0MzlkNz' +
    'U3YTJlNGZlOThhYzcwYzUyNDdjNGM1YWI5MDVmZDhiZmE5NTc1OGNiNjU0ZjcyMDc3YzA4ZDM5N2JjMWE0ZDA4ZGEzMyIsImV4cCI6M' +
    'TAwMDAwMDAwMDE1MTI0MTUwMDB9.I5dpck6XB5zvP7UgKxVJKeYjqZl-p51EILw5-XZjGnsdp5JjWY74U0Eqd4afehKFjcmF-mqAXGl' +
    'QYpYgPvCo8xftRGIR_yYOiMrVxfL6gCuF5sjAeiTRDEYw6RlPrN9bZkDohW02clycsYmGj_-tMf2-ogw9I0yIMKC0DH7BFX4';

let JwtTokenEntity = {
    id: 597,
    token: jwtToken,
    is_active: true
};

module.exports = {
    loginResponse,
    logoutResponse,
    jwtToken,
    JwtTokenEntity
};
