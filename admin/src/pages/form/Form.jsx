import React from "react";
import { v1 as uuidv1 } from "uuid";
import plusimage from "../../images/plus.svg";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getForm } from "../../redux/actions/formActions";
import FormImg from "../../images/form.png";

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const forms = useSelector((state) => state.Form.forms);
  const createForm = () => {
    const id = uuidv1();
    navigate("/form/" + id);
  };
  const viewForm = (id) => {
    navigate("/view/form/" + id);
  };

  useEffect(() => {
    dispatch(getForm());
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto mt-10 px-3 bg-[#f4f4f9]">
      <div className="p-3">
        <h1 className="text-center text-xl">Start a new form</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 mt-5">
          <div className="mt-5 ">
            <img
              onClick={createForm}
              className="cursor-pointer ring-1 ring-black bg-white h-[150px] w-[150px]"
              src={plusimage}
              alt=""
            />
            <span className="text-center mt-3">Blank</span>
          </div>
          {forms.map((e,i) => (
            // console.log(e)
            <div key={i} className="mt-5 cursor-pointer ring-1 ring-black bg-white h-[150px] w-[150px]">
              <img
                onClick={() => viewForm(e._id)}
                className="cursor-pointer ring-1 ring-black bg-white h-[150px] w-[150px]"
                src={FormImg}
                alt=""
              />
              <span className="text-center mt-3">{e?.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Form;
