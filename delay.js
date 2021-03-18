
// 20 milliseconds to 8
var OFFSET = 20; 

var now = new Date();

var eight = new Date();
eight.setHours(8);
eight.setMinutes(0);
eight.setSeconds(0);
eight.setMilliseconds(0);

console.log('now: ' + now + ', milliseconds: ' + now.getMilliseconds());

console.log('wait until: ' + eight + ', milliseconds: ' + eight.getMilliseconds());

var delay = eight - now - OFFSET;

if(delay <=0){
    console.log('no delay')
    $done({});
}else{
    setTimeout(function(){
        console.log('delay for '+ delay +' milliseconds')
        $done({});
    }, delay)
}