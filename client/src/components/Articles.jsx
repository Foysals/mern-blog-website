import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Articles = () => {

    const [isLoading,setLoading] = useState(true);
    useEffect( ()=>{
      setTimeout (() => {
        setLoading(false);
      },1000);
    },[]);

  const [articles,setArticles] = useState([])
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`http://localhost:8000/api/articles`);
      const body = await result.json();
      console.log(body);
      setArticles(body);   
    };                           
    fetchData();
  }, []); 
  return (
    <>
     <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-3'>
  {articles.map((article, index) => (
    
   <div key={index} className="p-4">
      { isLoading ? <LoadingComponenet/> :
      <div className='h-full border-5 border-gray-200 shadow-cyan-100 shadow-lg border-opacity-60 rounded-lg overflow-hidden'>
        <Link to={`/article/${article.title}`}>
          <img
            className='lg:h-48 md:h-36 w-full object-cover object-center'
            src="public/images/blog1.jpeg" 
            alt='blog'
          />
        </Link>
        <div className='p-6'>
          <Link to={`/article/${article.name}`}>
            <h3 className='text-lg font-medium text-gray-900 mb-3'>
              {article.title || <Skeleton count={5} />}
            </h3>
          </Link>
          <p>
            {article.description.substring(0, 110) || <Skeleton count={10} />}...
          </p>
          <br />
          <div className='flex item-center flex-wrap'>
            <Link
            className='inline-flex items-center px-3 py-5 text-sm font-medium text-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:ring-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            to={`/article/${article.title}`}
            >
              Learn more
            </Link>
          </div>
        </div>
      </div>
      }
    </div>
     
  ))}
</div>

    </>
  );
};

function LoadingComponenet() {
  return (
    <div className="w-[215px] animate-pulse rounded-lg shadow-xl border-[1px]">
      <div className="bg-slate-400/50 rounded w-full h-[168px]"></div>
      <br />
      <section className="flex flex-col gap-3">
        <div>
      <div className="bg-slate-400/50 rounded-full h-5 w-20 my-1"></div>
      <div className="bg-slate-400/50 rounded-full h-5 w-20 my-1"></div>
        </div>
        <div>
      <div className="bg-slate-400/50 rounded-full h-5 w-32 my-1"></div>
      <div className="bg-slate-400/50 rounded-full h-5 w-32 my-1"></div>
        </div>
        <div>
      <div className="bg-slate-400/50 rounded-full h-5 w-38 my-1"></div>
      <div className="bg-slate-400/50 rounded-full h-8 w-16 my-1"></div>
        </div>
      </section>
    </div>
  );
 };


export default Articles;
