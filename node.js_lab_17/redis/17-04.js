const redis = require('redis');

const client = redis.createClient('//redis-19054.c240.us-east-1-3.ec2.cloud.redislabs.com:19054', {password: 'ycDnhfFGO0wMKwPnx5nmUR1rzdBLn1ke'});

client.on('connect', () => {
    console.log('Connected to ilyaistomin_db/redis');
})
client.on('ready', () => {
    console.log('ready to go');
})
client.on('error', (e) => {
    console.log(`error: ${e.message}`);
})

client.on('end', () => {
    console.log('end');
})

console.time('first_time');
for (let i = 0; i < 10000; i++){
    client.hset(`${i}`,`value`,`val-${i}`);
}
console.timeEnd('first_time');


console.time('second_time');
for (let i = 0; i < 10000; i++){
    client.hget(`${i}`,'value',(err, result) => {console.log(`${i}: error: ${err}, result:${result}`)});
}
console.timeEnd('second_time');
client.quit();
