import { Ion, Viewer,Color,camera,VerticalOrigin, PinBuilder, Cartesian3 } from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import "../src/css/main.css"
const {
  getLongitude
} = require("./address");

Ion.defaultAccessToken = '<ACCESS_TOKEN>';

let ResisterButton = document.getElementById('ResisterButton');
ResisterButton.addEventListener('click', butotnClick);

// 住所が入力されたときの挙動
function butotnClick(){
  const AdressText = document.getElementById('AdressText').value;
  getLongitude(AdressText)
  .then(data =>{
      pinSet(data.longitude, data.latitude);
      
  })
};

// Cesiumで地球儀表示
const viewer = new Viewer("cesiumContainer", {
  timeline: false
});

// ピンを立てるためのオブジェクト生成
const pinBuilder = new PinBuilder();

// ピンを立てる
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

  // 視点移動
  viewer.camera.flyTo({   
    destination : Cartesian3.fromDegrees(longitude, latitude, 450000)
  });
}