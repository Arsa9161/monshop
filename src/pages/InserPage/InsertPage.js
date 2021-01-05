import React from 'react'
import Insert from './Insert'
import firebase from "../../firebase"

const InsertPage = () => {
    const [images, setImages] = React.useState([]) 
    let [savedProducts, setSavedProducts] = React.useState([])
    let [imgCounts, setImgCounts] = React.useState([]);
    let insert_images = [];

    React.useEffect(() => {
        const clothesRef = firebase.database().ref("products/clothes")

        clothesRef.on("child_added", snap => {
            let data = snap.val();

            setSavedProducts(prev => [...prev, data.product_code])
            setImgCounts(prev => [...prev, data.img.large.length])
            console.log(savedProducts,imgCounts);
        })
        clothesRef.on("child_changed", snap => {
            let data = snap.val();

            savedProducts.forEach( (el, i) => {
                if(el == data.product_code) {
                    let arr = [...setImgCounts];
                    arr[i] = data.img.large.length
                    setImgCounts(arr)
                }
            })
            setSavedProducts(prev => [...prev, data.product_code])
            setImgCounts(prev => [...prev, data.img.large.length])
            console.log(savedProducts,imgCounts);
        })
    }, [])


    const handleInput = e => {
        setImages(Array.from(e.target.files))
    }

    const checkExist = code => {
        let res = -1;

        console.log("gol ezen ================== ");
        console.log(savedProducts);
        savedProducts.forEach( (el,i) => {
            if(el == code) {
                console.log("yes " + el + ' too ni ' + imgCounts[i]);
                res =  imgCounts[i];
            }
        })
        console.log('check dotor zurgiin too ni : ' + res);
        return res
    }

    const saveCode = code => {
        savedProducts.push(code);
    }
    // const getImage = (path) => {
    //     const images = require.context('../../assets/Brands/93kidult', true);
    //     let img = images('./' + 'shar.jpg');
    //     return img
    // }

    return (
        // <Insert />   
        <div className="p-10 w-screen flex flex-col space-y-5 m-auto">

            {images.length == 0 && 
                <form>
                    <input type="file" multiple name="file" id="file" onChange={handleInput}/>
                </form>
            }

        
            {images.map((el, i) => {
                insert_images.push(el)
               
                if(i % 3 == 2) {
                    let hold_images = insert_images; 
                    insert_images = [];
                    return <Insert key={i} images={hold_images} checkExist={checkExist} />
                } else return "";
            })}
        </div>
    )
}

export default InsertPage
