import React from 'react'
import Insert from './Insert'

const InsertPage = () => {
    const [images, setImages] = React.useState([]) 
    let insert_images = [];

    const handleInput = e => {
        setImages(Array.from(e.target.files))
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
                    return <Insert key={i} images={hold_images}/>
                } else return "";
            })}
        </div>
    )
}

export default InsertPage
