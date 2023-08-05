import React, { Component } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import Newscard from './newscard';
import Spiner from './spiner.js';

export default class newsitem extends Component {
    constructor(){
        super()
        this.state={
            article:[],
            loading:true,
            the_api:"",
            totalResults:0,
            page:1
        }
      }
      total_one_time
      total_data
      counter=1 
      async componentDidMount(){
       this.updateNews()
     }

    updateNews=async()=>{
        console.log(this.props.api)
        this.setState({article:[],loading:true})
        let fetching=await fetch(this.props.api+"&pageSize=5&page="+this.state.page)
        let data=await fetching.json()
        this.total_data=data.totalResults
        console.log(data.totalResults)
        this.setState({totalResults:data.totalResults})
        this.total_one_time=data.articles.length
        this.setState({article:data.articles,loading:true})
     }
     
     fetchMoreData = async () => {
    
      setTimeout(async() => {
        this.setState({page:this.state.page+1})
        console.log(this.props.api)
          if(this.state.article.length<=95&&this.state.article.length<=this.state.totalResults){
          let fetching=await fetch(this.props.api+"&pageSize=5&page="+this.state.page)
          let data=await fetching.json()
          this.total_data=data.totalResults
          this.setState({totalResults:data.totalResults})
          this.total_one_time=data.articles.length
          this.setState({article:this.state.article.concat(data.articles)})
        }
        else{
          this.setState({loading:false})
        }
          //console.log(this.state.article)
      }, 500);
    }
    
      render() {
        const {api}=this.props
        return (
          <>
          
            <InfiniteScroll
              dataLength={this.state.article.length}
              next={this.fetchMoreData}
              hasMore={this.state.article.length!==this.state.totalResults}
              loader={this.state.loading&&<Spiner/>}
            >
          <div className="focus:outline-none py-8 w-full">
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(385px,1fr))',gridGap:'20px'}}>
              {
              this.state.article.map((element)=>{
                return <Newscard key={element.url} title={element.title} description={element.description} imageurl={element.urlToImage} newsurl={element.url}/>
                })}
                </div>
          </div>
            </InfiniteScroll>
            
            {/* {this.state.loading&&
            <div style={{marginTop:'30px'}}>
            <Spiner/>
            </div>
            } */}
            
      </>
        )
  }
}
