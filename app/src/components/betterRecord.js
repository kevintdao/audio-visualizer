import { Button } from 'react-bootstrap';
import React, { useState, useRef } from 'react';
import '../firebase';
import {database, auth, storage} from '../firebase';
import {visalizerInitForRecord} from '../analyzer.js';
// import {listen, stop} from '../tensorflow.js';

export function Record(){
    let shouldStop = false;
    let stopped = false;
    let files = [];
    var uid = auth.currentUser.uid;
    let listItems;
    const getDownloadList = () => {
        var listRef = storage.child('users/' + uid);
        var num = 0;
        listRef.listAll()
            .then((res) => {
                // var key;
                // var val;
                res.prefixes.forEach((folderRef) =>{
                    // key = folderRef;
                    // console.log('folderRef: ' + folderRef);
                });
                res.items.forEach((itemRef) => {
                    itemRef.getDownloadURL()
                        .then((url)=> {
                            files.push(url);
                            // files.push({id: num, file:url});
                            // num = num + 1;
                        })
                        .catch((error)=> {
                            console.log('error with file');
                        });
                    // val = itemRef;
                    //console.log('itemRef: ' + itemRef);
                    //var gsRef = storage.refFromURL(itemRef);
                    // storage.child(itemRef).getDownloadURL()
                    //     .then((url) => {
                    //         files.push(url);
                    //     })
                    // files.push(gsRef);
                    //files.push(storage.refFromURL(itemRef));
                    // files.push(itemRef);
                });
            }).catch((error) => {
                console.log('error occured when fetching files');
            });  
            // console.log(files);
    };

    const stopButton = () => {
        shouldStop = true;

    };

    const getAudio = () => {
        shouldStop = false;
        stopped = false;
        const recordedChunks = [];
        const options = {mimeType: 'audio/webm'};
        navigator.mediaDevices.getUserMedia({audio:true, video: false}).then( stream => {
            const mediaRecorder = new MediaRecorder(stream, options);
            mediaRecorder.start(1000);
            mediaRecorder.ondataavailable = function(e) {
                if (e.data.size > 0) {
                    //console.log(e.data.size);
                    recordedChunks.push(e.data);
                  }
                if(shouldStop === true && stopped === false) {
                    mediaRecorder.stop();
                    stopped = true;
                }
            };
            mediaRecorder.addEventListener('stop', function() {
                const downloadLink = document.getElementById('download');
                var newObj = new Blob(recordedChunks);
                const url = URL.createObjectURL(newObj);
                downloadLink.href =  url;
                downloadLink.download = 'input-from-mic.wav';
                // console.log('hello');
                
                sessionStorage.setItem('file', url);
                var date = new Date();
                storage.child('users/' + uid  + '/input-from-mic' + date.getHours() + date.getMinutes() + date.getSeconds() + '.wav').put(newObj);
                getDownloadList();
                visalizerInitForRecord();

                window.downloadLinks = document.getElementById('downloadLinks');
                // console.log(files.length);
                for(let i = 0; i < files.length; i++)
                {
                    window.downloadLinks.appendChild(document.createElement("div"));
                    window.downloadLinks.childNodes[i].innerHTML = files[i];
                }
              });
          
            // mediaRecorder.start(1000);

    });
    }
    
    return (
        <>
                <Button id="start" onClick={getAudio} variant='success' style={{marginLeft: '10px', marginRight: '10px'}}>Start</Button>
                <Button id="stop" onClick={stopButton} variant='danger' style={{marginLeft: '10px', marginRight: '10px'}}>Stop</Button>
                {/* {files.map((id, file) => {
                    <li key={id} item={file}></li>
                })} */}


                {/* <div>

                {files.map((fil) => {
                    const { id, file} = fil;
                    return (
                        <div key={id}>
                            <a href={file}>{id}</a>
                        </div>
                    )
                })}
                </div> */}
        </>
    );

}