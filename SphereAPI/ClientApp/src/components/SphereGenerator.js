import "../custom.css";

//import img from "../images/GRYNKO.jpg";

import * as THREE from "three";
import axios from 'axios';
import Slider from '@mui/material/Slider';
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
//import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils";
import React, { Component, Fragment } from 'react';
import { HemisphereLight, NoToneMapping, ShadowMapType } from "three";
import DynamicData from '../dynamicData.js';

export class SphereGenerator extends Component {
    static displayName = SphereGenerator.name;

    static abortController = new AbortController();

    constructor(props) {
        super(props);
        this.state = { list: [], loading: true, shadowsEnabled: false, diameter: 0, quality: 4, level: 0, count: 0, color: "#FF7400", texture: 'iHate.png' };
        this.CancelToken = axios.CancelToken;
        this.source = this.CancelToken.source();
        this.abortController = new AbortController();
        this.CameraPositiona = false;
    }

    /*<directionalLight position={[this.CheckYForCamera(list) / -6.5, this.CheckYForCamera(list) / 3.25, this.CheckYForCamera(list) / 1.25]} intensity={1} castShadow />
    <directionalLight position={[this.CheckYForCamera(list) / 6.5, this.CheckYForCamera(list) / -3.25, this.CheckYForCamera(list) / -1.25]} intensity={1} castShadow />
    <rectAreaLight
                        width={this.CheckYForCamera(list) / 1}
                        height={this.CheckYForCamera(list) / 1}
                        intensity={7}
                        color={"#ffc9f9"}
                        position={[this.CheckYForCamera(list) / -6.5, this.CheckYForCamera(list) / 3.25, this.CheckYForCamera(list) / 1.25]}
                        lookAt={[0, 0, 0]}
                        penumbra={2}
                        castShadow
                    />
                    <rectAreaLight
                        width={this.CheckYForCamera(list) / 1}
                        height={this.CheckYForCamera(list) / 1}
                        intensity={7}
                        color={"white"}
                        position={[this.CheckYForCamera(list) / 6.5, this.CheckYForCamera(list) / -3.25, this.CheckYForCamera(list) / -1.25]}
                        lookAt={[0, 0, 0]}
                        penumbra={2}
                        castShadow
                    />
                    <hemisphereLight args={['#fff', '#333', 1]} position={[this.CheckYForCamera(list) / -6.5, this.CheckYForCamera(list) / 3.25, this.CheckYForCamera(list) / -1.25]} />
                    <pointLight position={[this.CheckYForCamera(list) / -0.75, this.CheckYForCamera(list) / -0.75, this.CheckYForCamera(list) / -0.75]} intensity={1} castShadow />
                    <pointLight position={[this.CheckYForCamera(list) / 0.75, this.CheckYForCamera(list) / 0.75, this.CheckYForCamera(list)/ 0.75]} intensity={1} castShadow />*/

