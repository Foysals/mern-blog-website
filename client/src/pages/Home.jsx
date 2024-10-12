import React, { useEffect, useState } from "react";

const Home = () => {
  
  const [isLoading,setLoading] = useState(true);
  useEffect( ()=>{
    setTimeout (() => {
      setLoading(false);
    },1000);
  },[]);

  return (
    
    <div className='mb-20'>
        { isLoading ? <LoadingComponenet/> :
      <h1 className='sm:text-4xl text-2xl font-bold my-6 text-gray-900'>
        Hello, Welcome to my Blog
      </h1>
      }
     <br />
       { isLoading ? <LoadingParagraph/> :
      <p className='mx-auto leading-relaxed text-base mb-4'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem esse, iste
        consectetur totam sit et neque eos eius corrupti. Accusantium quas ea id
        assumenda illo repellendus quasi unde nam consectetur excepturi dolorem
        eius repudiandae voluptates molestiae asperiores maxime ad maiores modi
        commodi velit nostrum cum, harum culpa aliquid? Quis, deserunt!
      </p>
      }
      <br />
       { isLoading ? <LoadingParagraph/> :
      <p className='mx-auto leading-relaxed text-base mb-4'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem esse, iste
        consectetur totam sit et neque eos eius corrupti. Accusantium quas ea id
        assumenda illo repellendus quasi unde nam consectetur excepturi dolorem
        eius repudiandae voluptates molestiae asperiores maxime ad maiores modi
        commodi velit nostrum cum, harum culpa aliquid? Quis, deserunt!
      </p>
      }
      <br />
       { isLoading ? <LoadingParagraph/> :
      <p className='mx-auto leading-relaxed text-base mb-4'>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum amet
        quibusdam, autem voluptatum odit porro reiciendis ipsam aperiam sint ut
        distinctio nobis est recusandae quasi quos modi soluta illum inventore,
        dolore sed accusantium quia voluptate. Ducimus, provident veniam. Fugit,
        reiciendis aperiam veritatis nostrum, quisquam est molestias animi
        suscipit pariatur assumenda corrupti perferendis, molestiae magnam
        nesciunt perspiciatis commodi vero quibusdam id! Expedita, incidunt.
        Culpa illo enim voluptates maxime voluptate, vel nesciunt natus
        recusandae totam dolorem saepe rerum tempora asperiores eum neque? Enim,
        voluptatum! Quo voluptatum necessitatibus labore esse nobis ratione cum
        aperiam officia rem expedita voluptate animi, rerum aspernatur quidem
        ea.
      </p>
      }
    </div>
  );
};

function LoadingComponenet() {
  return (
    <div className="w-[420px] animate-pulse rounded-lg shadow-xl">
      <div className="bg-slate-400/50 rounded-full w-full h-[30px]"></div>    
    </div>
  );
 };
<br />
 function LoadingParagraph() {
  return (
    <div className="w-[765px] animate-pulse rounded-lg shadow-xl">
      <div className="bg-slate-400/50 rounded-full my-1 w-full h-[30px]"></div>  
      <div className="bg-slate-400/50 rounded-full my-1 w-full h-[30px]"></div>    
      <div className="bg-slate-400/50 rounded-full my-1 w-full h-[30px]"></div>    
      <div className="bg-slate-400/50 rounded-full my-1 w-full h-[30px]"></div>    
      <div className="bg-slate-400/50 rounded-full my-1 w-full h-[30px]"></div>     
    </div>
  );
 };


 



export default Home;
