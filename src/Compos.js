import React,{useState,useEffect} from 'react'
import axios from "axios";
import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";

const Compos = () => {
    useEffect(()=>{
        getData();
    },[]);
    const [productList,setProductList]=useState('');
    const [PrevImages,setPrevImages]=useState([]);
    const [Size,setSize]=useState({});
    const [price,setPrice]=useState('');
    const [sizeCategory,setSizecategory]=useState({});
    const getData=async()=>{
        try{
            const Data=await axios.get("http://localhost:9000/api/products");
            console.log(Data.data.result);
            setProductList(Data.data.result[0]);
            setPrevImages(Data.data.result[0].Image);
            setSize(Data.data.result[0].sizes[0]);
            setSizecategory(Data.data.result[0].categories[0]);
            setPrice(Data.data.result[0].Actual_Price);

        }catch(error){
            console.log(error);
        }
    }

    console.log(Object.keys(Size));
    console.log(Object.keys(sizeCategory));
    const [image,setImage]=useState(0);

    function GoBack(){
      setImage(image-1);
    }
    function GOForward(){
        setImage(image+1);
      }
     const [CategoryforPrice,setCategoryforPrice]=useState(0);
      function PriceRange(val){
        console.log(val);
       console.log(Size[val]);
       setPrice(Number(Size[val]));
      }
  return (
    <div className='d-flex justify-content-center'>
         <div class="d-flex flex-row" style={{width:"50rem"}}>

        <div class="card" style={{width:"25rem"}}>
            <div className='d-flex justify-content-center'>
  <img class="card-img-top" style={{width:"10rem",height:"8rem"}} src={PrevImages[0]} alt="Card image cap"/></div>
  <div class="d-flex justify-content-center">
   <div onClick={GoBack}><IoIosArrowBack />
</div>
{PrevImages.map((val,ind)=>{
    return(
    <div key={ind} style={{width:"3rem",height:"2rem" }} className='mx-1'> <img class="card-img-top" src={val} alt="Card image cap"/> </div>)
})}
  <div onClick={GOForward}><IoIosArrowForward/></div>
  </div>

</div>

<div class="d-flex justify-content-center" style={{width:"25rem"}}>
 <div className='d-flex flex-column'>
    <div className='m-1 '><h4>{productList.productname}</h4></div>
    <div className='m-1 '><h6>{productList.Price_range}</h6></div>
    <div>
        Size : {Object.keys(Size).map((val,ind)=>{
    return(
    <span onClick={()=>PriceRange(val)} key={ind} style={{width:"1rem",height:"1rem" }} className='mx-1 border border-primary'> 
      {val}
     </span>)
})}

    </div>
    <div>

       {Object.keys(sizeCategory)?.map((val,ind)=>{
    return(
    <span onClick={()=>setCategoryforPrice(val)} key={ind} style={{width:"1rem",height:"1rem" }} className='mx-5'> 
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
  <label class="form-check-label" for="flexRadioDefault1">
    {val}
  </label>
     </span>
     
     )
})}

<div>Total : {price}</div>






    </div>
 </div>
</div>

</div>
    </div>
  )
}

export default Compos;