    componentDidMount() {
        //const populate = this.populateWeatherData1;
        /*const _this = this;
        const populateWeather = () => {
            _this.setState({ list: _this.state.list, count: _this.state.count, loading: true, shadowsEnabled: _this.state.shadowsEnabled, diameter: _this.state.diameter, quality: _this.state.quality, level: _this.state.level, color: _this.state.color });
            _this.setState({ list: _this.state.list, count: _this.state.count, loading: false, shadowsEnabled: _this.state.shadowsEnabled, diameter: _this.state.diameter, quality: _this.state.quality, level: _this.state.level, color: _this.state.color });
            //this.setState({ list: this.state.list, count: this.state.count, loading: this.state.loading, shadowsEnabled: this.state.shadowsEnabled, diameter: this.state.diameter, quality: this.state.quality, level: this.state.level, color: this.state.color });
        }*/
        //this.cancelAndCreateNew();
        //let color = this.state.color;
        //let renderer = new THREE.WebGLRenderer();
        this.abortController = new AbortController;
        this.populateWeatherData1(1, this.state.quality, this.source);
        console.log('Mounted');
        //this.setState({ list: this.state.list, count: this.state.count, loading: this.state.loading, shadowsEnabled: this.state.shadowsEnabled, diameter: this.state.diameter, quality: this.state.quality, level: this.state.level, color: this.state.color });
        //this.setState({ list: this.state.list, count: this.state.count, loading: this.state.loading, shadowsEnabled: this.state.shadowsEnabled, diameter: this.state.diameter, quality: this.state.quality, level: this.state.level, color: this.state.color });
        //this.setState({ list: this.state.list, count: this.state.count, loading: this.state.loading, shadowsEnabled: this.state.shadowsEnabled, diameter: this.state.diameter, quality: this.state.quality, level: this.state.level, color: this.state.color });
        //window.setTimeout(populateWeather, 200);
        //this.populateWeatherData1(2, this.state.quality, this.source);
        //this.populateWeatherData1(1, this.state.quality, this.source);
        //renderer.clear();
        //this.populateWeatherData1(1, this.state.quality, this.source);
        //renderer.clear();
        //this.populateWeatherData1(1, this.state.quality, this.source);
        //renderer.clear();
        //this.populateWeatherData1(1, this.state.quality, this.source);
        //this.setState({ list: this.state.list, count: this.state.count, loading: this.state.loading, shadowsEnabled: this.state.shadowsEnabled, diameter: this.state.diameter, quality: this.state.quality, level: this.state.level, color: this.state.color })
        //this.populateWeatherData1(1, this.state.quality, this.source);
        //FetchData.renderForecastsTable([X: 0, Y: 0, Z: 0], this.state.shadowsEnabled, this.s, this.state.level)
    }

    componentDidUpdate() {
        const _this = this;
        /*if (_this.firstRealRender && _this.state.list !== []) {
            _this.setState({ list: _this.state.list, count: _this.state.count, loading: true, shadowsEnabled: _this.state.shadowsEnabled, diameter: _this.state.diameter, quality: _this.state.quality, level: _this.state.level, color: _this.state.color });
            _this.setState({ list: _this.state.list, count: _this.state.count, loading: false, shadowsEnabled: _this.state.shadowsEnabled, diameter: _this.state.diameter, quality: _this.state.quality, level: _this.state.level, color: _this.state.color }); 
            _this.firstRealRender = false;
        }*/
        if (this.firstRealRender == 3) {
            console.log("Real Effect");
            /*window.setTimeout(() => {
                _this.setState({ list: _this.state.list, count: _this.state.count, loading: true, shadowsEnabled: _this.state.shadowsEnabled, diameter: _this.state.diameter, quality: _this.state.quality, level: _this.state.level, color: _this.state.color, texture: _this.state.texture });
                _this.setState({ list: _this.state.list, count: _this.state.count, loading: false, shadowsEnabled: _this.state.shadowsEnabled, diameter: _this.state.diameter, quality: _this.state.quality, level: _this.state.level, color: _this.state.color, texture: _this.state.texture });
            }, 30);*/
            //console.log("Real Effect");
        }
        //this.firstRealRender += 1
        console.log("Effect")
    }

    firstRealRender = 1;

    componentWillUnmount() {
        this.cancelAndCreateNew();
    }


    clearPosition = () => {
        console.log("Before:" + SphereGenerator.CameraPositiona);
        SphereGenerator.CameraPositiona = false;
        console.log("After:" + SphereGenerator.CameraPositiona);
    }

