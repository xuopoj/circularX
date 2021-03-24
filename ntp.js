console.log('-------splitter---------')
console.log(`-----${new Date()}------`);


const taobaoTimeApi = 'http://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp';

let eight = new Date();
eight.setHours(8);
eight.setMinutes(0);
eight.setSeconds(0);
eight.setMilliseconds(0);

const eightInEpoch = eight.getTime();


const TIME_TO_WAIT = 12000;
const OFFSET = 80;


function millisecondsToHumanReadable(milliseconds){
  let minites = Math.floor(milliseconds/1000/60);
  let remain = milliseconds - minites * 60 * 1000;
  let seconds = Math.floor(remain / 1000);
  let millis = remain - seconds * 1000;
  if(minites){
    return `${minites}m ${seconds}s ${millis}ms`;
  }else if(seconds){
    return `${seconds}s ${millis}ms`;
  }
  return `${millis}ms`;
}

function late(humanReadable){
  console.log(`its ${humanReadable}, you're late. Any way, good luck to you!`);
  console.log('\n');
  $done({});
}

function early(now, eightInEpoch, humanReadable){
  let timeToEight = eightInEpoch - now;

  const countdown = millisecondsToHumanReadable(timeToEight);
  console.log(`its ${humanReadable}, ${countdown} to 8, try it later`);
  let randomWait = 5 + Math.random() * 5;
  console.log(`let's try to wait for ${randomWait}s`)
  console.log('\n');
  setTimeout(()=>{
    $done({});
  }, randomWait*1000)
}

function timeForBig(now, eightInEpoch, humanReadable){
  const timeToWait = eightInEpoch - now - OFFSET;

  const countdown = millisecondsToHumanReadable(timeToWait);
  console.log(`its ${humanReadable}, ${countdown} to 8, let's wait`);
  setTimeout(()=>{
    console.log("OK, time's up, let's do it!");
    console.log('\n');
    $done({});
  }, timeToWait);
}

$task.fetch({
  url: taobaoTimeApi,
}).then(response => {
  let json = JSON.parse(response.body);
  try{
    const now = parseInt(json.data.t);
    const humanReadable = new Date(now);

    if(now > eightInEpoch){
      late(humanReadable);
    } else if(now + TIME_TO_WAIT < eightInEpoch){
      early(now, eightInEpoch, humanReadable);
    } else {
      timeForBig(now, eightInEpoch, humanReadable);
    }
  } catch(e){
      console.log('---a error occurred, process as it is')
      $done({});
  }

}, reason => {
  console.log(`error occured: ${reason}`)
  $done();
  // reason.error
});
