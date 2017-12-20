var moment = require('moment');
var date = moment("20171218", "YYYYMMDD").fromNow();
var createdAt = 1234;
var date = moment(createdAt);

console.log(date.format('h:mm a'));
