import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Field, Formik } from "formik";
import * as yup from "yup";
import { toast } from "react-hot-toast";
import updateListing from "../../service/listing/updateListing";
import postDeleteListing from "../../service/listing/postDeleteListing";
import { getListingDetails } from "../../service/listing/getListingDetails";

const Admin_Card = (props) => {
  const img = props.image;
  let [isOpen, setIsOpen] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  function closeModal() {
    setIsOpen(false);
  }
  async function openModal() {
    await getDetails();
    setTimeout(() => setIsOpen(true), 1000);
  }

  const handleFormSubmit = (values) => {
    async function handle() {
      const iData = new FormData();
      for (let i in values) {
        iData.append(i, values[i]);
      }

      try {
        const res = await updateListing({
          data: { _id: props._id, data: values },
        });

        if (res) {
          toast.success(res);
        }
      } catch (error) {
        toast.error("Something Went Wrong");
      }
    }
    handle();
    closeModal();
  };
  const getDetails = () => {
    async function results() {
      try {
        const res = await getListingDetails({ id: props._id });
        if (!res) {
          throw new Error("");
        }
        setInitialValues(res);
      } catch (error) {
        toast.error("Could not get listing details");
      }
    }
    results();
  };

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const validateYupSchema = yup.object().shape({
    name: yup.string().required("required"),
    price_per_hour: yup
      .number()
      .typeError("Must be a number")
      .required("required"),
    price_per_day: yup
      .number()
      .typeError("Must be a number")
      .required("required"),
    contact: yup
      .string()
      .matches(phoneRegExp, "Invalid Phone Number")
      .required("required"),
    address: yup.string().required("required"),
    quantity: yup.number().typeError("Must be a number").required("required"),
    details: yup.string().min(20).required("required"),
  });

  return (
    <div className="relative  m-0 mx-auto w-full h-[35vh] overflow-hidden rounded-md">
      <div
        className="card relative w-full h-full hover:scale-110 duration-300"
        style={{
          backgroundImage: ` linear-gradient(rgba(  0,0,0, 0.5), rgba( 0,0,0, 0.3)), url(${img})`,
          backgroundRepeat: " no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="  m-0 mx-auto title w-[90%] text-[1.2rem] text-center pt-40 text-[1.5rem] text-white">
          <h1>{props.name}</h1>
        </div>
        <div className="details absolute bottom-[-110%] duration-300 ease left-0 leading-2   bg-black bg-opacity-70 w-full text-neutral-300">
          <div className="w-[90%] py-6 px-3 text-[.8rem]  m-0 mx-auto">
            <h1 className="text-neutral-100">More Info</h1>
            <p className="leading-[1.1rem] font-light text-neutral-200 ">
              {props.details}
            </p>
            <div className="grid grid-cols-2 gap-10">
              {" "}
              <button
                onClick={() => {
                  async function deleteListing() {
                    try {
                      const res = await postDeleteListing({
                        data: { id: props._id },
                      });
                      if (res) {
                        props.setListingTouched(!props.listingTouched);
                        toast.success(res);
                      }
                    } catch (error) {
                      toast.error("Something went wrong");
                    }
                  }
                  deleteListing();
                }}
                className="px-6 py-1 bg-blue-600 rounded text-white ease-in-out duration-[.5s] hover:bg-red-600  shadow mt-2"
              >
                Delete
              </button>
              <button
                onClick={openModal}
                className="px-6 py-1 bg-blue-600 rounded text-white ease-in-out duration-[.5s] hover:bg-red-600  shadow mt-2"
              >
                Edit
              </button>
              <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                  as="div"
                  className="relative z-10"
                  onClose={() => {
                    return null;
                  }}
                >
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                  </Transition.Child>

                  <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <Dialog.Panel className="w-[50%] min-w-[400px] transform overflow-hidden rounded-2xl bg-white p-6   shadow-xl transition-all">
                          <Dialog.Title
                            as="h3"
                            className="text-[1.2rem] font-medium leading-6 text-gray-900"
                          >
                            <span className="border-b pb-2  px-5 border-blue-600 rounded">
                              Update the Listing
                            </span>
                          </Dialog.Title>
                          <Formik
                            onSubmit={handleFormSubmit}
                            initialValues={initialValues}
                            validationSchema={validateYupSchema}
                          >
                            {({
                              handleBlur,
                              handleSubmit,
                              handleChange,
                              touched,
                              errors,
                              values,

                              setFieldValue,
                            }) => {
                              return (
                                <form onSubmit={handleSubmit}>
                                  <Box
                                    autoComplete="off"
                                    className="w-full grid grid-cols-1 gap-5 py-10 lg:grid-cols-2"
                                  >
                                    <TextField
                                      fullWidth
                                      variant="outlined"
                                      type="text"
                                      label="Name"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.name}
                                      name="name"
                                      size="small"
                                      error={!!touched.name && !!errors.name}
                                      helperText={touched.name && errors.name}
                                    ></TextField>

                                    <TextField
                                      fullWidth
                                      variant="outlined"
                                      className=""
                                      type="text"
                                      size="small"
                                      label="price_per_hour"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.price_per_hour}
                                      name="price_per_hour"
                                      error={
                                        !!touched.price_per_hour &&
                                        !!errors.price_per_hour
                                      }
                                      helperText={
                                        touched.price_per_hour &&
                                        errors.price_per_hour
                                      }
                                    ></TextField>

                                    <TextField
                                      fullWidth
                                      variant="outlined"
                                      className=""
                                      type="text"
                                      size="small"
                                      label="price_per_day"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.price_per_day}
                                      name="price_per_day"
                                      error={
                                        !!touched.price_per_day &&
                                        !!errors.price_per_day
                                      }
                                      helperText={
                                        touched.price_per_day &&
                                        errors.price_per_day
                                      }
                                    ></TextField>

                                    <TextField
                                      fullWidth
                                      variant="outlined"
                                      className=""
                                      type="text"
                                      size="small"
                                      label="contact"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.contact}
                                      name="contact"
                                      error={
                                        !!touched.contact && !!errors.contact
                                      }
                                      helperText={
                                        touched.contact && errors.contact
                                      }
                                    ></TextField>
                                    <TextField
                                      fullWidth
                                      variant="outlined"
                                      className=""
                                      type="text"
                                      size="small"
                                      label="address"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.address}
                                      name="address"
                                      error={
                                        !!touched.address && !!errors.address
                                      }
                                      helperText={
                                        touched.address && errors.address
                                      }
                                    ></TextField>
                                    <TextField
                                      fullWidth
                                      variant="outlined"
                                      className=""
                                      type="text"
                                      size="small"
                                      label="Quantity"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.quantity}
                                      name="quantity"
                                      error={
                                        !!touched.quantity && !!errors.quantity
                                      }
                                      helperText={
                                        touched.quantity && errors.quantity
                                      }
                                    ></TextField>

                                    <TextField
                                      fullWidth
                                      variant="outlined"
                                      type="text"
                                      size="small"
                                      label="details"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.details}
                                      name="details"
                                      error={
                                        !!touched.details && !!errors.details
                                      }
                                      helperText={
                                        touched.details && errors.details
                                      }
                                    ></TextField>

                                    <Field
                                      name="fieldName"
                                      value={values.type}
                                      error={
                                        !!touched.details && !!errors.details
                                      }
                                      helperText={
                                        touched.details && errors.details
                                      }
                                    >
                                      {({ form }) => (
                                        <Fragment>
                                          <RadioGroup
                                            defaultValue={1}
                                            onChange={(e) => {
                                              setFieldValue(
                                                "type",
                                                e.target.value
                                              );
                                            }}
                                          >
                                            <FormControlLabel
                                              value="1"
                                              control={<Radio />}
                                              label="For Land"
                                            />
                                            <FormControlLabel
                                              value="2"
                                              control={<Radio />}
                                              label="For Water"
                                            />
                                          </RadioGroup>
                                        </Fragment>
                                      )}
                                    </Field>

                                    <input
                                      type="file"
                                      onChange={(event) => {
                                        setFieldValue(
                                          "listingImage",
                                          event.target.files[0]
                                        );
                                      }}
                                      className={
                                        !!touched.image
                                          ? !!errors.image
                                            ? "form-control input_user is-invalid"
                                            : "form-control input_user is-valid"
                                          : "form-control"
                                      }
                                    ></input>
                                  </Box>
                                  <Box className="flex justify-between items-center">
                                    <button
                                      type="submit"
                                      className="py-2 px-5 bg-blue-600 rounded text-white shadow-md hover:bg-blue-700 duration-300"
                                    >
                                      Submit
                                    </button>
                                    <button
                                      type="button"
                                      onClick={closeModal}
                                      className="py-2 px-5 bg-red-600 rounded text-white shadow-md hover:bg-red-700 duration-300"
                                    >
                                      Cancel
                                    </button>
                                  </Box>
                                </form>
                              );
                            }}
                          </Formik>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_Card;
