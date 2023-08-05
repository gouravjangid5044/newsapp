import React, { Component } from 'react'

export default class newscard extends Component {
  render() {
    let {title,description,imageurl,newsurl}=this.props
    return (
                        <div className="focus:outline-none bg-white p-6 shadow rounded">
                            <div className="flex items-center border-b border-gray-200 pb-6">
                                {/* <img src="https://cdn.tuk.dev/assets/components/misc/doge-coin.png" alt="coin avatar" className="w-12 h-12 rounded-full" /> */}
                                <div className="flex items-start justify-between w-full">
                                    <div className="pl-3 w-full">
                                        <p tabIndex="0" className="focus:outline-none text-xl font-medium leading-5 text-gray-800">{title}</p>
                                        {/* <p tabIndex="0" className="focus:outline-none text-sm leading-normal pt-2 text-gray-500">36 members</p> */}
                                        
                                    </div>
                                    <div role="img" aria-label="bookmark">
                                        <svg  className="focus:outline-none" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.5001 4.66667H17.5001C18.1189 4.66667 18.7124 4.9125 19.15 5.35009C19.5876 5.78767 19.8334 6.38117 19.8334 7V23.3333L14.0001 19.8333L8.16675 23.3333V7C8.16675 6.38117 8.41258 5.78767 8.85017 5.35009C9.28775 4.9125 9.88124 4.66667 10.5001 4.66667Z" stroke="#2C3E50" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="px-2">
                                <div style={{width:'95%',height:'200px',marginTop:'10px'}}>
                                    <img style={{borderRadius:'10px',width:'100%',height:'100%'}} src={imageurl==null?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU":imageurl}/>
                                </div>
                                <p tabIndex="0" className="focus:outline-none text-sm leading-5 py-4 text-gray-600">{description}</p>
                                <div tabIndex="0" className="focus:outline-none flex">
                                    <div className="py-2 px-4 text-xs leading-3 text-indigo-700 rounded-full bg-indigo-100">#dogecoin</div>
                                    <div className="py-2 px-4 ml-3 text-xs leading-3 text-indigo-700 rounded-full bg-indigo-100">#crypto</div>
                                </div>
                            </div>
                            <div className="mt-5">
                               <a style={{cursor:'pointer'}} href={newsurl} target="_blank" className="text-blue-700 hover:text-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Read More</a>
                            </div>
                        </div>
    )
  }
}
