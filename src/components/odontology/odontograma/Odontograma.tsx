import React, {Fragment, useContext, useEffect, useState} from "react";
import ondontoCss from './Odontograma.module.css'
import { useRouter } from "next/router";
import PatientManager from "../sidebar/patientManager/PatientManager";
// import { authContext } from "../../../context/login/authContext";

const Odontograma = () => {
  const router = useRouter();

  let molar={
    number: 18,
    e:"",
    m:'',
    question: true,
    line: "",
    circle: "",
    ring: "",
    x: "",
    parts:{
              one: "",
              two: "",
              three: "",
              four: "",
              five: ""
          }
  }

  return (
    <div className={ondontoCss["container"]}>
      <div className={ondontoCss["odont"]}>
      <div className={ondontoCss["tooth__frame"]}>
         <div className={ondontoCss["tooth__dash"]}>
            <div className={ondontoCss["tooth__dash-options"]}>
              {(molar.e)?
                <div className={`${(molar.e.toLowerCase() == 'r')?ondontoCss["tooth__letter--red"]:ondontoCss["tooth__letter--blue"]}`}>E</div>
              :null}
                {(molar.m)?
                <div className={ondontoCss["tooth__letter--red"]}>{molar.m}</div>
              :null}
                {(molar.question)?
                <div style={{color:"black"}}>?</div>
              :null}
                <div className={ondontoCss["tooth__dash--number"]}>18</div>
            </div>
            <div className={ondontoCss["tooth__line"]}>
              {(molar.line)?
                <div className={`${ondontoCss["tooth__line-line"]} ${(molar.line.toLowerCase() == 'r')?ondontoCss["tooth__bckgd--red"]:ondontoCss["tooth__bckgd--blue"]}`}></div>
              :
                null
              }
              
            </div>
         </div>
         <div className={`${ondontoCss["tooth__circle"]} 
                          ${(molar.circle)?
                           ((molar.circle?.toLowerCase() == 'r')?ondontoCss["tooth__bckgd--red"]:ondontoCss["tooth__bckgd--blue"])
                            :
                           null}`}>
                            {/* ondontoCss["tooth__ring"] */}
            <div className={`${ondontoCss["tooth__ring"]} 
                             ${(molar.ring)?
                             ((molar.ring?.toLowerCase() == 'r')?ondontoCss["tooth__bckgd--red"]:ondontoCss["tooth__bckgd--blue"])
                              :
                             null}`}>
              <div className={`${ondontoCss["tooth__molar_parts"]} ${ondontoCss["tooth"]}`}>
                <div className={ondontoCss["one"]}>
                  
                  <div className={`${ondontoCss["point"]} 
                  ${((molar.parts.one?.toLowerCase() == "r")? ondontoCss["point--red"] : 
                     ((molar.parts.one?.toLowerCase() == "b")? ondontoCss["point--blue"] : 
                      ((molar.parts.one?.toLowerCase() == "br")? ondontoCss["point--blue_red"] : null)))
                  }`}></div>
                </div>
                <div className={ondontoCss["two"]}>
                <div className={`${ondontoCss["point"]} 
                  ${((molar.parts.two?.toLowerCase() == "r")? ondontoCss["point--red"] : 
                     ((molar.parts.two?.toLowerCase() == "b")? ondontoCss["point--blue"] : 
                      ((molar.parts.two?.toLowerCase() == "br")? ondontoCss["point--blue_red"] : null)))
                  }`}></div>
                </div>
                <div className={ondontoCss["three"]}>
                <div className={`${ondontoCss["point"]} 
                  ${((molar.parts.three?.toLowerCase() == "r")? ondontoCss["point--red"] : 
                     ((molar.parts.three?.toLowerCase() == "b")? ondontoCss["point--blue"] : 
                      ((molar.parts.three?.toLowerCase() == "br")? ondontoCss["point--blue_red"] : null)))
                  }`}></div>
                </div>
                <div className={ondontoCss["four"]}>
                <div className={`${ondontoCss["point"]} 
                  ${((molar.parts.four?.toLowerCase() == "r")? ondontoCss["point--red"] : 
                     ((molar.parts.four?.toLowerCase() == "b")? ondontoCss["point--blue"] : 
                      ((molar.parts.four?.toLowerCase() == "br")? ondontoCss["point--blue_red"] : null)))
                  }`}></div>
                </div>
                <div className={ondontoCss["five"]}>
                <div className={`${ondontoCss["point"]} 
                  ${((molar.parts.five?.toLowerCase() == "r")? ondontoCss["point--red"] : 
                     ((molar.parts.five?.toLowerCase() == "b")? ondontoCss["point--blue"] : 
                      ((molar.parts.five?.toLowerCase() == "br")? ondontoCss["point--blue_red"] : null)))
                  }`}></div>
                </div>
              </div>
            </div>
         </div>
         <div className={ondontoCss["tooth__x"]}>
          {(molar.x)?
          <div className={`${ (molar.x.toLowerCase() == 'r') ? (ondontoCss["tooth__letter--red"])  : (ondontoCss["tooth__letter--blue"]) }`}>
              x
          </div>
          :
          null
          }
         
         </div>
      </div>

      {/* normal tooth */}
      {/* <div className={ondontoCss["odont__frame"]}>
         <div className={ondontoCss["odont__dash"]}>
            <div>E</div>
            <div>M</div>
            <div>?</div>
            <div>X</div>
            <div>18</div>
         </div>
         <div className={ondontoCss["odont__circle"]}>
            <div className={ondontoCss["odont__line"]}>
            </div>
            <div className={ondontoCss["odont__ring"]}>
              <div className={`${ondontoCss["odont__before_parts"]} ${ondontoCss["tooth"]}`}>
                <div className={ondontoCss["one"]}>
                </div>
                <div className={ondontoCss["two"]}>
                  	<div className={`${ondontoCss["point"]} ${ondontoCss["point--blue_red"]}`}>
                      &bull;
                    </div>
                </div>
                <div className={ondontoCss["three"]}></div>
                <div className={ondontoCss["four"]}></div>
              </div>
            </div>
         </div>
      </div> */}
    </div>
    </div>
  );
};

export default Odontograma;