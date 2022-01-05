//https://react-leaflet.js.org/docs/start-installation/
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
//https://react-select.com/home     @types/react-select para o typescript
import AsyncSelect from "react-select/async";      //async faz com q os dados sejam buscados enquanto está digitando
import { useState } from "react";
import { fetchLocalMapBox } from '../api';
import { OrderLocationData } from './types';

const initialPosition = {
  lat: -14.2133336,
  lng: -39.5311496
}

//Valor do select. "?" é para a propriedade n ser obrigatória. Essas propriedades são opcionais pq na inicialização do estado esse valor n será informado
type Place = {
  label?: string;
  value?: string;
  position: {
    lat: number;
    lng: number;
  };
}

type Props = {
  onChangeLocation: (location: OrderLocationData) => void;
}

function OrderLocation({onChangeLocation}: Props){
  const [address, setAddress] = useState<Place>({
    position: initialPosition
  });

  //Tds vezes q digita algo no campo de endereço, a função loadOptions é chamada
  const loadOptions = async (inputValue: string, callback: (places: Place[]) => void) => {
    //fetchLocalMapBox chama a API e busca uma lista de endereços. É uma lista pq pode haver vários endereços com o mesmo nome
    const response = await fetchLocalMapBox(inputValue);    
    //Faz a iteração na lista
    const places = response.data.features.map((item: any) => {
      return ({
        label: item.place_name,
        value: item.place_name,
        position: {
          lat: item.center[1],
          lng: item.center[0]
        },
      });
    });
  
    callback(places);     //Através do callback q o select consegue carregar os endereços
  };
  
  const handleChangeSelect = (place: Place) => {
    setAddress(place);
    //onChangeLocation é chamado tds vezes q clicar em um endereço  
    onChangeLocation({
      latitude: place.position.lat,
      longitude: place.position.lng,
      address: place.label!   //Excalamação pq o label foi criado como opcional
    });
  };

    return (
        <div className="order-location-container">
            <div className="order-location-content">
                <h3 className="order-location-title">
                    Selecione onde o pedido deve ser entregue:
                </h3>
                <div className="filter-container">
                    <AsyncSelect
                      placeholder="Digite um endereço para entregar o pedido"
                      className="filter"
                      loadOptions={loadOptions}
                      //Qnd selecionar um valor no mapa
                      onChange={value => handleChangeSelect(value as Place)}
                    />
                </div>
                {/*Mapa react-leaflet */}
                {/*MapContainer - todo bloco do mapa. cente é onde o mapa será inicializado. scrollWheelZoom é o zoom com o mouse. key força o mapa se atualiza qnd alterar o endereço ao alterar a lat/long */}
                  <MapContainer 
                    center={address.position} 
                    zoom={13} 
                    
                    key={address.position.lat}
                    scrollWheelZoom={false}>
                    {/*TileLayer é a parte das imagens */}
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                    {/*Marker é o marcador do mapa e qnd clica nele aparece o Popup com o texto*/}
                    <Marker position={address.position}>
                      <Popup>{address.label }</Popup> 
                    </Marker>
                </MapContainer>
            </div>
        </div>
    );
}

export default OrderLocation;