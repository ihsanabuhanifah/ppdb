import React from "react";
import Header from "./component/header";
import Artikel from "./component/artikel";

function App() {
 


  return (
    <React.Fragment>
      <div className="antialiased h-screen w-full bg-gray-50 px-16">
        <div className="h-20 w-full">
          <Header></Header>
        </div>
        <div className="grid grid-cols-6 ">
          <div className="col-span-5 grid grid-cols-5 gap-5 overflow-auto px-1 py-5">
            <Artikel
              judul ={"SMK MQ Juara Koding"}
              link = {"https://cdnaz.cekaja.com/media/2020/04/1173_Artikel-CA20_-Situs-belajar-coding-mudah.jpg"}
              alt = {"juaracoding.jpg"}
              konten =
                {"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem error odio ullam magnam tenetur eius"}
            ></Artikel>
            <Artikel
              judul ={"React js untuk Front End Developer"}
              link = {"https://cdnaz.cekaja.com/media/2020/04/1173_Artikel-CA20_-Situs-belajar-coding-mudah.jpg"}
              alt = {"juaracoding.jpg"}
              konten =
                {"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem error odio ullam magnam tenetur eius"}
            ></Artikel>
             <Artikel
              judul ={"React Native vs Flutter"}
              link = {"https://cdnaz.cekaja.com/media/2020/04/1173_Artikel-CA20_-Situs-belajar-coding-mudah.jpg"}
              alt = {"juaracoding.jpg"}
              konten =
                {"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem error odio ullam magnam tenetur eius"}
            ></Artikel>
          </div>
          <div className="col-span-1">
           
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
