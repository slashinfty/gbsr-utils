function convert(t) {
  const framerate = [
    {platform: 'nesSnes', rate: 60.09881387708959},
    {platform: 'gb', rate: 59.72750056960583},
    {platform: 'sgbNtsc', rate: 61.17},
    {platform: 'sgbPal', rate: 60.60138},
    {platform: 'threeDsvc', rate: 59.82824309},
    {platform: 'vba', rate: 60}
  ];
  let timeToMS = time => {
    let a = time.split(':').reverse();
    let ms = parseFloat(a[0]) * 1e3;
    if (a.length > 1) ms += parseInt(a[1]) * 6e4;
    if (a.length > 2) ms += parseInt(a[2]) * 36e5;
    return ms;
  }
  let msToTime = time => {
    let hr = Math.floor(time / 36e5 % 24);
    let min = Math.floor(time / 6e4 % 60);
    min = min > 10 ? min + ':' : min === 0 ? '' : '0' + min + ':';
    let sec = Math.floor(time / 1e3 % 60);
    sec = sec < 10 ? '0' + sec : sec;
    let ms = Math.trunc(time % 1e3);
    hr = hr === 0 ? '' : hr + ':';
    ms = ms == 0 ? '' : '.' + ms;
    return hr + min + sec + ms;
  }
  let sourceRate = framerate.find(el => el.platform === $('#source-platform').val()).rate;
  let destinationRate = framerate.find(el => el.platform === $('#destination-platform').val()).rate;
  let sourceMS = timeToMS($('#source-time').val());
  let destinationTime = msToTime(sourceMS * sourceRate / destinationRate);
  $('#destination-time').val(destinationTime);
}

$(document).ready(() => {
  $('#source-time').keyup(() => { 
    let entry = $('#source-time').val();
    if (/[^0-9:\.]/g.test(entry)) $('#source-time').val(entry.replace(/[^0-9:\.]/g, ''));
    else if (entry === undefined || entry === null || entry === '' || entry.endsWith('.') || entry.endsWith(':')) $('#destination-time').val('');
    else convert(entry);
  });
});