    static renderForecastsTable(list, shadows, diameter, level, color, texture) {
        console.log(SphereGenerator.CameraPositiona);
        //this.CameraPositiona = undefined;
        //console.log(this.state.shadowsEnabled);
        //const _this = this;
        //static Box() = this.Box(); <Box position={[0, 0, 0]} list={list} />
        /*let besc;
        if (list == null) {
            const texture = new THREE.TextureLoader().load(img);
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(1, 1);
            besc = <mesh castShadow receiveShadow position={[0, 0, 0]} geometry={new THREE.BoxGeometry(1, 1, 1)} material={new THREE.MeshStandardMaterial({ map: texture, color: "#FF8B01" })} />
        } else {
            besc = this.Box([0, 0, 0], list.filter(n => n.Y < level - (diameter / 2)));
        }
        <directionalLight position={[this.CheckYForCamera(list) / -3.75, this.CheckYForCamera(list) / 6.75, this.CheckYForCamera(list) / -1.25]} intensity={1} />
                    <directionalLight position={[this.CheckYForCamera(list) / 3.75, this.CheckYForCamera(list) / -6.75, this.CheckYForCamera(list) / 1.25]} intensity={1} />
                    {contents}
                     onChange={(e, value) => console.log(e.target.object.position)}*/
        //Box = this.Box; {this.Box([0, 0, 0], list.filter(n => n.Y < level - (diameter / 2)), "#FF8B00")}
        let X, Y, Z;
        let YCamera = this.CheckYForCamera(list);
        if (this.CameraPositiona == false) {
            X = YCamera / -2;
            Y = YCamera / 1.25;
            Z = YCamera / 1.25;
        } else {
            X = this.CameraPositiona.x;
            Y = this.CameraPositiona.y;
            Z = this.CameraPositiona.z;
        }
        let renderer = new THREE.WebGLRenderer();
        renderer.outputEncoding = THREE.sRGBEncoding;

        let contents = shadows
            ? <Fragment>
                <pointLight position={[YCamera / -0.75, YCamera / -0.75, YCamera / -0.75]} intensity={1} castShadow />
                <pointLight position={[YCamera / 0.75, YCamera / 0.75, YCamera / 0.75]} intensity={1} castShadow />
            </Fragment>
            : null;
        return (
            <div className="canvas" >
                <Canvas gl={{ antialias: true, toneMapping: NoToneMapping }} camera={{ position: [X, Y, Z] }} shadows>
                    <OrbitControls enableZoom={true} enablePan={false} onChange={(e, value) => SphereGenerator.CameraPositiona = e.target.object.position} />
                    {this.Box([0, 0, 0], list.filter(n => n.Y < level - (diameter / 2)), color, texture)}
                    <ambientLight intensity={1} />
                    <directionalLight position={[YCamera / -2.75, YCamera / 6.75, YCamera / -1.25]} intensity={1} />
                    <directionalLight position={[YCamera / 2.75, YCamera / -6.75, YCamera / 1.25]} intensity={1} />
                    {contents}
                </Canvas>
            </div>
        );
        /*return (
            <div>
                <div>{list}</div>  
                <div>{cameraP}</div>
            </div>
        );*/

    }

    /*CancelToken = axios.CancelToken;
    source = null;
    loadImage = imageName => {
  import(`./assets/${imageName}.jpg`).then(image => {
    this.setState({
      image
    });
  });
};*/
    controller = new AbortController();
    async populateWeatherData1(diameter, quality) {
        console.log(this.CameraPositiona);
        this.CameraPositiona = undefined;
        console.log(this.CameraPositiona);
        await this.cancelAndCreateNew();
        await this.populateWeatherData(diameter, quality);
    }

    

