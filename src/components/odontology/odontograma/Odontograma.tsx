import React, {useContext, useEffect, useState} from "react";
import ondontoCss from './Odontograma.module.css'
import { useRouter } from "next/router";
import PatientManager from "../sidebar/patientManager/PatientManager";
// import { authContext } from "../../../context/login/authContext";

const Odontograma = () => {
  const router = useRouter();

  return (
    <div className={ondontoCss["container"]}>
      <div className={ondontoCss["odont"]}>
      <div className={ondontoCss["odont__frame"]}>
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
              <div className={`${ondontoCss["odont__molar_parts"]} ${ondontoCss["tooth"]}`}>
                <div className={ondontoCss["one"]}>
                  	<div className={`${ondontoCss["point"]} ${ondontoCss["point--red_blue"]}`}>
                  &bull;
                    </div>
                </div>
                <div className={ondontoCss["two"]}></div>
                <div className={ondontoCss["three"]}></div>
                <div className={ondontoCss["four"]}></div>
                <div className={ondontoCss["five"]}></div>
              </div>
            </div>
         </div>
      </div>
      <div className={ondontoCss["odont__frame"]}>
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
              <div className={`${ondontoCss["odont__molar_parts"]} ${ondontoCss["tooth"]}`}>
                <div className={ondontoCss["one"]}>
                  	<div className={`${ondontoCss["point"]} ${ondontoCss["point--red"]}`}>
                  &bull;
                    </div>
                </div>
                <div className={ondontoCss["two"]}></div>
                <div className={ondontoCss["three"]}></div>
                <div className={ondontoCss["four"]}></div>
                <div className={ondontoCss["five"]}></div>
              </div>
            </div>
         </div>
      </div>
      <div className={ondontoCss["odont__frame"]}>
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
              <div className={`${ondontoCss["odont__molar_parts"]} ${ondontoCss["tooth"]}`}>
                <div className={ondontoCss["one"]}>
                  	<div className={`${ondontoCss["point"]} ${ondontoCss["point--blue"]}`}>
                  &bull;
                    </div>
                </div>
                <div className={ondontoCss["two"]}></div>
                <div className={ondontoCss["three"]}></div>
                <div className={ondontoCss["four"]}></div>
                <div className={ondontoCss["five"]}></div>
              </div>
            </div>
         </div>
      </div>
      <div className={ondontoCss["odont__frame"]}>
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
              <div className={`${ondontoCss["odont__molar_parts"]} ${ondontoCss["tooth"]}`}>
                <div className={ondontoCss["one"]}>
                  	<div className={`${ondontoCss["point"]} ${ondontoCss["point--red_blue"]}`}>
                  &bull;
                    </div>
                </div>
                <div className={ondontoCss["two"]}></div>
                <div className={ondontoCss["three"]}></div>
                <div className={ondontoCss["four"]}></div>
                <div className={ondontoCss["five"]}></div>
              </div>
            </div>
         </div>
      </div>
      <div className={ondontoCss["odont__frame"]}>
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
              <div className={`${ondontoCss["odont__tooth_parts"]} ${ondontoCss["tooth"]}`}>
                <div className={ondontoCss["one"]}>
                  	<div className={`${ondontoCss["point"]} ${ondontoCss["point--red_blue"]}`}>
                  &bull;
                    </div>
                </div>
                <div className={ondontoCss["two"]}></div>
                <div className={ondontoCss["three"]}></div>
                <div className={ondontoCss["four"]}></div>
              </div>
            </div>
         </div>
      </div>
    </div>
    </div>
  );
};

export default Odontograma;