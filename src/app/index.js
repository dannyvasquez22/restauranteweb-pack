import logoIcon from '../images/logo.png';
import imageFromVideo from '../videos/Cut-n-Paste.jpg';
import videoMP4 from '../videos/Cut-n-Paste.mp4';
import videoWEBM from '../videos/Cut-n-Paste.webm';

import './../css/normalize.css';
import './../css/bootstrap28_04_2018.css';
import './../css/style.css';

import './bootstrap.js';
import './form_object';
import './jquery-3.2.1.min.js';
import './steps.js';
import './main.js';
// import './modernizr.js';
import './sw.js';
// import './maps.js';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;

function loadScript(src,callback){
	var script = document.createElement("script");
	script.type = "text/javascript";
	if(callback)script.onload=callback;
	document.getElementsByTagName("head")[0].appendChild(script);
	script.src = src;
}
   
loadScript('http://maps.googleapis.com/maps/api/js??key=AIzaSyBRyvf3OTIXdsCTQ0pWF_lc9CLoAhN-xj4&sensor=false',
	function() {
		//PAra usar esto, antes tienes que tener una cuenta google, 
 		// crear una api key, en la ruta: console.developers.google.com
 		google.maps.event.addDomListener(window, "load", () => {
			const map = new google.maps.Map(
	    			document.getElementById('map'),
	    			{
		   			center: my_place,
		   			zoom: 15
	    			}
			);

			const marker = new google.maps.Marker({
	    			map: map,
				position: my_place,
				title: "Restaurante Pruebita",
	    			visible: true
			});

			UserLocation.get((coords) => {
	    			//Calcular distancia del lugar a mi ubicacion            
	    			let origen = new google.maps.LatLng(coords.lat, coords.lng); //LatLng
				let destino = new google.maps.LatLng(my_place.lat, my_place.lng);
				let service = new google.maps.DistanceMatrixService();

	    			service.getDistanceMatrix({
		   			origins: [origen],
					destinations: [destino],
		   			travelMode: google.maps.TravelMode.DRIVING
	    			}, get_resta);
			})

			function get_resta(response, status) {
	    			if (status === google.maps.DistanceMatrixStatus.OK) {
		   			const duration_element = response.rows[0].elements[0];
					
		   			const duration_viaje = duration_element.duration.text;
		   			document.querySelector("#message")
				 		.innerHTML = `
							Estás a ${duration_viaje} de una noche inolvidable en 
							<span class="dancing-script medium">
					    		Restaurante Pruebita
							</span>
				 		`;
	    			}
			}
 		});
	}
);

class UserLocation {
	static get(callback) {
	    	if (navigator.geolocation) {
		   	navigator.geolocation.getCurrentPosition((location) => {
			  	callback({
				 	lat: location.coords.latitude,
				 	lng: location.coords.longitude
			  	})
		   	});
	    } else {
		   	alert("No pudimos detectar el lugar en el que te encuentras.");                
	    }
	}
}

const my_place = { // Lugar LA PUNTA, Callao, Peru
	lat: -12.072826,
	lng: -77.165616
};

var logoImg = document.getElementById('logo');
logoImg.src = logoIcon;

var nPasteMP4video = document.getElementById('nPasteMP4');
nPasteMP4video.src = videoMP4;

var nPasteWEBMvideo = document.getElementById('nPasteWEBM');
nPasteWEBMvideo.src = videoWEBM;

var posterImage = document.getElementById('poster1');
posterImage.poster= imageFromVideo;

var x = document.getElementsByClassName("path-step");
var i;

for (i = 0; i < x.length; i++) {
    x[i].addEventListener('click', console.log(1));
}


// $(".path-step").on("click", (ev) => {
// 	const $current_circle = $(ev.target);
// 	console.log(3);
// 	focus_circle($current_circle);
// 	console.log(3);
// 	const posicion = $current_circle.index(".path-step") + 1;
// 	console.log(3);
// 	let $test = $(".step:nth-child(" + posicion + ")");
// 	console.log(3);
//  })