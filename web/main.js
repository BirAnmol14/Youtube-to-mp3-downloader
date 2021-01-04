metadata = {uploader:'',title:'',image_url:'',duration:''}

async function download() {
  var data = document.getElementById("data").value
  show(document.getElementById('progressbar'));
  await eel.download_exec(data)()
  reset()
}

async function fetchInfo() {
  var data = document.getElementById("data").value
  if(data.length===0 || data===''){
	reset()
	return
  }
  var ret= await eel.fetch_exec(data)()
  metadata = await ret
  
  hide(document.getElementById('load'))
  show(document.getElementById('store'))
  show(document.getElementById('album'))

  document.getElementById('title').innerHTML=metadata.title
  document.getElementById('uploader').innerHTML=metadata.uploader
  document.getElementById('duration').innerHTML=metadata.duration
  document.getElementById('art').src=metadata.image_url
}

function reset(){
	metadata={uploader:'',title:'',image_url:'',duration:''}
	document.getElementById('data').value=''; 
	hide(document.getElementById('album'));
    hide(document.getElementById('store'));
    show(document.getElementById('load'));
}

function hide(elem){
elem.style.display="none";
}

function show(elem){
elem.style.display="block";
}

eel.expose(progressBar);
function progressBar(data){
	document.getElementById('currprog').style.width=data._percent_str;
	document.getElementById('description').innerHTML=data.status+": "+data._percent_str+" of "+data._total_bytes_str;
	document.getElementById('speed').innerHTML="Current Download Speed: "+data._speed_str;
	document.getElementById('eta').innerHTML="Estimated Time remaining: "+data._eta_str;
}
