import React from 'react';
import { useState, useRef, useEffect } from 'react'
import aya from '../data/audio/file-1.mp3';
import nelsonMandela from '../data/audio/song-2.mp3';
import ayaImage from '../data/images/aya.jpg';
import bgImage from '../data/images/bg-image.jpg'


function AudioVisualizer() {
    //My state initializations go here
    const [image, setImage] = useState(ayaImage)
    const [speechTitle, setSpeechTitle] = useState("Aya Chebbi's TED X speech at Muenster, Germany")
    const [audioSource, setAudioSource] = useState(aya)
    const [frequency, setFrequency] = useState([]);
    const [agents, setAgents] = useState([])
    const [isPlaying, setIsPlaying] = useState(false);
    const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
    const canvasRef = useRef(null);

    const mandela = 'https://www.history.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTU3OTIzNjU0NzY3ODE0Mjkw/nelson-mandela-his-written-legacys-featured-photo.jpg'


    // creating the audio file


    const audioPlayer = useRef();

    const changeAudio = () => {
        setAudioSource(nelsonMandela)
        setImage(mandela)
        setIsPlaying(false)
        setSpeechTitle("Nelson Mandela's speech at the Laureus World Sports Awards 2000,Monaco.")
    }

    // when the component mounts, the audio file is created



    // My utility functions for drawing on the canvas

    function getRandomRange(min, max) {
        return Math.random() * (max - min) + min;
    }


    const playPause = () => {
        setIsPlaying(!isPlaying)

    }

    useEffect(() => {
        if (isPlaying) {
            audioPlayer.current.play();


        } else {
            audioPlayer.current.pause();
        }
    }, [isPlaying]);


    useEffect(() => {
        // Pause and clean up on unmount
        return () => {
            audioPlayer.current.pause();
        }
    }, []);

    // ======================================================================================
    // End of utility functions


    // ==========================================================================================
    // Function that mounts the canvas on the window



    // ======================================================================================
    // Creating the classes where the drawng would take place

    // The vector class shows the position and velocity of the agent
    class Vector {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }

        getDistance(v) {
            const dx = this.x - v.x;
            const dy = this.y - v.y;

            return Math.sqrt(dx * dx + dy * dy)
        }
    }



    //  The Agent class refers to each of the dots on the screen

    class Agent {
        constructor(x, y) {

            this.pos = new Vector(x, y);
            this.vel = new Vector(getRandomRange(-1, 1), getRandomRange(-1, 1))
            this.radius = getRandomRange(4, 12);

        }

        bounce(width, height) {
            if (this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1;

            if (this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;

        }

        update(audio) {
            this.pos.x += this.vel.x * audio * 0.1;
            this.pos.y += this.vel.y * audio * 0.1;
        }

        drawAgent(context) {
            context.save();
            context.translate(this.pos.x, this.pos.y);

            // this controls the color and style of the circles
            context.lineWidth = 2
            context.fillStyle = `rgb(${audioPlayer.current.currentTime == 0 ? '255' : Math.sin(audioPlayer.current.currentTime) * 245},245,245,${audioPlayer.current.currentTime == 0 ? '0.2' : Math.sin(audioPlayer.current.currentTime * 0.1)})`;
            context.beginPath();
            context.arc(0, 0, this.radius, 0, Math.PI * 2);

            context.fill();
            context.stroke();
            context.restore();
        }
    }

    // Classes have been defined up here and the methods that exist within them
    // =========================================================================================


    // Function that creates an array of agents based on the agent class


    function AgentCreator() {
        const agents = [];
        for (let i = 0; i < 30; i++) {

            const x = getRandomRange(0, dimensions.width)
            const y = getRandomRange(0, dimensions.height)
            agents.push(new Agent(x, y))
        }
        setAgents(agents)

    }



    // function that draws the line between agents
    const drawLine = (context) => {

        context.fillStyle = 'rgb(35,32,34)';
        context.fillRect(0, 0, dimensions.width, dimensions.height);

        for (let i = 0; i < agents.length; i++) {
            const agent = agents[i];

            for (let j = i + 1; j < agents.length; j++) {
                const other = agents[j]
                const dist = agent.pos.getDistance(other.pos)

                if (dist > 190) continue;

                context.lineWidth = 2;
                context.strokeStyle = '#D6DEE9'
                context.beginPath();
                context.moveTo(agent.pos.x, agent.pos.y);
                context.lineTo(other.pos.x, other.pos.y);
                context.stroke();

            }
        }


        agents.forEach(agent => {
            agent.update(((Math.max(...frequency) + 70) - 30));
            agent.drawAgent(context);
            agent.bounce(dimensions.width, dimensions.height);
        })

    }
    useEffect(() => {
        const audio = audioPlayer.current
        audio.muted = false;


        var audioContext = new window.AudioContext();
        var source = audioContext.createMediaElementSource(audio);
        var analyser = audioContext.createAnalyser()
        source.connect(analyser);
        analyser.connect(audioContext.destination)
        analyser.fttSize = 256;



        const bufferLength = analyser.frequencyBinCount;
        const frequencyData = new Uint8Array(bufferLength);


        setInterval(() => {
            analyser.getByteFrequencyData(frequencyData);
            setFrequency(frequencyData);

        }, 10)
    }, [])

    useEffect(() => {
        AgentCreator()
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const render = () => {
            drawLine(context)
            window.requestAnimationFrame(render)
        }
        render()
    }, [frequency])

    return (
        <div className="w-screen">

            <div className='relative bg-cover bg-no-repeat h-scren w-screen'>

                <audio ref={audioPlayer} src={audioSource} preload='metadata' className='hidden'> </audio>
                <div className="flex flex-col items-center jusfify-center absolute top-[50%] sm:left-[50%] left-[0%] -mt-32 sm:ml-[-25%] sm:w-1/2 ml-[0%] w-full ">

                    <div className="w-32 h-32  bg-[#711724] rounded-full flex items-center justify-center">
                        <button style={{ backgroundImage: `url(${image})`, boxShadow: "0 0 10px  rgba(0,0,0,0.6)" }} className={isPlaying ? 'w-24 h-24  bg-cover bg-blue-300 m-3 bg-no-repeat  rounded-full' : ' rounded-full w-24 h-24  bg-red-300 bg-cover m-3 bg-no-repeat '}> </button>
                    </div>
                    <p className="text-center text-white">Tap anywhere to {isPlaying ? 'pause' : "play"}</p>
                    <p className='text-white'>Title of visual art: Connected</p>
                    <p className='text-white w-5/6 text-center'>Visuals based on {speechTitle}</p>
                    <button onClick={changeAudio} className='bg-[#F2811D] p-4 text-white mt-16 z-50'>
                        Click to view another Speech
                    </button>
                </div>

                <div onClick={playPause} style={{ backgroundImage: `url(https://images.unsplash.com/photo-1489493887464-892be6d1daae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1167&q=80.jpg)` }} className="w-full h-full absolute bg-[rgba(0,0,0,0.5)] bg-cover bg-no-repeat opacity-10">

                </div>
                <canvas ref={canvasRef} width={dimensions.width} height={dimensions.height} className='bg-black' />

            </div>
        </div>
    )
}

export default AudioVisualizer
