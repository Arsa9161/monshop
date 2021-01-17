import React from "react";
import Insert from "./Insert";
import firebase from "../../firebase";

const InsertPage = () => {
  // oruulsan olon zuragnuudiig hadgalna
  const [images, setImages] = React.useState([]);

  // hadgalsan baraanuudiin code iig db ees unshij hadgalna. ene ni shine baraa nemehed hereglegdene
  let [savedProducts, setSavedProducts] = React.useState([]);

  // hadgalsan baraanii zuragnii toog uund ijil index tei hadgalna. ene ni storage deer zurag oruulahad ner davhtsahaas sergiilehed hereglegdene
  let [imgCounts, setImgCounts] = React.useState([]);

  // hold array
  let insert_images = [];

  React.useEffect(() => {
    const clothesRef = firebase.database().ref("products/clothes");

    // child added uyd 2 array g nemegduulne
    clothesRef.on("child_added", (snap) => {
      let data = snap.val();

      setSavedProducts((prev) => [...prev, data.product_code]);
      setImgCounts((prev) => [...prev, data.img.large.length]);
    });
    // herev zurag nemegdvel array dah zurgiin toog dahin uurchilnu. ene ni storage d upload hiihed heregtei
    clothesRef.on("child_changed", (snap) => {
      let data = snap.val();

      savedProducts.forEach((el, i) => {
        if (el == data.product_code) {
          let arr = [...setImgCounts];
          arr[i] = data.img.large.length;
          setImgCounts(arr);
        }
      });
      setSavedProducts((prev) => [...prev, data.product_code]);
      setImgCounts((prev) => [...prev, data.img.large.length]);
    });
  }, []);

  const handleInput = (e) => {
    setImages(Array.from(e.target.files));
  };

  // nemegdeh gej bui baraanii code iig hadgalagdsan baraanuudtai jishine. Herev umnu ni tuhain baraag hadgalsan bval img object-oos ni hadgalsan zuragnii toog ni butsaana. ene ni db save hiih esvel update hiihiig shiidehed tuslana
  const checkExist = (code) => {
    let res = -1;

    savedProducts.forEach((el, i) => {
      if (el == code) {
        res = imgCounts[i];
      }
    });
    return res;
  };

  return (
    // <Insert />
    // oruulsan zuragnuudiig 3 3 aar ni component bolgono
    <div className="p-10 w-screen flex flex-col space-y-5 m-auto">
      {images.length == 0 && (
        <form>
          <input
            type="file"
            multiple
            name="file"
            id="file"
            onChange={handleInput}
          />
        </form>
      )}

      {images.map((el, i) => {
        insert_images.push(el);

        if (i % 3 == 2) {
          let hold_images = insert_images;
          insert_images = [];
          return (
            <Insert key={i} images={hold_images} checkExist={checkExist} />
          );
        } else return "";
      })}
    </div>
  );
};

export default InsertPage;