    getCode = async (event) => {
        let _this = this;
        if (event.key === 'Enter') {
            //console.log(FetchData.abortController);
            SphereGenerator.abortController.abort();
            SphereGenerator.abortController = new AbortController();
            let signal = SphereGenerator.abortController.signal;

            const response = await axios.get(DynamicData.server + '/test/api/tab2?code=' + event.target.value, { signal });
            const data = response.data;
            //let im = await import(`../images/${data.Texture}`);
            //const texture = new THREE.TextureLoader().load(await import(`../images/${data.Texture}`));
            //let color = this.color;
            //texture.wrapS = THREE.RepeatWrapping;
            //texture.wrapT = THREE.RepeatWrapping;
            //texture.repeat.set(1, 1);
            //texture.encoding = THREE.sRGBEncoding;
            //console.log(`im: ${im}`);
            this.setState({ list: this.state.list, count: this.state.count, loading: this.state.loading, shadowsEnabled: this.state.shadowsEnabled, diameter: this.state.diameter, quality: this.state.quality, level: this.state.level, color: data.Color, texture: data.Texture });
            console.log(this.state.texture);
            console.log(this.state.color);
        }
    }
    async populateWeatherData (diameter, quality, sources) {
        const _this = this;
        let source = this.source;
        /*if(this.source == null) {
            this.source = this.CancelToken.source();
        }
        console.log(this.source)*/
        /*this.source.cancel();*/
        //let source = this.source;	

        //this.source.cancel();
        console.log(source);
        //this.controller.abort();

        //this.controller = new AbortController();
        //this.cancelToken = axios.CancelToken;

        /*this.source = axios.CancelToken.source();*/
        this.clearPosition();

        const signal = this.controller.signal;

        try {
            //this.CameraPositiona = null;
            this.setState({ list: [], loading: true, count: this.state.count, shadowsEnabled: this.state.shadowsEnabled, diameter: diameter, quality: quality, level: diameter, color: this.state.color, texture: this.state.texture });
            //_this.CameraPositiona = null;
            //console.log(quality);
            //const response = await fetch('/weatherforecast/' + quality + "/" + diameter, { signal });
            const response = await axios.get(DynamicData.server + '/test/api/tab1/' + quality + "/" + diameter, { cancelToken: source.token/*, signal*/ });
            //source.cancel();
            const data = response/*.Object*/.data/*.json()*/;
            console.log(response.data);
            _this.sliderLevel = _this.state.diameter;
            //console.log(_this.CameraPositiona);
            //this.CameraPositiona = null;
            //console.log(_this.CameraPositiona);
            this.setState({ list: /*[{ X: 0, Y: 0, Z: 0 }]*/data.Coordinates, count: /*this.state.count*/data.CameraPosition, loading: false, shadowsEnabled: this.state.shadowsEnabled, diameter: this.state.diameter, quality: quality, level: this.state.level, color: this.state.color, texture: this.state.texture });
            //console.log(this.state.quality);
        } catch (error) {
            if (error.name == 'AbortError') console.log('Request abborted');
            if (axios.isCancel(error)) console.log(error + ': ' + diameter);

        }

        //return this.source.cancel();
        /*axios.get('weatherforecast/' + quality + "/" + diameter, { signal }).then(function(response) {return response.data/*console.log(response)*//*}).then(function(response) {
            _this.setState({ list: response.Coordinates, count: response.CameraPosition, loading: false, shadowsEnabled: _this.state.shadowsEnabled, diameter: _this.state.diameter, quality: quality, level: _this.state.level });
        }).catch(function (thrown) {
            console.log(thrown);
        });*/
        /*fetch('weatherforecast/' + diameter, { signal }).then(function (response) {
            const data = response.json();
            _this.setState({ list: data.Coordinates, loading: false });
        }).catch(function (e) {
        console.log('Ошибка загрузки: ' + e.message);
})*/
    }

