import { Ion, Viewer,Color,camera,VerticalOrigin, createWorldTerrain,createWorldImagery,PinBuilder, createOsmBuildings, Cartesian3, Math } from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import Cesium3DTile from "cesium/Source/Scene/Cesium3DTile";
import "../src/css/main.css"
require('dotenv').config();
const {
  getLongitude
} = require("./address");

Ion.defaultAccessToken = '<ACCESS_TOKEN>';

let ResisterButton = document.getElementById('ResisterButton');
ResisterButton.addEventListener('click', butotnClick);

function butotnClick(){
  const AdressText = document.getElementById('AdressText').value;
  getLongitude(AdressText)
  .then(data =>{
      pinSet(data.longitude, data.latitude);
      
  })
};

const viewer = new Viewer("cesiumContainer", {
  timeline: false
});

viewer.scene.primitives.add(createOsmBuildings());
const pinBuilder = new PinBuilder();

function pinSet(longitude, latitude)
{
  const bluePin = viewer.entities.add({
    name: "blue pin",
    position: Cartesian3.fromDegrees(longitude, latitude),
    billboard: {
      image: pinBuilder.fromColor(Color.ROYALBLUE, 10).toDataURL(),
      verticalOrigin: VerticalOrigin.BOTTOM,
    },
  });

  viewer.camera.flyTo({   
    destination : Cartesian3.fromDegrees(longitude, latitude, 450000)
  });
}


