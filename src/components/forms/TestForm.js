import { useTheme } from "@mui/material";
import { ButtonBase, TextField } from "@mui/material";
import { Field, FieldArray, Form, Formik } from "formik";
import * as yup from "yup";
const TestForm = () => {
  const theme = useTheme();
  const initialValues = {
    entitiysNumber: 0,
    entities: [],
  };
  const validationSchema = yup.object().shape({
    entitiysNumber: yup.number().min(1),
    entities: yup.array().of(
      yup.object().shape({
        entityname: yup.string().required("Name is required"),
      })
    ),
  });
  const onSubmit = (fields) => {
    console.log("submit");
    console.log(fields);
  };
  const addEntitiy = (e, field, values, setValues) => {
    const entities = [...values.entities];
    entities.push({ entityName: "" });

    const numberOfEntities = values.numberOfEntities + 1;
    setValues({ ...values, entities, numberOfEntities });

    // call formik onChange method
    field.onChange(e);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, values, setValues }) => (
        <Form>
          <Field name="entitiysNumber">
            {({ field }) => {
              <ButtonBase
                {...field}
                onClick={(e) => addEntitiy(e, field, values)}
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
                create an entitiy
              </ButtonBase>;
            }}
          </Field>
          <FieldArray>
            {() =>
              values.entities.map((entity, i) => {
                <Field key={i}>
                  {({ field }) => {
                    const ticketErrors =
                      (errors.tickets?.length && errors.tickets[i]) || {};
                    <TextField
                      {...field}
                      fullWidth
                      id="entityName"
                      label="entity name"
                      name={`entities.${i}.entityname`}
                      type="text"
                      className={
                        "form-control" +
                        (ticketErrors.name ? " is-invalid" : "")
                      }
                      sx={{
                        marginY: "0.5rem",
                        color: theme.palette.text.primary.main,
                        "& label.Mui-focused": {
                          color: theme.palette.text.secondary.main,
                        },
                        "& .MuiInput-underline:after": {
                          borderBottomColor: theme.palette.text.secondary.main,
                        },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderRadius: "0.5rem",
                            borderWidth: "3px",
                            borderColor: theme.palette.secondary.main,
                          },
                          "&:hover fieldset": {
                            borderColor: theme.palette.secondary.main,
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: theme.palette.text.secondary.main,
                          },
                        },
                      }}
                    />;
                  }}
                </Field>;
              })
            }
          </FieldArray>
          <ButtonBase type="submit">submit</ButtonBase>
        </Form>
      )}
    </Formik>
  );
};
export default TestForm;
