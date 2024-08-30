import React, { useState } from 'react';
import { Ticket, Modal } from '../../components'
import { useDispatch } from 'react-redux';
import { setLoading } from '../../redux/loaderReducer';
import { addTicket, entryTicket, exitTicket } from '../../apis/ticket';
import { message } from 'antd';

const Home = () => {

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [type, setType] = useState('');

  const bookTicket = async (body) => {
    try {
      dispatch(setLoading(true));
      let { data } = await addTicket(body);
      if (data.success) {
        message.success('Ticket booked successfully');
      }
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
      message.error('Failed to book ticket');
    }
  }

  const enterStation = async (id) => {
    try {
      dispatch(setLoading(true));
      let data = await entryTicket({ _id: id });
      if (data.success) {
        message.success(data.message);
      } else {
        console.log(data.message);
        message.error(data.message);
      }
      console.log(data);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
      // message.error(error.response.data.message);
    }
  }

  const exitStation = async (id) => {
    try {
      dispatch(setLoading(true));
      let data = await exitTicket({ _id: id });
      if (data.success) {
        message.success(data.message);
      } else {
        message.error(data.message);
      }
      console.log(data);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
      message.error('Failed to exit ticket');
    }
  }


  return (
    <div>
      <div className='flex mx-44 my-12 p-6 justify-evenly flex-row border'>
        <div className='bg-green-500 py-4 border px-12 text-white font-semibold rounded-lg cursor-pointer'
          onClick={() => {
            setType('Enter')
            setOpen(true)
          }}
        >Enter Station</div>
        <div className='bg-red-500 py-4 border px-12 text-white font-semibold rounded-lg cursor-pointer'
          onClick={() => {
            setType('Exit')
            setOpen(true)
          }}
        >Exit Station</div>
      </div>
      {open && <Modal setOpen={setOpen} exitStation={exitStation} enterStation={enterStation} type={type} />}
      <Ticket bookTicket={bookTicket} />
    </div>
  )
}

export default Home;