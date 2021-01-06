import React, {useState, useEffect} from 'react'
import css from "./style.module.css"
import firebase from "../../firebase"

// upload hiih uyd upload task iin complete huviig haruulahad hereglene
const initProgress = {large:0,medium:0,small:0}

// 3 zuragnii url uud
const initURL = {large_url : "", medium_url : "", small_url : ""}

const Insert = ({images, checkExist}) => {
    const initState = {
        code : "c-",
        large : images[0],
        medium : images[1],
        small : images[2],
        type : "shirt",
        gender : "man",
        name : "Цамц",
        brand : "93//KIDULT",
        price : 99999,
        total_price : 79999,
        s : Math.floor(Math.random() * 5),
        m : Math.floor(Math.random() * 5),
        l : Math.floor(Math.random() * 5),
        xl :Math.floor(Math.random() * 5),
        isSpecial : false
    }

    const [state, setState] = useState(initState);
    const [inserting, setInserting] = useState(false)
    const [finished, setFinished] = useState(false);
    const [error, setError] = useState(null)
    let [URL, setURL] = useState(initURL)
    let [progress, setProgress] = useState(initProgress)
    // ene baraa umnu hadgalagdsan eseh
    let [isExist, setIsExist] = useState(null)

    // hadgalagdsan bol img object d ni bga zuragnii too. ene ni storage ruu upload hiihed ner davhtsahaas sergiilne
    let [imgCount, setImgCount] = useState(0)

    // 3 URL state d bichigdsnii daraa db ruu hiine
    useEffect(() => {
        if(URL.large_url != "" && URL.medium_url != "" && URL.small_url != ""){
            // db d bgaa bol update 
            if(isExist) {
                updateDataBase();
            } else {
                saveToDataBase();
            }
        }
    }, [URL]);

    // checkExist func-r shalgaj isExist-iig uurchiluhud udaan soligdood hugatsaa zurj bsn tul effec ashiglaad isExist true or false uyd buyu !=null uyd l upload ehelne
    useEffect(() => {
        if(isExist != null) {
            const storageRef = firebase.storage().ref();
            const imagesRef = storageRef.child("images");
            const productRef = imagesRef.child(state.code);
            startUpload(productRef)
        }
    }, [isExist])

    const handleInput  = e => {
        if(e.target.type == 'file')
        setState({...state, [e.target.name] : e.target.files[0]})
        else
        setState({...state, [e.target.name] : e.target.value})
    }

    // default dotor ni build hiigdsnii daraah url bdg shuu!!!
    const getImage = file => {
        const img = require("../../assets/Brands/93kidult/" + file.name).default
        return img;
    }

    const upload = (productRef, size) => {
        let path = `${size}/${state.code}_${size}`

        if(isExist) {
            path += '-' + imgCount
        }
        let uploadTask = productRef.child(path).put(state[size]);
        
        uploadTask.on("state_changed", (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress({...progress, [size] : progress})
          }, (error) => {
            setError(error);
        }, function() {
          // Upload completed successfully, now we can get the download URL
          const url = size + "_url";
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            setURL(prevUrl =>  ({...prevUrl, [url] : downloadURL}));
          })
        });
    }

    const startUpload = productRef => {
        upload(productRef, "large")
        upload(productRef, "medium")
        upload(productRef, "small")
    }

    const handleSubmit = e => {
        e.preventDefault();

        let res = checkExist(state.code);
        
        // herev baraa exist bval img object doh zurgiin urt butsah tul !=-1 bval umnu ni hadgalagdsan bga gsn ug
        setIsExist(res != -1)
     
        // storage deh file iin ardah too ni umnuh file -iin ardah toonoos negeer ih bval cache lehgui
        setImgCount(res + 1);
        
        setInserting(true)
    }

    const updateDataBase = () => {

        const clothesRef = firebase.database().ref("products/clothes");
        const product = clothesRef.orderByChild("product_code").equalTo(state.code)
 
        product.once("value", snap => {
 
             let o = snap.val();
             let key = Object.entries(o)[0][0];
             let img = o[key].img;
  
             img.large.push(URL.large_url);
             img.medium.push(URL.medium_url);
             img.small.push(URL.small_url);
 
             clothesRef.child(key).child("img").set(img, err => err ?  console.log(err) : restart())
        },
        err =>  console.log(err))
    }

    const saveToDataBase = () => {
        let size_quantity = {}
        if(state.s > 0) size_quantity.s = state.s
        if(state.m > 0) size_quantity.m = state.m
        if(state.l > 0) size_quantity.l = state.l
        if(state.xl > 0) size_quantity.xl = state.xl

        const obj = {
            product_code : state.code,
            img : {
                large : [URL.large_url],
                medium : [URL.medium_url],
                small : [URL.small_url]
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
            size_quantity,
            isSpecial : state.isSpecial
        }
    
        firebase.database().ref().child("products/clothes").push(obj, err => {
            if(err)
            setError(err)
            else  {
                restart();
            }
        })
    }
    const restart = () => {

        setInserting(false)
        setFinished(true)
        setURL(initURL);
        setProgress(initProgress) 
        setIsExist(null)
        setImgCount(0)
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
                            <img src={getImage(state.large)} alt="" className="w-24"/>
                        </div>
                        <div>
                            <div className="flex flex-col mr-5">
                                <label htmlFor="medium">medium {state.medium.name.slice(state.medium.name.length - 10)}</label>
                                {inserting && <progress value={progress.medium} max="100" />}
                            </div>
                            <img src={getImage(state.medium)} alt="" className="w-24"/>
                            
                        </div>
                        <div>
                            <div className="flex flex-col mr-5">
                                <label htmlFor="small">small {state.small.name.slice(state.small.name.length - 10)}</label>
                                {inserting && <progress value={progress.small} max="100" />}
                            </div>
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
