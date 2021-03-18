console.log('----------------splitter----------------------------')

const taobaoTimeApi = 'http://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp';

let eight = new Date();
eight.setHours(8);
eight.setMinutes(0);
eight.setSeconds(0);
eight.setMilliseconds(0);

const eightInEpoch = eight.getTime();


const TIME_TO_WAIT = 30000;
const OFFSET = 60;

fetch(taobaoTimeApi).then(resp=>{
  return resp.json();
}).then(json=>{
  const now = json.data.t;
  if(now > eightInEpoch){
    console.log(`its ${new Date(now)}, you're late. Any way, good luck to you!`);
    $done({});
    console.log('----------no delay--------------')
    console.log('\n');
  } else if(now + TIME_TO_WAIT < eightInEpoch){
    console.log(`its ${new Date(now)}, to early, try it later`);
    $done({});
    console.log('----------try it later--------------')
    console.log('\n');
  } else {
      const timeToWait = eightInEpoch - now - OFFSET;
      console.log(`its ${new Date(now)}, ${timeToWait} millis to 8`);
      setTimeout(()=>{
        console.log(`OK, time's up, let's do it!`);
        $done({});
        console.log("--------------LET'S DO IT!------------");

      }, timeToWait);
  }
})