import React, { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../Navbar/Navbar";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";

const UserForm = () => {
  const navigate = useNavigate();
  const [formResponses, setFormResponses] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();
  const form = useSelector((state) => state.Form.forms).filter(
    (e) => e._id === id
  );
  // console.log(form, "form");
  const param = useParams();

  const handleResponseChange = (questionIndex, e) => {
    const updatedResponses = [...formResponses];
    console.log(updatedResponses, "e.target.value");
    updatedResponses[questionIndex] = e.target.value;
    setFormResponses(updatedResponses);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Logic to save the form responses
    // You can update the `formResponses` state or dispatch an action to save the responses
    const responsesWithMeta = formResponses.map((response, index) => {
      const question = form[0].questions[index];
      return {
        questionText: question.questionText,
        answerType: question.answerType,
        formId: id,
        response,
      };
    });
    toast.success("Form submited successfully")
    alert("please check console for answers")
    console.log(responsesWithMeta);
  };

  // console.log(form,"form.questions")
  const renderFormFields = () => {
    return (
      <FormGroup>
        {/* <h2>{filteredData.title}</h2> */}
        {form[0].questions?.map((question, index) => (
          <Grid container key={index} spacing={2}>
            <div className="question-box">
              <Grid item xs={12}>
                <p className="question-text">
                  {index + 1}.{question.questionText}
                  <span className="text-[red]">{question.required && "*"}</span>
                </p>
              </Grid>
              <Grid item xs={12}>
                {question.answerType === "input" && (
                  <TextField
                    variant="standard"
                    required={question.required}
                    type="text"
                    fullWidth
                    className="questions"
                    value={formResponses[index] || ""}
                    onChange={(e) => handleResponseChange(index, e)}
                  />
                )}
                {question.answerType === "radio" && (
                  <RadioGroup
                    aria-label={`radio-${index}`}
                    name={`radio-${index}`}
                    value={formResponses[index] || ""}
                    onChange={(e) => handleResponseChange(index, e)}
                  >
                    {question.options.map((option, optionIndex) => (
                      <FormControlLabel
                        key={optionIndex}
                        value={option}
                        control={<Radio />}
                        label={option}
                      />
                    ))}
                  </RadioGroup>
                )}
                {question.answerType === "checkbox" && (
                  <FormGroup>
                    {question.options.map((option, optionIndex) => (
                      <FormControlLabel
                        key={optionIndex}
                        control={
                          <Checkbox
                            checked={
                              formResponses[index]?.includes(option) || false
                            }
                            onChange={(e) => handleResponseChange(index, e)}
                            name={`checkbox-${index}`}
                            value={option}
                          />
                        }
                        label={option}
                      />
                    ))}
                  </FormGroup>
                )}
                {console.log(question.answerType, "question.answerType")}
              </Grid>
            </div>
          </Grid>
        ))}
        <div className="button-container">
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => navigate("/form")}
          >
            Back
          </Button>
        </div>
      </FormGroup>
    );
  };

  return (
    <>
      <Navbar />
      <div className="max-w-screen-xl mx-auto mt-10 px-3 bg-[#f4f4f9]">
        <form onSubmit={handleFormSubmit} className="p-5">
          {renderFormFields()}
        </form>
        <ToastContainer
                  position="top-center"
                  autoClose={700}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
      </div>
    </>
  );
};

export default UserForm;
