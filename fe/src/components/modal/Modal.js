import React, { useState } from 'react'

const Modal = ({ setOpen, enterStation, exitStation, type }) => {
    const [id, setId] = useState('')
    return (
        <div>
            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                        Enter Ticket Id to {type} Station
                                    </h3>
                                    <div className="mt-6 flex flex-col items-end gap-2">
                                        <input value={id} type="text" placeholder="Ticket Id" className='w-full border outline-none py-2 px-4 rounded-lg' onChange={(e) => { setId(e.target.value) }} />
                                        <button
                                            className={`${type === 'Enter' ? 'bg-green-500' : 'bg-red-500'} px-4 py-1 rounded items-end`}
                                            onClick={() => {
                                                type === 'Enter' ? enterStation(id) : exitStation(id)
                                                setOpen(false)
                                            }}
                                        >
                                            {type} Station
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-300 text-base font-medium text-black hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setOpen(false)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal