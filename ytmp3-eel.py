from __future__ import unicode_literals
import io
import eel
import youtube_dl

eel.init('web')

@eel.expose
def download_exec(url):
    if len(url)==0:
        return
    else:
        vid_info = youtube_dl.YoutubeDL().extract_info(url=url,download=False)
        
        fname = f"{vid_info['title']}.mp3"
        options= {'format':'bestaudio/best','keepvideo':False,'outtmpl':fname,'progress_hooks': [eel.progressBar]}
    
        with youtube_dl.YoutubeDL(options) as ydl:
            ydl.download([vid_info['webpage_url']])
            
@eel.expose
def fetch_exec(url):

    if len(url)==0:
        return
    else:
        vid_info = youtube_dl.YoutubeDL().extract_info(url=url,download=False)
        uploader=vid_info['uploader']
        title=vid_info['title']
        thumb=vid_info['thumbnails']
        url=thumb[len(thumb)-1]['url']
        duration = vid_info['duration']
        hrs = (duration//3600)
        mins= (duration - hrs * 3600)//60
        secs = duration - hrs * 3600 - mins * 60
        duration_str= '{} hrs: {} mins: {} secs'.format(hrs,mins,secs)
        obj = {'uploader':uploader , 'title':title,'image_url':url,'duration':duration_str}
        return obj
        
def my_hook(d):
    if d['status'] == 'finished':
        return
    if d['status'] == 'downloading':
        return 

eel.start('index.html',size=(1000,600))
            
            
