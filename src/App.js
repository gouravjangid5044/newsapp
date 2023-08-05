import React, { Component } from 'react';
import Newsitem from './components/newsitem'
import './App.css';
import LoadingBar from 'react-top-loading-bar';



export default class App extends Component {


  final_arr=[]
  arr = [];
  searchin_arr=[];
  domains_selected_arr=[]
  dummy_arr=["title","content","description"]
  domains_arr=[];
  all_domains=[...this.domains_arr]
  domain_dummy_arr=[]
  language=['Arabic','German','English','Spanish','French','Hebrew','Italian','Dutch','Norwegian','Portuguese','Russian','Swedish','Undefined','Chinese']
  language_code=["ar", "de", "en", "es", "fr", "he", "it", "nl", "no", "pt", "ru", "sv", "ud", "zh"]


  constructor() {
    super();
    const date = new Date();
    const startDate = new Date(); // Get the current date
    const numberOfDays = 31; // Number of days to subtract
    
    startDate.setDate(startDate.getDate() - numberOfDays);
    
    const year = startDate.getFullYear();
    const month = String(startDate.getMonth() + 1).padStart(2, '0');
    const day = String(startDate.getDate()).padStart(2, '0');
    
    const formattedDate = `${year}-${month}-${day}`;
    const today_date = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${(date.getDate()).toString().padStart(2, '0')}`
  
    this.selectRef = React.createRef();
    this.domainRef = React.createRef();
    this.dateRef1 = React.createRef();
    this.dateRef2 = React.createRef();
    this.loadingBarRef = React.createRef();
    this.state = {
      selectedValue: '',
      tags: [],
      searchIn:[],
      search_in_dummy:["title","content","description"],
      domains:[],
      domains_selected:[],
      from_date:"",
      to_date:"",
      news_lang:"",
      sort:"",

      alert:false,
      
      button_confirm:false,

      no_change_min_date:formattedDate,
      min_date:formattedDate,
      max_date:today_date,

      


      final_api:""
    };
  }

  
  final=()=>{
    this.loadingBarRef.current.continuousStart();
    
    this.final_arr.splice(0,this.final_arr.length)

    if(this.state.tags.length!==0){
      let final_tag = this.state.tags.map((item)=>(item)).join(" OR ")
      final_tag="q="+final_tag+"&"
      this.final_arr.push(final_tag)
      ////console.log(final_tag)
    }

    if(this.state.domains_selected.length!==0){
      let final_domains = this.state.domains_selected.map((item)=>(item)).join(",")
      final_domains="domains="+final_domains+"&"
      this.final_arr.push(final_domains)
      ////console.log(final_domains)
    }

    if(this.state.from_date.length!==0){
      let final_from = (this.state.from_date)
      final_from="from="+final_from+"&"
      this.final_arr.push(final_from)
      ////console.log(final_from)
    }

    if(this.state.to_date.length!==0){
      let final_to = (this.state.to_date)
      final_to="to="+final_to+"&"
      this.final_arr.push(final_to)
     // //console.log(final_to)
    }

    if(this.state.news_lang.length!==0){
      let final_lang = (this.state.news_lang)
      final_lang="language="+final_lang+"&"
      this.final_arr.push(final_lang)
      //console.log(final_lang)
    }

    if(this.state.sort.length!==0){
      let final_sort = (this.state.sort)
      final_sort="sortBy="+final_sort+"&"
      this.final_arr.push(final_sort)
      //console.log(final_sort)
    }

    if(this.state.searchIn.length!==0){
      let final_searchin = this.state.searchIn.map((item)=>(item)).join(",")
      final_searchin="searchIn="+final_searchin+"&"
      this.final_arr.push(final_searchin)
      //console.log(final_searchin)
    }

    let merge=this.final_arr.map((item)=>(item)).join("")
    //console.log("-->",merge)

    let val="https://newsapi.org/v2/"+this.state.selectedValue+"/?"+merge+`apikey=YOUR_KEY`

    //console.log(val)

    this.setState({final_api:val},()=>{
      this.loadingBarRef.current.complete();
      //console.log(this.state.final_api)
    })

    fetch(val)
    .then((value)=> {return value.json()})
    .then((value)=>{
      this.domains_arr.splice(0,this.domains_arr.length)
      let all_articles=[...value.articles]

      all_articles.map((element)=>{
        let urls=element.url
        let parsedUrl = new URL(urls);
        let domain = parsedUrl.hostname;

        if(!this.domains_arr.includes(domain.slice(4))){
          this.domains_arr.push(domain.slice(4))
        }
      })

      

      
      ////console.log(parsedUrl)
    
    })
  }
  

  confirm_button=()=>{
    this.setState({button_confirm:true})
  }
  
  select_language=(event)=>{
    this.setState({news_lang:event.target.value},()=>{
      this.final()
    })
  }

  sortBy=(event)=>{
    this.setState({sort:event.target.value},()=>{
      this.final()
    })
  }

  date_from=(event)=>{
    if(event.target.value.length===0)
    {
      this.setState({alert:true})
       setTimeout(()=>{
        this.setState({alert:false})
       },2000)
    }
    else{
      //console.log(event.target.value)
      this.setState({from_date:event.target.value},()=>{
        this.final()
      })
      //console.log(this.state.min_date)
      this.setState({min_date:event.target.value},()=>{
        //console.log(this.state.min_date)
      })
    }
  }

  date_to=(event)=>{
    // this.setState({to_date:event.target.value})
    // //console.log(event.target.value)

    if(event.target.value.length===0)
    {
      this.setState({alert:true})
       setTimeout(()=>{
        this.setState({alert:false})
       },2000)
    }
    else{
      //console.log(event.target.value)
      this.setState({to_date:event.target.value},()=>{
        this.final()
      })
    }
  }

  removeDate=()=>{
    this.setState({from_date:"",to_date:"",button_confirm:false},()=>{
      this.final()
    })
    this.dateRef1.current.value=""
    this.dateRef2.current.value=""
    this.setState({min_date:this.state.no_change_min_date})

  }

  removetags = () => {
    this.dummy_arr=["title","content","description"]

    this.setState({search_in_dummy:this.dummy_arr})
    this.searchin_arr.splice(0, this.searchin_arr.length);
    this.setState({ searchIn: this.searchin_arr });

    this.arr.splice(0, this.arr.length);
    this.setState({ tags: this.arr });
  };

  remove_domain=(index)=>{
    this.domains_arr.push(this.domains_selected_arr[index])
    this.domains_selected_arr.splice(index,1)
    this.setState({domains_selected:this.domains_selected_arr},()=>{
      this.final()
    })
  }
  remove_all_domains=()=>{
    this.domains_selected_arr.splice(0,this.domains_selected_arr.length)
    this.setState({domains:this.domains_selected_arr},()=>{
      this.final()
    })
    this.domains_arr=this.all_domains;
    this.all_domains=[...this.all_domains]
    this.domainRef.current.value = "";
  }

  removesearchin=()=>{
    this.dummy_arr=["title","content","description"]
    this.setState({search_in_dummy:this.dummy_arr})
    this.searchin_arr.splice(0, this.searchin_arr.length);
    this.setState({ searchIn: this.searchin_arr },()=>{
      this.final()
    });
  }

  domains_fun=(value)=>{
    this.domains_selected_arr.push(value) 
    this.domains_arr.splice(this.domains_arr.indexOf(value),1)
    this.domain_dummy_arr.splice(this.domain_dummy_arr.indexOf(value),1)
    this.setState({domains:this.domain_dummy_arr})
    this.setState({domains_selected:this.domains_selected_arr},()=>{
      this.final()
    })
  }
  
  input_domian=(event)=>{
    let text=event.target.value
    if(text.length===0){
      this.domain_dummy_arr.splice(0,this.domain_dummy_arr.length)
      this.setState({domains:this.domain_dummy_arr})
    }
      else{
      this.domain_dummy_arr.splice(0,this.domain_dummy_arr.length)
      for(let i of this.domains_arr){
        if(i.includes(text)){
          this.domain_dummy_arr.push(i)
          this.setState({domains:this.domain_dummy_arr})
        }
      }
    }
  }

  remove_one_tag = (index) =>{
    this.arr.splice(index,1);
    this.setState({tags:this.arr},()=>{
      if(this.state.tags.length!==0)
      {
        this.final()
      }
    })
  }

  remove_one_searchin = (index) =>{
    this.dummy_arr.push(this.searchin_arr[index])
    this.searchin_arr.splice(index,1);
    this.setState({searchIn:this.searchin_arr},()=>{
      this.final()
    })
  }

  handleSelectChange = (event) => {
    // //console.log(event.target.value);
    this.setState({ selectedValue: event.target.value });
  };

  text;
  input_funt = (event) => {
    this.text = event.target.value;
    //  this.setState({tags:this.arr})
  };

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.arr.push(this.text);
      this.setState({ tags: this.arr },()=>{
        this.final()
      });
    }
  };

  searchin=(event)=>{
   this.searchin_arr.push(event.target.value)
  //  //console.log(this.searchin_arr)

    this.setState({searchIn:this.searchin_arr},()=>{
      this.final()
    })

    let index = this.dummy_arr.indexOf(event.target.value);

    if (index > -1) {
      this.dummy_arr.splice(index, 1);

      this.setState({search_in_dummy:this.dummy_arr})
    }
    this.selectRef.current.value = "Select Type";

    // //console.log(this.dummy_arr.map(item=>encodeURIComponent(item)).join(","))
  }

  componentDidMount() {
    // this.loadingBarRef.current.continuousStart();
    // setTimeout(() => {
    //   this.loadingBarRef.current.complete();
    // }, 1050);

  

    
  }


  render() {
  
    return (
      <>
      
      
        <div style={{ display: 'flex', margin: '10px 3%' }}>
            
         
          { this.state.alert &&
            <div style={{position:'absolute',display:'flex',justifyContent:'center',width:'90%'}}>
            <div className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">Alert</span> Please enter valid date
              </div>
            </div>
          </div>
          }

{/* <LoadingBar progress={10} color="#f11946" /> */}
<LoadingBar ref={this.loadingBarRef} color="#f11946" />

          <div style={{ width: '20%', height: '95vh', border: '2px solid red', marginTop: '10px', position: 'fixed', padding: '10px', overflowY: "auto"}}>
            <div>Select Type of news</div>
            <select
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              style={{ borderRadius: '5px', width: '100%' }}
              onChange={this.handleSelectChange}
              required
            >
              <option disabled selected>
                Select Type
              </option>
              <option value={'everything'}>All News </option>
              <option value={'top-headlines'}>Top Headlines </option>
            </select>


            { this.state.selectedValue === "everything" && (
              <>
            {this.arr.length !== 0 && (
              <ul style={{ marginTop: '5px' }}>
                {this.state.tags.map((tag, index) => {
                  return <li style={{display:'flex' , alignItems:'center'}} key={index}>
                    {tag} <button onClick={()=>this.remove_one_tag(index)}><svg className='mt-1' width="24" height="24" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><path d="M 300 262C 310 262 319 266 327 273C 327 273 500 447 500 447C 500 447 673 273 673 273C 680 266 690 262 699 262C 715 262 729 271 735 285C 741 299 738 316 727 327C 727 327 553 500 553 500C 553 500 727 673 727 673C 736 683 740 697 737 710C 733 723 723 733 710 737C 697 740 683 736 673 727C 673 727 500 553 500 553C 500 553 327 727 327 727C 317 736 303 740 290 737C 277 733 267 723 263 710C 260 697 264 683 273 673C 273 673 447 500 447 500C 447 500 273 327 273 327C 263 316 259 300 265 286C 271 271 284 262 300 262C 300 262 300 262 300 262"/></svg></button>
                    </li>;
                })}
                <button
                  type="button"
                  onClick={this.removetags}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-3"
                >
                  Remove All Tags
                </button>
              </ul>
            )}
            
            
            <div className="mb-6 mt-5">
              <label for="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Add Keywords
              </label>
              <input
                type="text"
                id="default-input"
                onKeyDown={this.handleKeyPress}
                onChange={this.input_funt}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div> 


            { this.state.tags.length!==0 && (
              <>
            {
            this.searchin_arr.length !== 0 && (
              <ul style={{ marginTop: '5px' }}>
                {this.state.searchIn.map((tag, index) => {
                  return <li style={{display:'flex' , alignItems:'center'}} key={index}>
                    {tag} <button onClick={()=>this.remove_one_searchin(index)}><svg className='mt-1' width="24" height="24" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><path d="M 300 262C 310 262 319 266 327 273C 327 273 500 447 500 447C 500 447 673 273 673 273C 680 266 690 262 699 262C 715 262 729 271 735 285C 741 299 738 316 727 327C 727 327 553 500 553 500C 553 500 727 673 727 673C 736 683 740 697 737 710C 733 723 723 733 710 737C 697 740 683 736 673 727C 673 727 500 553 500 553C 500 553 327 727 327 727C 317 736 303 740 290 737C 277 733 267 723 263 710C 260 697 264 683 273 673C 273 673 447 500 447 500C 447 500 273 327 273 327C 263 316 259 300 265 286C 271 271 284 262 300 262C 300 262 300 262 300 262"/></svg></button>
                    </li>;
                })}
                <button
                  type="button"
                  onClick={this.removesearchin}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-3"
                >
                  Remove All Searchin
                </button>
              </ul>
            )}
             

            {
              this.state.tags.length!==0 &&
              <>
            <div>Select Where You want to search</div>
            <select
              ref={this.selectRef}
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              style={{ borderRadius: '5px', width: '100%' }}
              onChange={this.searchin}
              required
            >
              <option disabled selected>
                Select Type
              </option>

             {
                this.state.search_in_dummy.map((element,index)=>{
                  return <option value={element}>{element}</option>
                })
             }
            </select>
            </>
            }

            {this.state.domains_selected.length !== 0 && (
              <ul style={{ marginTop: '5px' }}>
                {this.state.domains_selected.map((tag, index) => {
                  return <li style={{display:'flex' , alignItems:'center'}} key={index}>
                    {tag} <button onClick={()=>this.remove_domain(index)}><svg className='mt-1' width="24" height="24" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><path d="M 300 262C 310 262 319 266 327 273C 327 273 500 447 500 447C 500 447 673 273 673 273C 680 266 690 262 699 262C 715 262 729 271 735 285C 741 299 738 316 727 327C 727 327 553 500 553 500C 553 500 727 673 727 673C 736 683 740 697 737 710C 733 723 723 733 710 737C 697 740 683 736 673 727C 673 727 500 553 500 553C 500 553 327 727 327 727C 317 736 303 740 290 737C 277 733 267 723 263 710C 260 697 264 683 273 673C 273 673 447 500 447 500C 447 500 273 327 273 327C 263 316 259 300 265 286C 271 271 284 262 300 262C 300 262 300 262 300 262"/></svg></button>
                    </li>;
                })}
                <button
                  type="button"
                  onClick={this.remove_all_domains}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-3"
                >
                  Remove all domains
                </button>
              </ul>
            )}


             <div className="mt-5">
              <label for="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
               Any Specific domains ?
              </label>
              <input
                ref={this.domainRef}
                type="text"
                id="default-input"
                onChange={this.input_domian}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              
              <ul className="py-2 text-sm text-gray-700 mt-2 dark:text-gray-200">

                {
                  this.state.domains.map((element)=>{
                    return  <li onClick={()=>this.domains_fun(element)}><button>{element}</button></li>
                  })
                }
                
                 {/* <li>Helo2</li> */}
              </ul>
            </div>

            <div className="mb-6 mt-2">
              <label for="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
               Any Specific Date range ?
              </label>

              <label for="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
               From
              </label>
              <input
                ref={this.dateRef1}
                type="date"
                id="default-input"
                onFocus={this.confirm_button}
                onBlur={this.date_from}
                min={`${this.state.min_date}`}
                max={`${this.state.max_date}`}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
               <label for="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              To
              </label>
              <input
                ref={this.dateRef2}
                type="date"
                onFocus={this.confirm_button}
                onBlur={this.date_to}
                id="default-input"
                min={`${this.state.min_date}`}
                max={`${this.state.max_date}`}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            { this.state.button_confirm &&
              <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Confirm Date
            </button> 
             }

             {
             (this.state.from_date.length!==0||this.state.to_date.length!==0) &&
            <button
              onClick={this.removeDate}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Remove Dates
            </button>
            }
             

            {
              
              <>
            <div>Any Specific Language ? </div>
            <select
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              style={{ borderRadius: '5px', width: '100%' }}
              onChange={this.select_language}
            >
              <option disabled selected>
                Language
              </option>

             {
                this.language.map((element,index)=>{
                  return <option value={this.language_code[index]}>{element}</option>
                })
             }
            </select>
            </>
            }


            {
              
              <>
            <div className="mt-3">Sort By</div>
            <select
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              style={{ borderRadius: '5px', width: '100%' }}
              onChange={this.sortBy}
            >
              <option disabled selected>
                Select Sort By
              </option>
              <option value="relevancy">Relevancy : "articles more closely related to q come first."</option>
              <option value="populatrity">populatrity : "articles from popular sources and publishers come first."</option>
              <option value="publishedAt">published At : "newest articles come first."</option>
            </select>
            
            </>
            }</>
            )}</>
            )}


            {this.state.selectedValue === 'top-headlines' && (
              <div>
                {/* Display content for 'top-headlines' selection */}
                <p>This is for 'top-headlines' selection</p>
              </div>
            )}
          
          </div>

          {
            ((this.state.selectedValue.length!==0)&&(this.state.domains_selected.length!==0||this.state.tags.length!==0)) &&
          <div style={{ width: '80%', position: 'relative', left: '20%', margin: '0px 3%' }}>
            <Newsitem key={this.state.final_api} api={this.state.final_api}/>
          </div>
          }
        </div>
      </>
    );
  }
}
