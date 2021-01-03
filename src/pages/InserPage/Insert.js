import React, {useState, useEffect} from 'react'
import css from "./style.module.css"
import firebase from "./firebase"

const initProgress = {large:0,medium:0,small:0}
const initURL = 
const Insert = ({images}) => {
    const initState = {
        code : "c-",
        large : images[1],
        medium : images[0],
        small : images[2],
        type : "shirt",
        gender : "man",
        name : "Цамц",
        brand : "93//KIDULT",
        price : 99999,
        total_price : 79999,
        s : "2",
        m : "3",
        l : "5",
        xl :"1",
        isSpecial : false
    }

    const [state, setState] = useState(initState);
    const [inserting, setInserting] = useState(false)
    const [finished, setFinished] = useState(false);
    const [error, setError] = useState(null)
    const [URL, setURL] = useState(initURL)
    const [progress, setProgress] = useState(initProgress)

    useEffect(() => {
        console.log("effect",URL)
        if(URL.large_url != "" && URL.medium_url != "" && URL.small_url != ""){
            console.log("db ruu hadgalj ehellee ");
            saveToDataBase();
        }
    }, [URL]);

    const handleInput  = e => {
        if(e.target.type == 'file')
        setState({...state, [e.target.name] : e.target.files[0]})
        else
        setState({...state, [e.target.name] : e.target.value})
    }

    const getImage = file => {
        const img = require("../../assets/Brands/93kidult/" + file.name).default
        return img;
    }
    const handleSubmit = e => {
        e.preventDefault();
        setInserting(true)
        // console.log("========> " , state);
        const storageRef = firebase.storage().ref();
        const imagesRef = storageRef.child("images");
        const productRef = imagesRef.child(state.code);

        let uploadTask_large = productRef.child(state.code + "_large").put(state.large);

        uploadTask_large.on("state_changed", (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress({...progress, large : progress})
          }, (error) => {
            setError(error);
        }, function() {
          // Upload completed successfully, now we can get the download URL
          uploadTask_large.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            setURL(prevUrl =>  ({...prevUrl, large_url : downloadURL}));
          })
        });
        
        let uploadTask_medium = productRef.child(state.code + "_medium").put(state.medium);
        
        uploadTask_medium.on("state_changed", (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress({...progress, medium : progress})
          }, (error) => {
            setError(error);
        }, function() {
          // Upload completed successfully, now we can get the download URL
          uploadTask_medium.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            setURL(prevUrl =>  ({...prevUrl, medium_url : downloadURL}));
          })
        });

        let uploadTask_small = productRef.child(state.code + "_small").put(state.small);
        
        uploadTask_small.on("state_changed", (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress({...progress, small : progress})
          }, (error) => {
            setError(error);
        }, function() {
          // Upload completed successfully, now we can get the download URL
          uploadTask_small.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            setURL(prevUrl =>  ({...prevUrl, small_url : downloadURL}));
          })
        });
    }
    const saveToDataBase = () => {
        const obj = {
            product_code : state.code,
            img : {
                large : URL.large_url,
                medium : URL.medium_url,
                small : URL.small_url
            },
            categories : [
                "clothes", state.gender, state.type
            ],
            gender : state.gender,
            type : state.type,
            name : state.name,
            brand : state.brand,
            price : state.price,
            total_price : state.total_price,
            size : ["s","m","l","xl"],
            size_quantity : {
                s : state.s,
                m : state.m,
                l : state.l,
                xl : state.xl
            },
            isSpecial : state.isSpecial
        }
    
        firebase.database().ref().child("products/clothes").push(obj, err => {
            if(err)
            setError(err)
            else  {
                setInserting(false)
                setFinished(true)
                URL = initURL;
                progress = initProgress
            }
        })
    }
    return (
            <div className={`w-screen p-10 ${inserting ? "bg-green-100" : "bg-gray-100"} ${finished && "bg-blue-200"}`}>
            <form onSubmit={handleSubmit} className={css.InsertForm + " flex flex-row justify-between items-center"}>
                <section>
                    <span>
                        <div>
                            <div className="flex flex-col mr-5">
                                <label htmlFor="large">large {state.large.name.slice(state.large.name.length - 10)}</label>
                                {inserting && <progress value={progress.large} max="100"/>}
                            </div>
                            {/* <input ref={large} onChange={handleInput} type="file" name="large" id="large" value={changeFileName("large", images[0])} /> */}
                            <img src={getImage(state.large)} alt="" className="w-24"/>
                            
                        </div>
                        <div>
                            <div className="flex flex-col mr-5">
                                <label htmlFor="medium">medium {state.medium.name.slice(state.medium.name.length - 10)}</label>
                                {inserting && <progress value={progress.medium} max="100" />}
                            </div>
                            {/* <input onChange={handleInput} type="file" name="medium" id="medium" /> */}
                            <img src={getImage(state.medium)} alt="" className="w-24"/>
                            
                        </div>
                        <div>
                            <div className="flex flex-col mr-5">
                                <label htmlFor="small">small {state.small.name.slice(state.small.name.length - 10)}</label>
                                {inserting && <progress value={progress.small} max="100" />}
                            </div>
                            {/* <input onChange={handleInput} type="file" name="small" id="small" />     */}
                            <img src={getImage(state.small)} alt="" className="w-24"/>
                        </div>
                    </span>
                </section>
                <section>
                    <div>
                        <label htmlFor="code">Барааны code</label>
                        <input onChange={handleInput} type="text" name="code" id="code" value={state.code}/>
                    </div>
                    <div>
                        <label htmlFor="name">Барааны name</label>
                        <input onChange={handleInput} type="text" name="name" id="name" value={state.name}/>
                    </div>
                    <div>
                        <label htmlFor="gender">Gender</label>
                        <select  onChange={handleInput} id="gender" name="gender" value={state.gender}>
                            <option value="man">man</option>
                            <option value="woman">woman</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="isSpecial">isSpecial</label>
                        <select  onChange={handleInput} id="isSpecial" name="isSpecial" value={state.isSpecial}>
                            <option value="true">true</option>
                            <option  value="false">false</option>
                        </select>
                    </div>
                </section>
                <section>
                    <div>
                        <label htmlFor="type">Type</label>
                        <select  onChange={handleInput} id="type" name="type" value={state.type}>
                            <option value="shirt">shirt</option>
                            <option value="pants">pants</option>
                            <option value="jacket">jacket</option>
                            <option value="t-shirt">t-shirt</option>
                            <option value="shoes">shoes</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="brand">Brand</label>
                        <input onChange={handleInput} type="text" name="brand" id="brand" value={state.brand}/>
                    </div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input onChange={handleInput} type="number" name="price" id="price" value={state.price}/>
                    </div>
                    <div>
                        <label htmlFor="total_price">total_price</label>
                        <input onChange={handleInput} type="number" name="total_price" id="total_price" value={state.total_price}/>
                    </div>
                </section>
                <section>
                    <div>
                        <label htmlFor="s">s</label>
                        <input onChange={handleInput} type="text" name="s" id="s" value={state.s}/>
                    </div>
                    <div>
                        <label htmlFor="m">m</label>
                        <input onChange={handleInput} type="text" name="m" id="m" value={state.m}/>
                    </div>
                    <div>
                        <label htmlFor="l">l</label>
                        <input onChange={handleInput} type="text" name="l" id="l" value={state.l}/>
                    </div>
                    <div>
                        <label htmlFor="xl">xl</label>
                        <input onChange={handleInput} type="text" name="xl" id="xl" value={state.xl}/>
                    </div>
                </section>
                <section>
                    <input type="submit" value="insert" />
                    {error}
                </section>
            </form>
        </div>
    )
}

export default Insert
