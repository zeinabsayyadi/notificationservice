import React, { useEffect, useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ButtonBase, IconButton, TextField, useTheme } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { userSelector } from "../../Redux/features/UserSlice";

const DynamicInput = () => {
  const theme = useTheme();
  const user = useSelector(userSelector);
  console.log("user ", user);
  const [ticketsNumber, setTicketsNumber] = useState(0);

  const initialValues = {
    tickets: [],
  };

  const validationSchema = Yup.object().shape({
    tickets: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Name is required"),
      })
    ),
  });

  function onChangeTickets(e, values, setValues) {
    // update dynamic form
    setTicketsNumber(ticketsNumber + 1);
    console.log(ticketsNumber);
    const tickets = [...values.tickets];
    tickets.push({ name: "" });
    setValues({ ...values, tickets });
    // call formik onChange method
    //field.onChange(e);
  }

  function onSubmit(fields) {
    // display form field values on success
    alert("SUCCESS!! :-)\n\n" + JSON.stringify(fields, null, 4));
  }

  const DeleteTextFiled = (i) => {
    let x = document.getElementById(i);
    x.remove();
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, values, touched, setValues }) => (
        <Form>
          <div className="card m-3">
            <div className="card-body border-bottom">
              <div className="form-row">
                <div className="form-group">
                  <Field name="numberOfTickets">
                    {() => (
                      <ButtonBase
                        onClick={(e) => onChangeTickets(e, values, setValues)}
                        sx={{
                          width: "100%",
                          minWidth: "max-content",
                          backgroundColor: theme.palette.secondary.main,
                          borderRadius: "0.5rem",
                          color: theme.palette.text.primary.main,
                          fontSize: "14px",
                          padding: "0.5rem",
                          [theme.breakpoints.down("md")]: {
                            display: "none",
                          },
                        }}
                      >
                        add new entitiy
                      </ButtonBase>
                    )}
                  </Field>
                  <ErrorMessage
                    name="numberOfTickets"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
            </div>
            <FieldArray name="tickets">
              {() =>
                values.tickets.map((ticket, i) => {
                  const ticketErrors =
                    (errors.tickets?.length && errors.tickets[i]) || {};
                  const ticketTouched =
                    (touched.tickets?.length && touched.tickets[i]) || {};
                  return (
                    <div
                      key={i}
                      id={Number(i)}
                      className="list-group list-group-flush"
                    >
                      <div className="list-group-item">
                        <div className="form-row">
                          <div className="form-group col-6">
                            <Field>
                              {({ field }) => (
                                <TextField
                                  {...field}
                                  name={`tickets.${i}.name`}
                                  placeholder=""
                                  value={ticket.name}
                                  type="text"
                                  className={
                                    ticketErrors.name && ticketTouched.name
                                      ? " is-invalid"
                                      : ""
                                  }
                                  sx={{
                                    marginY: "0.5rem",
                                    color: theme.palette.text.primary.main,
                                    "& label.Mui-focused": {
                                      color: theme.palette.text.secondary.main,
                                    },
                                    "& .MuiInput-underline:after": {
                                      borderBottomColor:
                                        theme.palette.text.secondary.main,
                                    },
                                    "& .MuiOutlinedInput-root": {
                                      "& fieldset": {
                                        borderRadius: "0.5rem",
                                        borderWidth: "3px",
                                        borderColor:
                                          theme.palette.secondary.main,
                                      },
                                      "&:hover fieldset": {
                                        borderColor:
                                          theme.palette.secondary.main,
                                      },
                                      "&.Mui-focused fieldset": {
                                        borderColor:
                                          theme.palette.text.secondary.main,
                                      },
                                    },
                                  }}
                                  InputProps={{
                                    endAdornment: (
                                      <IconButton
                                        key={i}
                                        sx={{
                                          "& svg": {
                                            color:
                                              theme.palette.text.primary.main,
                                          },
                                          "&:hover": {
                                            backgroundColor: "transparent",
                                            "& svg": {
                                              color:
                                                theme.palette.secondary.main,
                                            },
                                          },
                                        }}
                                        onClick={() => DeleteTextFiled(i)}
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                    ),
                                  }}
                                />
                              )}
                            </Field>
                            <ErrorMessage
                              name={`tickets.${i}.name`}
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              }
            </FieldArray>
            <div>
              <button type="submit">submit</button>
              <button type="reset">Reset</button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default DynamicInput;
