import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setLoading } from '../../redux/loaderReducer';
import { entryTicket, exitTicket, listTicket } from '../../apis/ticket';
import { message, Table } from 'antd';
import moment from 'moment';

const Tickets = () => {

  const dispatch = useDispatch();
  const [tickets, setTickets] = useState([]);

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
      listTickets();
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
      listTickets();
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
      message.error('Failed to exit ticket');
    }
  }

  const listTickets = async () => {
    try {
      dispatch(setLoading(true));
      let { data } = await listTicket();
      setTickets(data);
      console.log(data);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
      message.error('Failed to list tickets');
    }
  }

  const columns = [
    {
      title: 'Ticket Id',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Expiry Time',
      dataIndex: 'expiryTime',
      key: 'expiryTime',
      // render in red if expired or green if not
      render: (text, record) => {
        return (
          <span style={{ color: record.expired ? 'red' : 'green', fontWeight: 600 }}>
            {moment(text).format('YYYY-MM-DD HH:mm:ss')}
          </span>
        )
      }
    },
    {
      title: 'Entry Time',
      dataIndex: 'entryTime',
      key: 'entryTime',
      render: (text) => {
        return (
          <span className='text-green-700 font-[600]'>
            {text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : 'Not Entered'}
          </span>
        )
      }
    },
    {
      title: 'Exit Time',
      dataIndex: 'exitTime',
      key: 'exitTime',
      render: (text) => {
        return (
          <span className='text-red-700 font-[600]'>
            {text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : 'Not Exited'}
          </span>
        )
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span className='flex gap-4'>
          <button
            className='border rounded py-0.5 px-1 bg-green-500 text-white'
            onClick={() => {
              enterStation(record?._id);
            }}
          >
            {record.entry ? 'Entered' : 'Enter'}
          </button>
          <button
            className='border rounded py-0.5 px-1 bg-red-500 text-white'
            onClick={() => {
              exitStation(record?._id);
            }}
          >
            {record.exit ? 'Exited' : 'Exit'}
          </button>
        </span>
      )
    }
  ]

  useEffect(() => {
    listTickets();
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {tickets && tickets.length && <div className='flex items-center justify-evenly border rounded-md flex-col my-8 mx-44'>
        <Table dataSource={tickets} columns={columns} className='w-full' pagination={false} />
      </div>}
    </div>
  )
}

export default Tickets