    async cancelAndCreateNew() {
        if (this.source == null) {
            this.source = this.CancelToken.source();
        }

        //await this.controller.abort();
        console.log(this.source.token);
        await this.source.cancel("canceled due new request");
        console.log(this.source.token);

        this.controller = new AbortController();
        //this.cancelToken = axios.CancelToken;

        this.source = axios.CancelToken.source();
    }
    //sliderLevel;
    keyUsage = false;
    choosingLevel = false;
    render() {

        /*const handleChange = (e) => {
            this.setState({ list: this.state.list, loading: this.state.loading, shadowsEnabled: this.state.shadowsEnabled, diameter: this.state.diameter, quality: e.target.value })
            this.populateWeatherData(this.state.diameter, this.state.quality);
            /*console.log("hell");*/
        //} */
        /*let renderer = new THREE.WebGLRenderer({ alpha: true })
        renderer.setClearColor( 0xffffff, 0 )*/
        const sliderChange = (e/*, value*/) => {
            this.choosingLevel = true;
            console.log("change");
            if (e.altKey == undefined && !this.keyUsage) {
                alert("I won`t recommend using keys for this slider, because it can break your interface");
                this.keyUsage = true;
            }
            this.setState({ list: this.state.list, count: this.state.count, loading: this.state.loading, shadowsEnabled: this.state.shadowsEnabled, diameter: this.state.diameter, quality: this.state.quality, level: this.state.level, color: this.state.color, texture: this.state.texture });
        }
        const sliderChangeCommitted = (e, value) => {
            console.log("changeCommited");
            console.log(e);
            this.choosingLevel = false;
            this.setState({ list: this.state.list, count: this.state.count, loading: this.state.loading, shadowsEnabled: this.state.shadowsEnabled, diameter: this.state.diameter, quality: this.state.quality, level: value, color: this.state.color });
            //this.choosingLevel = false;
        }
        const onChange = (event, child) => {
            this.setState({ list: this.state.list, count: this.state.count, loading: this.state.loading, shadowsEnabled: this.state.shadowsEnabled, diameter: this.state.diameter, quality: event.target.value, level: this.state.level, color: this.state.color, texture: this.state.texture });
            /*console.log(event.target.value);
            console.log(this.state.quality);*/
            this.populateWeatherData1(this.state.diameter, event.target.value, this.source);
            //console.log(this.state.quality);
            //console.log(event.target.value);
            //console.log(child);
        };
        let pon;
        if (this.state.diameter !== 1) {
            pon = <div className="slider" >
                <div className="boxe">
                        <Box sx={{ height: '100%' }}>
                        <Slider sx={{ '& input[type="range"]': { WebkitAppearance: 'slider-vertical', }, }} orientation="vertical" defaultValue={this.state.diameter} aria-label="Default" valueLabelDisplay="auto" min={1} max={this.state.diameter} onChange={sliderChange} onKeyDown={(e) => console.log("nah")} onKeyPress={(e) => console.log("nah")} onChangeCommitted={(e, value) => sliderChangeCommitted(e, value)} />
                        </Box>
                    </div>
                  </div>

                
        }

        /*let contents;
        if (this.firstRealRender === 1) {
            //let con = <mesh castShadow receiveShadow position={[0, 0, 0]} geometry={new THREE.BoxGeometry(1, 1, 1)} material={new THREE.MeshStandardMaterial({ color: new THREE.Color(this.state.color).getHex() })} />;
            contents = <Fragment>
                <div className="canvas" >
                    <Canvas gl={{ antialias: true, toneMapping: NoToneMapping }} camera={{ position: [2 / -2, 2 / 1.25, 2 / 1.25] }} shadows>
                        <OrbitControls enableZoom={true} enablePan={false} />
  
                        <mesh castShadow receiveShadow position={[0, 0, 0]} geometry={new THREE.BoxGeometry(1, 1, 1)}>
                            <meshStandardMaterial attach="material" color={new THREE.Color(this.state.color).getHex()} />
                        </mesh>
                        <ambientLight intensity={1} />
                        <directionalLight position={[2 / -2.75, 2 / 6.75, 2 / -1.25]} intensity={1} />
                        <directionalLight position={[2 / 2.75, 2 / -6.75, 2 / 1.25]} intensity={1} />
                    </Canvas>
                </div>
                {pon}
            </Fragment>
            console.log(contents);
            this.firstRealRender += 1;
        } else {*/
        let contents;
        if (pon !== undefined) {
            /*contents = this.state.loading
                ? <div className="main3" ><p className="canvas" ><em>Loading...</em></p></div>
                : <div className="main">
                    {SphereGenerator.renderForecastsTable(this.state.list, this.state.shadowsEnabled, this.state.diameter, this.state.level, this.state.color, this.state.texture)}
                    {pon}
                </div>*/
            if (this.choosingLevel) {
                contents = <div className="main"><div className="main3" ><p><em>This loading will end, when you stop dragging slider</em></p></div>{pon}</div>
            } else if (this.state.loading) {
                contents = <div className="main3" ><p><em>Loading...</em></p></div>
            } else {
                contents = <div className="main">
                                {SphereGenerator.renderForecastsTable(this.state.list, this.state.shadowsEnabled, this.state.diameter, this.state.level, this.state.color, this.state.texture)}
                                {pon}
                            </div>
            }
        } else {
            contents = this.state.loading
                ? <div className="main3" ><p><em>Loading...</em></p></div>
                : <div className="main2">
                    {SphereGenerator.renderForecastsTable(this.state.list, this.state.shadowsEnabled, this.state.diameter, this.state.level, this.state.color, this.state.texture)}
                    {pon}
                </div>
        }
        //}
        let contents2 = this.state.loading
            ? <p className="blocksDiv" >Blocks count: loading...</p>
            : <p className="blocksDiv" >Blocks count: {this.state.count}</p>

        return (
            <div>
                <h1 id="tabelLabel" >Sphere Generator</h1>
                {contents2}
                {contents}

                <Slider defaultValue={1} aria-label="Default" valueLabelDisplay="auto" min={1} max={384} onChangeCommitted={(event, value) => this.populateWeatherData1(value, this.state.quality, this.source)} />
                <div className="flexDiv">
                    <Select id="select" value={this.state.shadowsEnabled} onChange={(e) => this.setState({ list: this.state.list, count: this.state.count, loading: this.state.loading, shadowsEnabled: e.target.value, diameter: this.state.diameter, quality: this.state.quality, level: this.state.level, color: this.state.color, texture: this.state.texture })}>
                        <MenuItem value={true}>Turn shadows on</MenuItem>
                        <MenuItem value={false}>Turn shadows off</MenuItem>
                    </Select>
                    <Select id="selectQ" value={this.state.quality} onChange={onChange}>
                        <MenuItem value={1}>Low quality</MenuItem>
                        <MenuItem value={2}>Medium quality</MenuItem>
                        <MenuItem value={4}>High quality</MenuItem>
                    </Select>
                    <input className="input" placeholder="Paste code here..." type="text" onKeyPress={this.getCode} />
                </div>
            </div>
        );
    }

