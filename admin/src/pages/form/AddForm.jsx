import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
import Switch from "@mui/material/Switch";
import { v4 as uuid } from "uuid";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { useDispatch } from "react-redux";
import { addForm } from "../../redux/actions/formActions";

const AddForm = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const [title, setTitle] = useState("untited form");
  const [forms, setForms] = useState([
    {
      title: title,
      id: param.id,
      questions: [
        {
          id: uuid(),
          questionText: "",
          answerType: "",
          options: [],
          required: "",
        },
      ],
    },
  ]);

  const handleQuestionTextChange = (formId, questionId, value) => {
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId
          ? {
              ...form,
              questions: form.questions.map((question) =>
                question.id === questionId
                  ? { ...question, questionText: value }
                  : question
              ),
            }
          : form
      )
    );
  };

  const handleAnswerTypeChange = (formId, questionId, value) => {
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId
          ? {
              ...form,
              questions: form.questions.map((question) =>
                question.id === questionId
                  ? { ...question, answerType: value, options: [] }
                  : question
              ),
            }
          : form
      )
    );
  };

  const handlerequireQuestion = (formId, questionId, value) => {
    // console.log(value, "value");
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId
          ? {
              ...form,
              questions: form.questions.map((question) =>
                question.id === questionId
                  ? { ...question, required: value }
                  : question
              ),
            }
          : form
      )
    );
  };

  const handleAddOption = (formId, questionId) => {
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId
          ? {
              ...form,
              questions: form.questions.map((question) =>
                question.id === questionId
                  ? { ...question, options: [...question.options, "option"] }
                  : question
              ),
            }
          : form
      )
    );
  };

  const handleOptionChange = (formId, questionId, optionIndex, value) => {
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId
          ? {
              ...form,
              questions: form.questions.map((question) =>
                question.id === questionId
                  ? {
                      ...question,
                      options: question.options.map((option, index) =>
                        index === optionIndex ? value : option
                      ),
                    }
                  : question
              ),
            }
          : form
      )
    );
  };

  const handleDeleteQuestion = (formId, questionId) => {
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId
          ? {
              ...form,
              questions: form.questions.filter((q) => q.id !== questionId),
            }
          : form
      )
    );
  };

  const handleCopyQuestion = (formId, questionId) => {
    const copiedQuestion = {
      ...forms
        .find((form) => form.id === formId)
        .questions.find((q) => q.id === questionId),
    };
    copiedQuestion.id = uuid();
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId
          ? { ...form, questions: [...form.questions, copiedQuestion] }
          : form
      )
    );
  };

  const handleAddQuestion = (formId) => {
    const newQuestion = {
      id: uuid(),
      questionText: "question ",
      answerType: "",
      options: [],
    };
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId
          ? { ...form, questions: [...form.questions, newQuestion] }
          : form
      )
    );
  };

  const handleSaveForm = () => {
    dispatch(addForm(title, forms));
    toast.success("Form saved successfully");
  };

  return (
    <>
      <Navbar />
      <div className="max-w-screen-xl mx-auto mt-10 px-3 bg-[#f4f4f9]">
        {forms.map((form) => (
          <div
            key={form.id}
            className="mb-2 p-2 bg-[#f5f5f5] rounded-sm w-[50vw] m-auto mt-[1rem]"
          >
            {/* <Typography variant="h6">Form {form.id}</Typography> */}
            <input
              autoComplete="off"
              className="mt-3 question-form-top-name"
              type="text"
              placeholder="untited form"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            {form.questions.map((question) => (
              <div
                key={question.id}
                className="mb-2 flex flex-col border-2 border-blue-400 p-[2rem]"
              >
                <div className="flex gap-[0.5rem]">
                  <TextField
                    autoComplete="off"
                    id="standard-basic"
                    label="Question Text"
                    variant="standard"
                    onChange={(e) =>
                      handleQuestionTextChange(
                        form.id,
                        question.id,
                        e.target.value
                      )
                    }
                    value={question.questionText}
                    fullWidth
                  />
                  <FormControl fullWidth variant="standard">
                    <InputLabel id={`answer-type-label-${question.id}`}>
                      Answer Type
                    </InputLabel>
                    <Select
                      labelId={`answer-type-label-${question.id}`}
                      value={question.answerType}
                      onChange={(e) =>
                        handleAnswerTypeChange(
                          form.id,
                          question.id,
                          e.target.value
                        )
                      }
                    >
                      {/* <MenuItem value="dropdown">Select</MenuItem> */}
                      <MenuItem value="input">Input</MenuItem>
                      <MenuItem value="checkbox">Checkbox</MenuItem>
                      <MenuItem value="radio">Radio</MenuItem>
                    </Select>
                  </FormControl>
                  <div>
                    <p>required</p>
                    <Switch
                      checked={question.required}
                      onClick={(e) =>
                        handlerequireQuestion(
                          form.id,
                          question.id,
                          e.target.checked
                        )
                      }
                      // checked={checked}
                    />
                  </div>
                </div>
                {question.answerType === "checkbox" && (
                  <>
                    <Typography variant="subtitle2"></Typography>
                    {question.options.map((option, index) => (
                      <div key={index} className="flex items-center mb-1 mt-2">
                        <TextField
                          autoComplete="off"
                          variant="standard"
                          //   label={`Option ${index + 1}`}
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(
                              form.id,
                              question.id,
                              index,
                              e.target.value
                            )
                          }
                        />
                        <div className="mt-3">
                          <Button
                            color="secondary"
                            size="small"
                            className=""
                            onClick={() =>
                              handleDeleteQuestion(form.id, question.id)
                            }
                            startIcon={<DeleteIcon />}
                          ></Button>
                        </div>
                      </div>
                    ))}
                    <div className="my-4">
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => handleAddOption(form.id, question.id)}
                        className="ml-2 w-[50%]"
                        startIcon={<AddIcon />}
                      >
                        Add Option
                      </Button>
                    </div>
                  </>
                )}
                {question.answerType === "radio" && (
                  <>
                    {question.options.map((option, index) => (
                      <div key={index} className="flex items-center mb-1 mt-2">
                        <TextField
                          autoComplete="off"
                          variant="standard"
                          //   label={`Option ${index + 1}`}
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(
                              form.id,
                              question.id,
                              index,
                              e.target.value
                            )
                          }
                        />
                        <div className="mt-3">
                          <Button
                            color="secondary"
                            size="small"
                            className=""
                            onClick={() =>
                              handleDeleteQuestion(form.id, question.id)
                            }
                            startIcon={<DeleteIcon />}
                          ></Button>
                        </div>
                      </div>
                    ))}
                    <div className="my-4">
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => handleAddOption(form.id, question.id)}
                        className="ml-2 w-[50%]"
                        startIcon={<AddIcon />}
                      >
                        Add Option
                      </Button>
                    </div>
                  </>
                )}

                {question.answerType === "input" && (
                  <input className="short-text" type="text" disabled />
                )}
                <div className="my-3">
                  <Button
                    variant="text"
                    color="primary"
                    size="small"
                    onClick={() => handleDeleteQuestion(form.id, question.id)}
                    className="ml-2"
                    startIcon={<DeleteIcon />}
                  ></Button>
                  <Button
                    variant="text"
                    color="primary"
                    size="small"
                    onClick={() => handleCopyQuestion(form.id, question.id)}
                    startIcon={<FileCopyIcon />}
                  ></Button>
                </div>
              </div>
            ))}
            {/* <div>
           
            </div> */}
            <div className="flex gap-3">
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={() => handleAddQuestion(form.id)}
                startIcon={<AddIcon />}
              >
                Add New Question
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={() => handleSaveForm(form.id)}
                startIcon={<AddIcon />}
              >
                Save Form
              </Button>
            </div>
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
        ))}
      </div>
    </>
  );
};

export default AddForm;
