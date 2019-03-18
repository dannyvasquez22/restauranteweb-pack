;(function() {

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
})()