    /*async populateWeatherData(diameter) {
        this.setState({ list: [], loading: true });
        const response = await fetch('weatherforecast/' + diameter);
        const data = await response.json();
        this.setState({ list: data.Coordinates, loading: false });
    }*/
    /*static handleChange = (valuer) => {
        this.setState({ list: this.state.list, loading: this.state.loading, shadowsEnabled: this.state.shadowsEnabled, diameter: this.state.diameter, quality: valuer })
        this.populateWeatherData(this.state.diameter, this.state.quality);
        /*console.log("hell");*/
    //} 

    static CheckYForCamera(array) {
        let MaxY = 0;
        array.forEach(element => {
            if (element.Y > MaxY) {
                MaxY = element.Y;
            }
        });
        return MaxY * 2 + 2;
    }

    /*static Box(props) {
        var merged;
        const list = props.list;
        delete props.list;
        var list2 = [];
        for (var i = 0; i < list.length; i++) {
            var geometry = new THREE.BoxBufferGeometry(1, 1, 1);
            geometry.translate(list[i].X, list[i].Y, list[i].Z);
            list2[i] = geometry;
        }

        merged = BufferGeometryUtils.mergeBufferGeometries(list2);

        return (
            <mesh {...props} geometry={merged} material={new THREE.MeshStandardMaterial({ color: "orange" })} />

        );
    }*/

    //static color = "#FF8B00";

    static Box(position, list, color, textureSrc) {
        /*function importImage() {
            const img = (async () => { return await import(`../images/GRYNKO.jpg`) })();
            console.log(`realImg: ${img}`);
            return new Promise(import(`../images/GRYNKO.jpg`));
        }*/
        /*let img = (async () => {
            console.log(`starting`);
            let im = await import(`../images/GRYNKO.jpg`)
            console.log(`im: ${im}`);
            return im;
        })()*/
    //});//require("../images/GRYNKO.jpg").default;
        //const _this = this;
        //console.log(`img: ${img}`);
        //console.log(`img2: ${img2}`);
        //let image = "iHate.png"
        const textureImage = require('../' + DynamicData.imgs + '/' + textureSrc);
        const texture = new THREE.TextureLoader().load(textureImage);
        //const texture = new THREE.TextureLoader().load(textureSrc);
        //let color = this.color;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
        texture.encoding = THREE.sRGBEncoding;
        //let material = new THREE.MeshStandardMaterial({ map: texture, color: new THREE.Color(color).getHex() });
        //material.colorWrite = false;
        //material.transparent = true;
        //material.opacity = 0.5;
        var merged;
        var list2 = [];
        for (var i = 0; i < list.length; i++) {
            var geometry = new THREE.BoxGeometry(1, 1, 1);
            //console.log(geometry);
            geometry.translate(list[i].X, list[i].Y, list[i].Z);
            list2[i] = geometry;
        }

        merged = BufferGeometryUtils.mergeBufferGeometries(list2);

        return (
            <mesh castShadow receiveShadow position={position} geometry={merged /*new THREE.BoxGeometry(1, 1, 1)*/} >
                <meshStandardMaterial attach="material" color={new THREE.Color(color).getHex()} map={texture} />
            </mesh>
        );
    }

}
