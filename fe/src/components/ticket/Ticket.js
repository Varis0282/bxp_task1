import React, { useEffect, useState } from 'react';
import { getStations } from '../../apis/station.js';

const Ticket = ({ bookTicket }) => {

  const [stations, setStations] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const listStations = async () => {
    const { data } = await getStations();
    setStations(data);
  }

  const calculatePrice = (data) => {
    const { from, to } = data;
    if (from === '' || to === '') {
      return 0;
    }
    const arrivalStation = stations.find(station => station.name === from);
    const departureStation = stations.find(station => station.name === to);
    const price = departureStation.price - arrivalStation.price;
    if (price < 0) {
      return price * -1;
    }
    return price;
  }

  useEffect(() => {
    listStations();
  }, []);

  return (
    <div className='flex items-center justify-evenly p-6 border rounded-md flex-col my-8 mx-44'>
      <div className="flex text-lg">Choose Your Start and Departure</div>
      <div className="flex flex-row w-full justify-between">
        <div className="flex flex-col w-[42%]">
          <p className="text-lg">Arrival</p>
          <div className="flex flex-wrap border border-gray-700 bg-gray-800 rounded-lg">
            {stations.map((station, index) => {
              return (
                <div
                  key={index}
                  className={`${station.name === from ? 'text-white bg-blue-900' : 'bg-blue-500 text-black'} hover:bg-blue-800 hover:text-white duration-300 cursor-pointer flex items-center justify-center text-3xl font-semibold w-28 h-28 border border-gray-700 rounded-lg m-auto my-6`}
                  onClick={() => setFrom(station.name)}
                >
                  {station.name}
                </div>
              )
            })}
          </div>
        </div>
        <div className='flex flex-col justify-center gap-6 items-center text-2xl font-semibold'>
          <p>From : <span className='text-blue-500'>{from}</span></p>
          <p>To : <span className='text-yellow-500'>{to}</span></p>
          <p>Fare : {calculatePrice({ from, to })}</p>
          <div>
            <button
              className='bg-blue-500 text-white p-2 rounded-md'
              onClick={() => bookTicket({ from, to, price: calculatePrice({ from, to }) })}
            >
              Book Ticket
            </button>
          </div>
        </div>
        <div className="flex flex-col w-[42%]">
          <p className="text-lg">Departure</p>
          <div className="flex flex-wrap border border-blue-700 bg-blue-500 rounded-lg">
            {stations.map((station, index) => {
              return (
                <div
                  key={index}
                  className={`${station.name === to ? 'text-white bg-yellow-900' : 'bg-yellow-300 text-black'} hover:bg-yellow-700 hover:text-white duration-300 cursor-pointer flex items-center justify-center text-3xl font-semibold w-28 h-28 border border-blue-700 rounded-lg m-auto my-6`}
                  onClick={() => setTo(station.name)}
                >
                  {station.name}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
