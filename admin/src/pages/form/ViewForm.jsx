import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

const Viewform = () => {
  const navigate = useNavigate();
  const [formResponses, setFormResponses] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();
  const form = useSelector((state) => state.Form.forms).filter(
    (e) => e._id === id
  );
  const param = useParams();

  const handleResponseChange = (questionIndex, e) => {
    const updatedResponses = [...formResponses];
    updatedResponses[questionIndex] = e.target.value;
    setFormResponses(updatedResponses);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const responsesWithMeta = formResponses.map((response, index) => {
      const question = form[0].questions[index];
      return {
        questionText: question.questionText,
        answerType: question.answerType,
        formId: id,
        response,
      };
    });
    console.log(responsesWithMeta);
  };

  const renderFormFields = () => (
    <FormGroup>
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
                      control={<Radio required={question.required} />} // Place required here
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
                          required={question.required} // Place required here
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
            </Grid>
          </div>
        </Grid>
      ))}
      <div className="button-container">
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

  return (
    <>
      <Navbar />
      <div className="max-w-screen-xl mx-auto mt-10 px-3 bg-[#f4f4f9]">
        <form onSubmit={handleFormSubmit} className="p-5">
          {renderFormFields()}
        </form>
      </div>
    </>
  );
};

export default Viewform;
