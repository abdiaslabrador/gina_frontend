import React, {Fragment, useContext, useEffect, useState} from "react";
import ondontoCss from './Odontograma.module.css'
import { useRouter } from "next/router";
import PatientManager from "../sidebar/patientManager/PatientManager";
import { odontogramaContext } from "../../../context/odontology/work_table/odontograma/odontogramaContext";
import {ToothInf} from "../../../interface/odontology/odontogramaInf";
import ToothOption from "./toothOption/ToothOption";
import { patientContext } from "../../../context/odontology/patient/patientContext";



const Odontograma = () => {
  const router = useRouter();
  const {getTeethFn, odontogramaEditable, visibleToothOptions, setVisibleToothOptionsModalFn, setSelectedToothFn} = useContext(odontogramaContext);
  const {patient} = useContext(patientContext);
  
  useEffect(()=>{
    async function teethLoading(){
      if(patient){
        await getTeethFn()
      }
    }
    teethLoading()
  },[patient])

  return (
    <Fragment>
      <div className={ondontoCss["container"]}>
      <ToothOption/>
      <div className={ondontoCss["odont__above"]}>
        <div className={ondontoCss["odont__left"]}>
          {odontogramaEditable?.thee_18_to_14.map((ondont_tooth: any, index : any) => (
            <div className={`${ondontoCss["tooth__frame"]} ${ondontoCss["tooth__frame--molar"]}`} 
              key={index}
              onClick={()=>{
                  setSelectedToothFn(ondont_tooth);
                  setVisibleToothOptionsModalFn(true);
            }}>
              <div className={ondontoCss["tooth__dash"]}>
                  <div className={ondontoCss["tooth__dash-options"]}>
                    {(ondont_tooth.e)?
                      <div className={`${(ondont_tooth.e.toLowerCase() == 'r')?ondontoCss["tooth__letter--red"]:ondontoCss["tooth__letter--blue"]}`}>E</div>
                    :null}
                      {(ondont_tooth.m)?
                      <div style={{textTransform: "uppercase"}} className={ondontoCss["tooth__letter--red"]}>{ondont_tooth.m}</div>
                    :null}
                      {(ondont_tooth.question)?
                      <div style={{color:"black"}}>?</div>
                    :null}
                      <div className={ondontoCss["tooth__dash--number"]}>{ondont_tooth.number}</div>
                  </div>
                  <div className={ondontoCss["tooth__line"]}>
                    {(ondont_tooth.line)?
                      <div className={`${ondontoCss["tooth__line-line"]} ${(ondont_tooth.line.toLowerCase() == 'r')?ondontoCss["tooth__bckgd--red"]:ondontoCss["tooth__bckgd--blue"]}`}></div>
                    :
                      null
                    }
                    
                  </div>
              </div>
              <div className={`${ondontoCss["tooth__circle"]} 
                                ${(ondont_tooth.circle)?
                                ((ondont_tooth.circle?.toLowerCase() == 'r')?ondontoCss["tooth__bckgd--red"]:ondontoCss["tooth__bckgd--blue"])
                                  :
                                null}`}>
                                  {/* ondontoCss["tooth__ring"] */}
                  <div className={`${ondontoCss["tooth__ring"]} 
                                  ${(ondont_tooth.ring)?
                                  ((ondont_tooth.ring?.toLowerCase() == 'r')?ondontoCss["tooth__bckgd--red"]:ondontoCss["tooth__bckgd--blue"])
                                    :
                                  null}`}>
                    <div className={`${ondontoCss["tooth__molar_parts"]} ${ondontoCss["tooth"]}`}>
                      <div className={ondontoCss["one"]}>
                        
                        <div className={`${ondontoCss["point"]} 
                        ${((ondont_tooth.toothParts?.one?.toLowerCase() == "r")? ondontoCss["point--red"] : 
                          ((ondont_tooth.toothParts?.one?.toLowerCase() == "b")? ondontoCss["point--blue"] : 
                            ((ondont_tooth.toothParts?.one?.toLowerCase() == "br")? ondontoCss["point--blue_red"] : null)))
                        }`}></div>
                      </div>
                      <div className={ondontoCss["two"]}>
                      <div className={`${ondontoCss["point"]} 
                        ${((ondont_tooth.toothParts?.two?.toLowerCase() == "r")? ondontoCss["point--red"] : 
                          ((ondont_tooth.toothParts?.two?.toLowerCase() == "b")? ondontoCss["point--blue"] : 
                            ((ondont_tooth.toothParts?.two?.toLowerCase() == "br")? ondontoCss["point--blue_red"] : null)))
                        }`}></div>
                      </div>
                      <div className={ondontoCss["three"]}>
                      <div className={`${ondontoCss["point"]} 
                        ${((ondont_tooth.toothParts?.three?.toLowerCase() == "r")? ondontoCss["point--red"] : 
                          ((ondont_tooth.toothParts?.three?.toLowerCase() == "b")? ondontoCss["point--blue"] : 
                            ((ondont_tooth.toothParts?.three?.toLowerCase() == "br")? ondontoCss["point--blue_red"] : null)))
                        }`}></div>
                      </div>
                      <div className={ondontoCss["four"]}>
                      <div className={`${ondontoCss["point"]} 
                        ${((ondont_tooth.toothParts?.four?.toLowerCase() == "r")? ondontoCss["point--red"] : 
                          ((ondont_tooth.toothParts?.four?.toLowerCase() == "b")? ondontoCss["point--blue"] : 
                            ((ondont_tooth.toothParts?.four?.toLowerCase() == "br")? ondontoCss["point--blue_red"] : null)))
                        }`}></div>
                      </div>
                      <div className={ondontoCss["five"]}>
                      <div className={`${ondontoCss["point"]} 
                        ${((ondont_tooth.toothParts?.five?.toLowerCase() == "r")? ondontoCss["point--red"] : 
                          ((ondont_tooth.toothParts?.five?.toLowerCase() == "b")? ondontoCss["point--blue"] : 
                            ((ondont_tooth.toothParts?.five?.toLowerCase() == "br")? ondontoCss["point--blue_red"] : null)))
                        }`}></div>
                      </div>
                    </div>
                  </div>
              </div>
              <div className={ondontoCss["tooth__x"]}>
                {(ondont_tooth.x)?
                <div className={`${ (ondont_tooth.x.toLowerCase() == 'r') ? (ondontoCss["tooth__letter--red"])  : (ondontoCss["tooth__letter--blue"]) }`}>
                    x
                </div>
                :
                null
                }
              
              </div>
            </div>
          ))}

          {odontogramaEditable?.thee_13_to_11.map((ondont_tooth: any, index : any) => (
            <div className={`${ondontoCss["tooth__frame"]} ${ondontoCss["tooth__frame--before"]}`} 
              key={index}
              onClick={()=>{
                  setSelectedToothFn(ondont_tooth);
                  setVisibleToothOptionsModalFn(true);
            }}>
              <div className={ondontoCss["tooth__dash"]}>
                  <div className={ondontoCss["tooth__dash-options"]}>
                    {(ondont_tooth.e)?
                      <div className={`${(ondont_tooth.e.toLowerCase() == 'r')?ondontoCss["tooth__letter--red"]:ondontoCss["tooth__letter--blue"]}`}>E</div>
                    :null}
                      {(ondont_tooth.m)?
                      <div style={{textTransform: "uppercase"}} className={ondontoCss["tooth__letter--red"]}>{ondont_tooth.m}</div>
                    :null}
                      {(ondont_tooth.question)?
                      <div style={{color:"black"}}>?</div>
                    :null}
                      <div className={ondontoCss["tooth__dash--number"]}>{ondont_tooth.number}</div>
                  </div>
                  <div className={ondontoCss["tooth__line"]}>
                    {(ondont_tooth.line)?
                      <div className={`${ondontoCss["tooth__line-line"]} ${(ondont_tooth.line.toLowerCase() == 'r')?ondontoCss["tooth__bckgd--red"]:ondontoCss["tooth__bckgd--blue"]}`}></div>
                    :
                      null
                    }
                    
                  </div>
              </div>
              <div className={`${ondontoCss["tooth__circle"]} 
                                ${(ondont_tooth.circle)?
                                ((ondont_tooth.circle?.toLowerCase() == 'r')?ondontoCss["tooth__bckgd--red"]:ondontoCss["tooth__bckgd--blue"])
                                  :
                                null}`}>
                                  {/* ondontoCss["tooth__ring"] */}
                  <div className={`${ondontoCss["tooth__ring"]} 
                                  ${(ondont_tooth.ring)?
                                  ((ondont_tooth.ring?.toLowerCase() == 'r')?ondontoCss["tooth__bckgd--red"]:ondontoCss["tooth__bckgd--blue"])
                                    :
                                  null}`}>
                    <div className={`${ondontoCss["tooth__before_parts"]} ${ondontoCss["tooth"]}`}>
                      <div className={ondontoCss["one"]}>
                        <div className={`${ondontoCss["point"]} 
                        ${((ondont_tooth.toothParts?.one?.toLowerCase() == "r")? ondontoCss["point--red"] : 
                          ((ondont_tooth.toothParts?.one?.toLowerCase() == "b")? ondontoCss["point--blue"] : 
                            ((ondont_tooth.toothParts?.one?.toLowerCase() == "br")? ondontoCss["point--blue_red"] : null)))
                        }`}></div>
                      </div>
                      <div className={ondontoCss["two"]}>
                      <div className={`${ondontoCss["point"]} 
                        ${((ondont_tooth.toothParts?.two?.toLowerCase() == "r")? ondontoCss["point--red"] : 
                          ((ondont_tooth.toothParts?.two?.toLowerCase() == "b")? ondontoCss["point--blue"] : 
                            ((ondont_tooth.toothParts?.two?.toLowerCase() == "br")? ondontoCss["point--blue_red"] : null)))
                        }`}></div>
                      </div>
                      <div className={ondontoCss["three"]}>
                      <div className={`${ondontoCss["point"]} 
                        ${((ondont_tooth.toothParts?.three?.toLowerCase() == "r")? ondontoCss["point--red"] : 
                          ((ondont_tooth.toothParts?.three?.toLowerCase() == "b")? ondontoCss["point--blue"] : 
                            ((ondont_tooth.toothParts?.three?.toLowerCase() == "br")? ondontoCss["point--blue_red"] : null)))
                        }`}></div>
                      </div>
                      <div className={ondontoCss["four"]}>
                      <div className={`${ondontoCss["point"]} 
                        ${((ondont_tooth.toothParts?.four?.toLowerCase() == "r")? ondontoCss["point--red"] : 
                          ((ondont_tooth.toothParts?.four?.toLowerCase() == "b")? ondontoCss["point--blue"] : 
                            ((ondont_tooth.toothParts?.four?.toLowerCase() == "br")? ondontoCss["point--blue_red"] : null)))
                        }`}>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
              <div className={ondontoCss["tooth__x"]}>
                {(ondont_tooth.x)?
                <div className={`${ (ondont_tooth.x.toLowerCase() == 'r') ? (ondontoCss["tooth__letter--red"])  : (ondontoCss["tooth__letter--blue"]) }`}>
                    x
                </div>
                :
                null
                }
              
              </div>
            </div>
          ))}
        </div>
        <div className={ondontoCss["odont__right"]}>
          {odontogramaEditable?.thee_21_to_23.map((ondont_tooth: any, index : any) => (
                <div className={`${ondontoCss["tooth__frame"]} ${ondontoCss["tooth__frame--before"]}`} 
                  key={index}
                  onClick={()=>{
                      // setSelectedToothFn(ondont_tooth);
                      // setVisibleToothOptionsModalFn(true);
                }}>
                  <div className={ondontoCss["tooth__dash"]}>
                      <div className={ondontoCss["tooth__dash-options"]}>
                        {(ondont_tooth.e)?
                          <div className={`${(ondont_tooth.e.toLowerCase() == 'r')?ondontoCss["tooth__letter--red"]:ondontoCss["tooth__letter--blue"]}`}>E</div>
                        :null}
                          {(ondont_tooth.m)?
                          <div style={{textTransform: "uppercase"}} className={ondontoCss["tooth__letter--red"]}>{ondont_tooth.m}</div>
                        :null}
                          {(ondont_tooth.question)?
                          <div style={{color:"black"}}>?</div>
                        :null}
                          <div className={ondontoCss["tooth__dash--number"]}>{ondont_tooth.number}</div>
                      </div>
                      <div className={ondontoCss["tooth__line"]}>
                        {(ondont_tooth.line)?
                          <div className={`${ondontoCss["tooth__line-line"]} ${(ondont_tooth.line.toLowerCase() == 'r')?ondontoCss["tooth__bckgd--red"]:ondontoCss["tooth__bckgd--blue"]}`}></div>
                        :
                          null
                        }
                        
                      </div>
                  </div>
                  <div className={`${ondontoCss["tooth__circle"]} 
                                    ${(ondont_tooth.circle)?
                                    ((ondont_tooth.circle?.toLowerCase() == 'r')?ondontoCss["tooth__bckgd--red"]:ondontoCss["tooth__bckgd--blue"])
                                      :
                                    null}`}>
                                      {/* ondontoCss["tooth__ring"] */}
                      <div className={`${ondontoCss["tooth__ring"]} 
                                      ${(ondont_tooth.ring)?
                                      ((ondont_tooth.ring?.toLowerCase() == 'r')?ondontoCss["tooth__bckgd--red"]:ondontoCss["tooth__bckgd--blue"])
                                        :
                                      null}`}>
                        <div className={`${ondontoCss["tooth__before_parts"]} ${ondontoCss["tooth"]}`}>
                          <div className={ondontoCss["one"]}>
                            <div className={`${ondontoCss["point"]} 
                            ${((ondont_tooth.toothParts?.one?.toLowerCase() == "r")? ondontoCss["point--red"] : 
                              ((ondont_tooth.toothParts?.one?.toLowerCase() == "b")? ondontoCss["point--blue"] : 
                                ((ondont_tooth.toothParts?.one?.toLowerCase() == "br")? ondontoCss["point--blue_red"] : null)))
                            }`}></div>
                          </div>
                          <div className={ondontoCss["two"]}>
                          <div className={`${ondontoCss["point"]} 
                            ${((ondont_tooth.toothParts?.two?.toLowerCase() == "r")? ondontoCss["point--red"] : 
                              ((ondont_tooth.toothParts?.two?.toLowerCase() == "b")? ondontoCss["point--blue"] : 
                                ((ondont_tooth.toothParts?.two?.toLowerCase() == "br")? ondontoCss["point--blue_red"] : null)))
                            }`}></div>
                          </div>
                          <div className={ondontoCss["three"]}>
                          <div className={`${ondontoCss["point"]} 
                            ${((ondont_tooth.toothParts?.three?.toLowerCase() == "r")? ondontoCss["point--red"] : 
                              ((ondont_tooth.toothParts?.three?.toLowerCase() == "b")? ondontoCss["point--blue"] : 
                                ((ondont_tooth.toothParts?.three?.toLowerCase() == "br")? ondontoCss["point--blue_red"] : null)))
                            }`}></div>
                          </div>
                          <div className={ondontoCss["four"]}>
                          <div className={`${ondontoCss["point"]} 
                            ${((ondont_tooth.toothParts?.four?.toLowerCase() == "r")? ondontoCss["point--red"] : 
                              ((ondont_tooth.toothParts?.four?.toLowerCase() == "b")? ondontoCss["point--blue"] : 
                                ((ondont_tooth.toothParts?.four?.toLowerCase() == "br")? ondontoCss["point--blue_red"] : null)))
                            }`}>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
                  <div className={ondontoCss["tooth__x"]}>
                    {(ondont_tooth.x)?
                    <div className={`${ (ondont_tooth.x.toLowerCase() == 'r') ? (ondontoCss["tooth__letter--red"])  : (ondontoCss["tooth__letter--blue"]) }`}>
                        x
                    </div>
                    :
                    null
                    }
                  
                  </div>
                </div>
          ))}

          {odontogramaEditable?.thee_24_to_28.map((ondont_tooth: any, index : any) => (
                <div className={`${ondontoCss["tooth__frame"]} ${ondontoCss["tooth__frame--molar"]}`} 
  
                  key={index}
                  onClick={()=>{
                      // setSelectedToothFn(ondont_tooth);
                      // setVisibleToothOptionsModalFn(true);
                }}>
                  <div className={ondontoCss["tooth__dash"]}>
                      <div className={ondontoCss["tooth__dash-options"]}>
                        {(ondont_tooth.e)?
                          <div className={`${(ondont_tooth.e.toLowerCase() == 'r')?ondontoCss["tooth__letter--red"]:ondontoCss["tooth__letter--blue"]}`}>E</div>
                        :null}
                          {(ondont_tooth.m)?
                          <div style={{textTransform: "uppercase"}} className={ondontoCss["tooth__letter--red"]}>{ondont_tooth.m}</div>
                        :null}
                          {(ondont_tooth.question)?
                          <div style={{color:"black"}}>?</div>
                        :null}
                          <div className={ondontoCss["tooth__dash--number"]}>{ondont_tooth.number}</div>
                      </div>
                      <div className={ondontoCss["tooth__line"]}>
                        {(ondont_tooth.line)?
                          <div className={`${ondontoCss["tooth__line-line"]} ${(ondont_tooth.line.toLowerCase() == 'r')?ondontoCss["tooth__bckgd--red"]:ondontoCss["tooth__bckgd--blue"]}`}></div>
                        :
                          null
                        }
                        
                      </div>
                  </div>
                  <div className={`${ondontoCss["tooth__circle"]} 
                                    ${(ondont_tooth.circle)?
                                    ((ondont_tooth.circle?.toLowerCase() == 'r')?ondontoCss["tooth__bckgd--red"]:ondontoCss["tooth__bckgd--blue"])
                                      :
                                    null}`}>
                                      {/* ondontoCss["tooth__ring"] */}
                      <div className={`${ondontoCss["tooth__ring"]} 
                                      ${(ondont_tooth.ring)?
                                      ((ondont_tooth.ring?.toLowerCase() == 'r')?ondontoCss["tooth__bckgd--red"]:ondontoCss["tooth__bckgd--blue"])
                                        :
                                      null}`}>
                        <div className={`${ondontoCss["tooth__molar_parts"]} ${ondontoCss["tooth"]}`}>
                          <div className={ondontoCss["one"]}>
                            
                            <div className={`${ondontoCss["point"]} 
                            ${((ondont_tooth.toothParts?.one?.toLowerCase() == "r")? ondontoCss["point--red"] : 
                              ((ondont_tooth.toothParts?.one?.toLowerCase() == "b")? ondontoCss["point--blue"] : 
                                ((ondont_tooth.toothParts?.one?.toLowerCase() == "br")? ondontoCss["point--blue_red"] : null)))
                            }`}></div>
                          </div>
                          <div className={ondontoCss["two"]}>
                          <div className={`${ondontoCss["point"]} 
                            ${((ondont_tooth.toothParts?.two?.toLowerCase() == "r")? ondontoCss["point--red"] : 
                              ((ondont_tooth.toothParts?.two?.toLowerCase() == "b")? ondontoCss["point--blue"] : 
                                ((ondont_tooth.toothParts?.two?.toLowerCase() == "br")? ondontoCss["point--blue_red"] : null)))
                            }`}></div>
                          </div>
                          <div className={ondontoCss["three"]}>
                          <div className={`${ondontoCss["point"]} 
                            ${((ondont_tooth.toothParts?.three?.toLowerCase() == "r")? ondontoCss["point--red"] : 
                              ((ondont_tooth.toothParts?.three?.toLowerCase() == "b")? ondontoCss["point--blue"] : 
                                ((ondont_tooth.toothParts?.three?.toLowerCase() == "br")? ondontoCss["point--blue_red"] : null)))
                            }`}></div>
                          </div>
                          <div className={ondontoCss["four"]}>
                          <div className={`${ondontoCss["point"]} 
                            ${((ondont_tooth.toothParts?.four?.toLowerCase() == "r")? ondontoCss["point--red"] : 
                              ((ondont_tooth.toothParts?.four?.toLowerCase() == "b")? ondontoCss["point--blue"] : 
                                ((ondont_tooth.toothParts?.four?.toLowerCase() == "br")? ondontoCss["point--blue_red"] : null)))
                            }`}></div>
                          </div>
                          <div className={ondontoCss["five"]}>
                          <div className={`${ondontoCss["point"]} 
                            ${((ondont_tooth.toothParts?.five?.toLowerCase() == "r")? ondontoCss["point--red"] : 
                              ((ondont_tooth.toothParts?.five?.toLowerCase() == "b")? ondontoCss["point--blue"] : 
                                ((ondont_tooth.toothParts?.five?.toLowerCase() == "br")? ondontoCss["point--blue_red"] : null)))
                            }`}></div>
                          </div>
                        </div>
                      </div>
                  </div>
                  <div className={ondontoCss["tooth__x"]}>
                    {(ondont_tooth.x)?
                    <div className={`${ (ondont_tooth.x.toLowerCase() == 'r') ? (ondontoCss["tooth__letter--red"])  : (ondontoCss["tooth__letter--blue"]) }`}>
                        x
                    </div>
                    :
                    null
                    }
                  
                  </div>
                </div>
          ))}
        </div>
      </div>
      
      <div className={ondontoCss["odont__below"]}>
        <div className={ondontoCss["odont__left"]}>
          {odontogramaEditable?.thee_48_to_44.map((ondont_tooth: any, index : any) => (
            <div className={`${ondontoCss["tooth__frame"]} ${ondontoCss["tooth__frame--molar"]}`} 

              key={index}
              onClick={()=>{
                  setSelectedToothFn(ondont_tooth);
                  setVisibleToothOptionsModalFn(true);
            }}>
              <div className={ondontoCss["tooth__dash"]}>
                  <div className={ondontoCss["tooth__dash-options"]}>
                    {(ondont_tooth.e)?
                      <div className={`${(ondont_tooth.e.toLowerCase() == 'r')?ondontoCss["tooth__letter--red"]:ondontoCss["tooth__letter--blue"]}`}>E</div>
                    :null}
                      {(ondont_tooth.m)?
                      <div style={{textTransform: "uppercase"}} className={ondontoCss["tooth__letter--red"]}>{ondont_tooth.m}</div>
                    :null}
                      {(ondont_tooth.question)?
                      <div style={{color:"black"}}>?</div>
                    :null}
                      <div className={ondontoCss["tooth__dash--number"]}>{ondont_tooth.number}</div>
                  </div>
                  <div className={ondontoCss["tooth__line"]}>
                    {(ondont_tooth.line)?
                      <div className={`${ondontoCss["tooth__line-line"]} ${(ondont_tooth.line.toLowerCase() == 'r')?ondontoCss["tooth__bckgd--red"]:ondontoCss["tooth__bckgd--blue"]}`}></div>
                    :
                      null
                    }
                    
                  </div>
              </div>
              <div className={`${ondontoCss["tooth__circle"]} 
                                ${(ondont_tooth.circle)?
                                ((ondont_tooth.circle?.toLowerCase() == 'r')?ondontoCss["tooth__bckgd--red"]:ondontoCss["tooth__bckgd--blue"])
                                  :
                                null}`}>
                                  {/* ondontoCss["tooth__ring"] */}
                  <div className={`${ondontoCss["tooth__ring"]} 
                                  ${(ondont_tooth.ring)?
                                  ((ondont_tooth.ring?.toLowerCase() == 'r')?ondontoCss["tooth__bckgd--red"]:ondontoCss["tooth__bckgd--blue"])
                                    :
                                  null}`}>
                    <div className={`${ondontoCss["tooth__molar_parts"]} ${ondontoCss["tooth"]}`}>
                      <div className={ondontoCss["one"]}>
                        
                        <div className={`${ondontoCss["point"]} 
                        ${((ondont_tooth.toothParts?.one?.toLowerCase() == "r")? ondontoCss["point--red"] : 
                          ((ondont_tooth.toothParts?.one?.toLowerCase() == "b")? ondontoCss["point--blue"] : 
                            ((ondont_tooth.toothParts?.one?.toLowerCase() == "br")? ondontoCss["point--blue_red"] : null)))
                        }`}></div>
                      </div>
                      <div className={ondontoCss["two"]}>
                      <div className={`${ondontoCss["point"]} 
                        ${((ondont_tooth.toothParts?.two?.toLowerCase() == "r")? ondontoCss["point--red"] : 
                          ((ondont_tooth.toothParts?.two?.toLowerCase() == "b")? ondontoCss["point--blue"] : 
                            ((ondont_tooth.toothParts?.two?.toLowerCase() == "br")? ondontoCss["point--blue_red"] : null)))
                        }`}></div>
                      </div>
                      <div className={ondontoCss["three"]}>
                      <div className={`${ondontoCss["point"]} 
                        ${((ondont_tooth.toothParts?.three?.toLowerCase() == "r")? ondontoCss["point--red"] : 
                          ((ondont_tooth.toothParts?.three?.toLowerCase() == "b")? ondontoCss["point--blue"] : 
                            ((ondont_tooth.toothParts?.three?.toLowerCase() == "br")? ondontoCss["point--blue_red"] : null)))
                        }`}></div>
                      </div>
                      <div className={ondontoCss["four"]}>
                      <div className={`${ondontoCss["point"]} 
                        ${((ondont_tooth.toothParts?.four?.toLowerCase() == "r")? ondontoCss["point--red"] : 
                          ((ondont_tooth.toothParts?.four?.toLowerCase() == "b")? ondontoCss["point--blue"] : 
                            ((ondont_tooth.toothParts?.four?.toLowerCase() == "br")? ondontoCss["point--blue_red"] : null)))
                        }`}></div>
                      </div>
                      <div className={ondontoCss["five"]}>
                      <div className={`${ondontoCss["point"]} 
                        ${((ondont_tooth.toothParts?.five?.toLowerCase() == "r")? ondontoCss["point--red"] : 
                          ((ondont_tooth.toothParts?.five?.toLowerCase() == "b")? ondontoCss["point--blue"] : 
                            ((ondont_tooth.toothParts?.five?.toLowerCase() == "br")? ondontoCss["point--blue_red"] : null)))
                        }`}></div>
                      </div>
                    </div>
                  </div>
              </div>
              <div className={ondontoCss["tooth__x"]}>
                {(ondont_tooth.x)?
                <div className={`${ (ondont_tooth.x.toLowerCase() == 'r') ? (ondontoCss["tooth__letter--red"])  : (ondontoCss["tooth__letter--blue"]) }`}>
                    x
                </div>
                :
                null
                }
              
              </div>
            </div>
          ))}

          {odontogramaEditable?.thee_43_to_41.map((ondont_tooth: any, index : any) => (
            <div className={`${ondontoCss["tooth__frame"]} ${ondontoCss["tooth__frame--before"]}`} 

              key={index}
              onClick={()=>{
                  setSelectedToothFn(ondont_tooth);
                  setVisibleToothOptionsModalFn(true);
            }}>
              <div className={ondontoCss["tooth__dash"]}>
                  <div className={ondontoCss["tooth__dash-options"]}>
                    {(ondont_tooth.e)?
                      <div className={`${(ondont_tooth.e.toLowerCase() == 'r')?ondontoCss["tooth__letter--red"]:ondontoCss["tooth__letter--blue"]}`}>E</div>
                    :null}
                      {(ondont_tooth.m)?
                      <div style={{textTransform: "uppercase"}} className={ondontoCss["tooth__letter--red"]}>{ondont_tooth.m}</div>
                    :null}
                      {(ondont_tooth.question)?
                      <div style={{color:"black"}}>?</div>
                    :null}
                      <div className={ondontoCss["tooth__dash--number"]}>{ondont_tooth.number}</div>
                  </div>
                  <div className={ondontoCss["tooth__line"]}>
                    {(ondont_tooth.line)?
                      <div className={`${ondontoCss["tooth__line-line"]} ${(ondont_tooth.line.toLowerCase() == 'r')?ondontoCss["tooth__bckgd--red"]:ondontoCss["tooth__bckgd--blue"]}`}></div>
                    :
                      null
                    }
                    
                  </div>
              </div>
              <div className={`${ondontoCss["tooth__circle"]} 
                                ${(ondont_tooth.circle)?
                                ((ondont_tooth.circle?.toLowerCase() == 'r')?ondontoCss["tooth__bckgd--red"]:ondontoCss["tooth__bckgd--blue"])
                                  :
                                null}`}>
                                  {/* ondontoCss["tooth__ring"] */}
                  <div className={`${ondontoCss["tooth__ring"]} 
                                  ${(ondont_tooth.ring)?
                                  ((ondont_tooth.ring?.toLowerCase() == 'r')?ondontoCss["tooth__bckgd--red"]:ondontoCss["tooth__bckgd--blue"])
                                    :
                                  null}`}>
                    <div className={`${ondontoCss["tooth__before_parts"]} ${ondontoCss["tooth"]}`}>
                      <div className={ondontoCss["one"]}>
                        <div className={`${ondontoCss["point"]} 
                        ${((ondont_tooth.toothParts?.one?.toLowerCase() == "r")? ondontoCss["point--red"] : 
                          ((ondont_tooth.toothParts?.one?.toLowerCase() == "b")? ondontoCss["point--blue"] : 
                            ((ondont_tooth.toothParts?.one?.toLowerCase() == "br")? ondontoCss["point--blue_red"] : null)))
                        }`}></div>
                      </div>
                      <div className={ondontoCss["two"]}>
                      <div className={`${ondontoCss["point"]} 
                        ${((ondont_tooth.toothParts?.two?.toLowerCase() == "r")? ondontoCss["point--red"] : 
                          ((ondont_tooth.toothParts?.two?.toLowerCase() == "b")? ondontoCss["point--blue"] : 
                            ((ondont_tooth.toothParts?.two?.toLowerCase() == "br")? ondontoCss["point--blue_red"] : null)))
                        }`}></div>
                      </div>
                      <div className={ondontoCss["three"]}>
                      <div className={`${ondontoCss["point"]} 
                        ${((ondont_tooth.toothParts?.three?.toLowerCase() == "r")? ondontoCss["point--red"] : 
                          ((ondont_tooth.toothParts?.three?.toLowerCase() == "b")? ondontoCss["point--blue"] : 
                            ((ondont_tooth.toothParts?.three?.toLowerCase() == "br")? ondontoCss["point--blue_red"] : null)))
                        }`}></div>
                      </div>
                      <div className={ondontoCss["four"]}>
                      <div className={`${ondontoCss["point"]} 
                        ${((ondont_tooth.toothParts?.four?.toLowerCase() == "r")? ondontoCss["point--red"] : 
                          ((ondont_tooth.toothParts?.four?.toLowerCase() == "b")? ondontoCss["point--blue"] : 
                            ((ondont_tooth.toothParts?.four?.toLowerCase() == "br")? ondontoCss["point--blue_red"] : null)))
                        }`}>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
              <div className={ondontoCss["tooth__x"]}>
                {(ondont_tooth.x)?
                <div className={`${ (ondont_tooth.x.toLowerCase() == 'r') ? (ondontoCss["tooth__letter--red"])  : (ondontoCss["tooth__letter--blue"]) }`}>
                    x
                </div>
                :
                null
                }
              
              </div>
            </div>
          ))}
        </div>
        <div className={ondontoCss["odont__right"]}>
          {odontogramaEditable?.thee_31_to_33.map((ondont_tooth: any, index : any) => (
            <div className={`${ondontoCss["tooth__frame"]} ${ondontoCss["tooth__frame--before"]}`} 

              key={index}
              onClick={()=>{
                  setSelectedToothFn(ondont_tooth);
                  setVisibleToothOptionsModalFn(true);
            }}>
              <div className={ondontoCss["tooth__dash"]}>
                  <div className={ondontoCss["tooth__dash-options"]}>
                    {(ondont_tooth.e)?
                      <div className={`${(ondont_tooth.e.toLowerCase() == 'r')?ondontoCss["tooth__letter--red"]:ondontoCss["tooth__letter--blue"]}`}>E</div>
                    :null}
                      {(ondont_tooth.m)?
                      <div style={{textTransform: "uppercase"}} className={ondontoCss["tooth__letter--red"]}>{ondont_tooth.m}</div>
                    :null}
                      {(ondont_tooth.question)?
                      <div style={{color:"black"}}>?</div>
                    :null}
                      <div className={ondontoCss["tooth__dash--number"]}>{ondont_tooth.number}</div>
                  </div>
                  <div className={ondontoCss["tooth__line"]}>
                    {(ondont_tooth.line)?
                      <div className={`${ondontoCss["tooth__line-line"]} ${(ondont_tooth.line.toLowerCase() == 'r')?ondontoCss["tooth__bckgd--red"]:ondontoCss["tooth__bckgd--blue"]}`}></div>
                    :
                      null
                    }
                    
                  </div>
              </div>
              <div className={`${ondontoCss["tooth__circle"]} 
                                ${(ondont_tooth.circle)?
                                ((ondont_tooth.circle?.toLowerCase() == 'r')?ondontoCss["tooth__bckgd--red"]:ondontoCss["tooth__bckgd--blue"])
                                  :
                                null}`}>
                                  {/* ondontoCss["tooth__ring"] */}
                  <div className={`${ondontoCss["tooth__ring"]} 
                                  ${(ondont_tooth.ring)?
                                  ((ondont_tooth.ring?.toLowerCase() == 'r')?ondontoCss["tooth__bckgd--red"]:ondontoCss["tooth__bckgd--blue"])
                                    :
                                  null}`}>
                    <div className={`${ondontoCss["tooth__before_parts"]} ${ondontoCss["tooth"]}`}>
                      <div className={ondontoCss["one"]}>
                        <div className={`${ondontoCss["point"]} 
                        ${((ondont_tooth.toothParts?.one?.toLowerCase() == "r")? ondontoCss["point--red"] : 
                          ((ondont_tooth.toothParts?.one?.toLowerCase() == "b")? ondontoCss["point--blue"] : 
                            ((ondont_tooth.toothParts?.one?.toLowerCase() == "br")? ondontoCss["point--blue_red"] : null)))
                        }`}></div>
                      </div>
                      <div className={ondontoCss["two"]}>
                      <div className={`${ondontoCss["point"]} 
                        ${((ondont_tooth.toothParts?.two?.toLowerCase() == "r")? ondontoCss["point--red"] : 
                          ((ondont_tooth.toothParts?.two?.toLowerCase() == "b")? ondontoCss["point--blue"] : 
                            ((ondont_tooth.toothParts?.two?.toLowerCase() == "br")? ondontoCss["point--blue_red"] : null)))
                        }`}></div>
                      </div>
                      <div className={ondontoCss["three"]}>
                      <div className={`${ondontoCss["point"]} 
                        ${((ondont_tooth.toothParts?.three?.toLowerCase() == "r")? ondontoCss["point--red"] : 
                          ((ondont_tooth.toothParts?.three?.toLowerCase() == "b")? ondontoCss["point--blue"] : 
                            ((ondont_tooth.toothParts?.three?.toLowerCase() == "br")? ondontoCss["point--blue_red"] : null)))
                        }`}></div>
                      </div>
                      <div className={ondontoCss["four"]}>
                      <div className={`${ondontoCss["point"]} 
                        ${((ondont_tooth.toothParts?.four?.toLowerCase() == "r")? ondontoCss["point--red"] : 
                          ((ondont_tooth.toothParts?.four?.toLowerCase() == "b")? ondontoCss["point--blue"] : 
                            ((ondont_tooth.toothParts?.four?.toLowerCase() == "br")? ondontoCss["point--blue_red"] : null)))
                        }`}>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
              <div className={ondontoCss["tooth__x"]}>
                {(ondont_tooth.x)?
                <div className={`${ (ondont_tooth.x.toLowerCase() == 'r') ? (ondontoCss["tooth__letter--red"])  : (ondontoCss["tooth__letter--blue"]) }`}>
                    x
                </div>
                :
                null
                }
              
              </div>
            </div>
          ))}

          {odontogramaEditable?.thee_34_to_38.map((ondont_tooth: any, index : any) => (
            <div className={`${ondontoCss["tooth__frame"]} ${ondontoCss["tooth__frame--molar"]}`} 
              key={index}
              onClick={()=>{
                  setSelectedToothFn(ondont_tooth);
                  setVisibleToothOptionsModalFn(true);
            }}>
              <div className={ondontoCss["tooth__dash"]}>
                  <div className={ondontoCss["tooth__dash-options"]}>
                    {(ondont_tooth.e)?
                      <div className={`${(ondont_tooth.e.toLowerCase() == 'r')?ondontoCss["tooth__letter--red"]:ondontoCss["tooth__letter--blue"]}`}>E</div>
                    :null}
                      {(ondont_tooth.m)?
                      <div style={{textTransform: "uppercase"}} className={ondontoCss["tooth__letter--red"]}>{ondont_tooth.m}</div>
                    :null}
                      {(ondont_tooth.question)?
                      <div style={{color:"black"}}>?</div>
                    :null}
                      <div className={ondontoCss["tooth__dash--number"]}>{ondont_tooth.number}</div>
                  </div>
                  <div className={ondontoCss["tooth__line"]}>
                    {(ondont_tooth.line)?
                      <div className={`${ondontoCss["tooth__line-line"]} ${(ondont_tooth.line.toLowerCase() == 'r')?ondontoCss["tooth__bckgd--red"]:ondontoCss["tooth__bckgd--blue"]}`}></div>
                    :
                      null
                    }
                    
                  </div>
              </div>
              <div className={`${ondontoCss["tooth__circle"]} 
                                ${(ondont_tooth.circle)?
                                ((ondont_tooth.circle?.toLowerCase() == 'r')?ondontoCss["tooth__bckgd--red"]:ondontoCss["tooth__bckgd--blue"])
                                  :
                                null}`}>
                                  {/* ondontoCss["tooth__ring"] */}
                  <div className={`${ondontoCss["tooth__ring"]} 
                                  ${(ondont_tooth.ring)?
                                  ((ondont_tooth.ring?.toLowerCase() == 'r')?ondontoCss["tooth__bckgd--red"]:ondontoCss["tooth__bckgd--blue"])
                                    :
                                  null}`}>
                    <div className={`${ondontoCss["tooth__molar_parts"]} ${ondontoCss["tooth"]}`}>
                      <div className={ondontoCss["one"]}>
                        
                        <div className={`${ondontoCss["point"]} 
                        ${((ondont_tooth.toothParts?.one?.toLowerCase() == "r")? ondontoCss["point--red"] : 
                          ((ondont_tooth.toothParts?.one?.toLowerCase() == "b")? ondontoCss["point--blue"] : 
                            ((ondont_tooth.toothParts?.one?.toLowerCase() == "br")? ondontoCss["point--blue_red"] : null)))
                        }`}></div>
                      </div>
                      <div className={ondontoCss["two"]}>
                      <div className={`${ondontoCss["point"]} 
                        ${((ondont_tooth.toothParts?.two?.toLowerCase() == "r")? ondontoCss["point--red"] : 
                          ((ondont_tooth.toothParts?.two?.toLowerCase() == "b")? ondontoCss["point--blue"] : 
                            ((ondont_tooth.toothParts?.two?.toLowerCase() == "br")? ondontoCss["point--blue_red"] : null)))
                        }`}></div>
                      </div>
                      <div className={ondontoCss["three"]}>
                      <div className={`${ondontoCss["point"]} 
                        ${((ondont_tooth.toothParts?.three?.toLowerCase() == "r")? ondontoCss["point--red"] : 
                          ((ondont_tooth.toothParts?.three?.toLowerCase() == "b")? ondontoCss["point--blue"] : 
                            ((ondont_tooth.toothParts?.three?.toLowerCase() == "br")? ondontoCss["point--blue_red"] : null)))
                        }`}></div>
                      </div>
                      <div className={ondontoCss["four"]}>
                      <div className={`${ondontoCss["point"]} 
                        ${((ondont_tooth.toothParts?.four?.toLowerCase() == "r")? ondontoCss["point--red"] : 
                          ((ondont_tooth.toothParts?.four?.toLowerCase() == "b")? ondontoCss["point--blue"] : 
                            ((ondont_tooth.toothParts?.four?.toLowerCase() == "br")? ondontoCss["point--blue_red"] : null)))
                        }`}></div>
                      </div>
                      <div className={ondontoCss["five"]}>
                      <div className={`${ondontoCss["point"]} 
                        ${((ondont_tooth.toothParts?.five?.toLowerCase() == "r")? ondontoCss["point--red"] : 
                          ((ondont_tooth.toothParts?.five?.toLowerCase() == "b")? ondontoCss["point--blue"] : 
                            ((ondont_tooth.toothParts?.five?.toLowerCase() == "br")? ondontoCss["point--blue_red"] : null)))
                        }`}></div>
                      </div>
                    </div>
                  </div>
              </div>
              <div className={ondontoCss["tooth__x"]}>
                {(ondont_tooth.x)?
                <div className={`${ (ondont_tooth.x.toLowerCase() == 'r') ? (ondontoCss["tooth__letter--red"])  : (ondontoCss["tooth__letter--blue"]) }`}>
                    x
                </div>
                :
                null
                }
              
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </Fragment>
  );
};

export default Odontograma;