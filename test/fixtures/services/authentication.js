'use strict';

let sessionToken = '6d284d0b5ea6f1fa1eb0f8bfba3e1ebd5ebd2c96423c00fd1dd66a439d757a2e4fe98ac70c5247c4c5ab905' +
    'fd8bfa95758cb654f72077c08d397bc1a4d08da33';

let sessionTokenEntity = {id: 380, session_token: '6d284d0b5ea6f1fa1eb0f8bfba3e1ebd5ebd2c96423c00fd1dd66a439' +
'd757a2e4fe98ac70c5247c4c5ab905fd8bfa95758cb654f72077c08d397bc1a4d08da33'};

let jwtToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOjExODYsImlzcyI6ImhhY2tlcmJheSIsImlhdCI6MTUx' +
    'MjMzOTY3NSwic1Rva2VuIjoiNmQyODRkMGI1ZWE2ZjFmYTFlYjBmOGJmYmEzZTFlYmQ1ZWJkMmM5NjQyM2MwMGZkMWRkNjZhNDM5' +
    'ZDc1N2EyZTRmZTk4YWM3MGM1MjQ3YzRjNWFiOTA1ZmQ4YmZhOTU3NThjYjY1NGY3MjA3N2MwOGQzOTdiYzFhNGQwOGRhMzMiLCJl' +
    'eHAiOjE1MTI0MjYwNzV9.jyMYIo8MpHJpRF9a1WHjq9oh0uDLrgckaginYdJIL_ZD1VeRGhGzeTW7a0ggCWOVKNK3TJjuwuxbs9e' +
    'DhrEtOq1LP1rQZmt0UnppbA_E9_nKZa1R_YRelZ28Y4NhCCJk7NnmG3VXi-P4wuQSHwILmSo_d5FU0gNyzlIcPoin_wU';

let invalidJwtToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdHkiOjc0NCwiaXNzIjoiaGFja2VyYmF5IiwiaWF0Ij' +
    'oxNTEyMzYzMDQzLCJzVG9rZW4iOiI2ZDI4NGQwYjVlYTZmMWZhMWViMGY4YmZiYTNlMWViZDVlYmQyYzk2NDIzYzAwZmQxZGQ2NmE0' +
    'MzlkNzU3YTJlNGZlOThhYzcwYzUyNDdjNGM1YWI5MDVmZDhiZmE5NTc1OGNiNjU0ZjcyMDc3YzA4ZDM5N2JjMWE0ZDA4ZGEzMyIsIm' +
    'V4cCI6MTUxMjQ0OTQ0M30.NcqAF8V2EJ44HBoDVvkSzPgkVg92O-NEvpQm3bYxgyOW7bl7DUsnt84bZ1QvMQVGJsIgyK6G6y19-hqDG_' +
    'FcdfD5Sv6ilM7pzfT5CURJNSJn_5YIlR-Iac2nAIjPv6rVKAyfp53oiPHJVk_qPPCTCVRRXfHXYM8q2u65bqGTa0I';

let jwtTokenData = {jti:380,iss:'hackerbay',sToken:'6d284d0b5ea6f1fa1eb0f8bfba3e1ebd5ebd2c96423c00fd1dd66a439d75' +
'7a2e4fe98ac70c5247c4c5ab905fd8bfa95758cb654f72077c08d397bc1a4d08da33'};

let JwtTokenEntity = {
    id: 960,
    token: jwtToken,
    is_active: true
};

let expiredJwtTokenEntity = {
    id: 960,
    token: jwtToken,
    is_active: false
};

module.exports = {
    sessionToken,
    sessionTokenEntity,
    jwtToken,
    invalidJwtToken,
    jwtTokenData,
    JwtTokenEntity,
    expiredJwtTokenEntity
};
