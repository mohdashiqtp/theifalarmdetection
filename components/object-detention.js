"use client"

import React, { useEffect, useRef , useState } from 'react'
import Webcam from 'react-webcam'
import {load as cocoSSDLoad} from '@tensorflow-models/coco-ssd'
import * as tf from '@tensorflow/tfjs'

let detectInterval

const Obj = () =>{

    const webcamRef = useRef(null)
    const canvasRef = useState(null)
    const [isLoading ,setIsLoading] = useState(true)

    const runCoco = async () => {

       const net =  await cocoSSDLoad()

       setIsLoading(false)

       detectInterval = setInterval(() => {
        runObjectDetection(net)
       },10)
    }

    async function runObjectDetection(net){
        if(canvasRef.current && webcamRef.current !== null && webcamRef.current.video?.readyState=== 4){
            canvasRef.current.width = webcamRef.current.video.videoWidth
            canvasRef.current.height = webcamRef.current.video.videoHeight

            //find all the detect object

            const detectedObjects = await net.detect(webcamRef.current.video , undefined , 0.6)


            const context = canvasRef.current.getContext('2d')

            renderPredictions(detectedObjects , context)

        }
    }

    const showmyVideo = () =>{
        if(webcamRef.current!== null && webcamRef.current.video?.readyState === 4){

            const videoWidth = webcamRef.current.video.videoWidth

            const videoHeight = webcamRef.current.video?.videoHeight

            webcamRef.current.video.width = videoWidth
            webcamRef.current.video.height = videoHeight
        }
    }

    useEffect(() =>{
        runCoco()
        showmyVideo()
    },[])
    return(
        <div className='mt-8 '>
            {
                isLoading ? (
                    <div className='gradient-text' > Ai Model is Loading</div>
                ) : (
                <div className='relative flex justify-center items-center gradient p-1.5 rounded-md' >

                <Webcam
                ref={webcamRef}
                className='lg:h-[720px] rounded-md w-full ' muted 
                />
                <canvas ref={canvasRef} className='absolute top-0 left-0 z-9999 w-full lg:h[720px]' />

            </div>)}
        </div>
    )
}

export default Obj