import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useState, useEffect, useRef } from "react";
import { useFormikContext } from "formik";
import { useEffect } from "react";

const ScrollToFirstError = () => {
  const { errors, submitCount } = useFormikContext();

  useEffect(() => {
    if (submitCount > 0 && Object.keys(errors).length > 0) {
      const firstError = document.querySelector(".error");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [errors, submitCount]);

  return null;
};

const Onboard = () => {
  const [step, setStep] = useState(1);
  const [initialValues, setInitialValues] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    spouseName: "",
    EmployeeId: "",
    Department: "",
    Role: "",
    Employment_Type: "",
    Contract_Start: "",
    Contract_End: "",
    Bank_name: "",
    IFSC_code: "",
    identityProofs: [
      {
        accountNumber: "",
        identityType: "",
        identityNumber: "",
        file: null,
      },
    ],
    emergencyContacts: [
      {
        name: "",
        relationship: "",
        phone: "",
      },
    ],
  });

  useEffect(() => {
    const stored = localStorage.getItem("onboard-form");
    if (stored) {
      const parsed = JSON.parse(stored);
      setInitialValues((prev) => ({
        ...prev,
        ...parsed,
        identityProofs: Array.isArray(parsed.identityProofs)
          ? parsed.identityProofs
          : [
              {
                accountNumber: "",
                identityType: "",
                identityNumber: "",
                file: null,
              },
            ],
        emergencyContacts: Array.isArray(parsed.emergencyContacts)
          ? parsed.emergencyContacts
          : [{ name: "", relationship: "", phone: "" }],
      }));
    }
  }, []);

  const personalSchema = Yup.object({
    fullName: Yup.string()
      .required("Full name is required")
      .min(3, "Minimum 3 characters"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone must be 10 digits")
      .required("Phone number is required"),
    dob: Yup.date()
      .required("Date of birth is required")
      .test("age", "Must be 18+", function (value) {
        if (!value) return false;
        const today = new Date();
        const birthDate = new Date(value);
        let age = today.getFullYear() - birthDate.getFullYear();
        return age >= 18;
      }),
    gender: Yup.string().required("Gender is required"),
    maritalStatus: Yup.string().required("Marital status is required"),
    spouseName: Yup.string().when("maritalStatus", (maritalStatus, schema) =>
      maritalStatus === "Married"
        ? schema.required("Spouse name is required")
        : schema.notRequired()
    ),
  });

  const bankIdentitySchema = Yup.object({
    Bank_name: Yup.string().required("Bank name is required"),
    IFSC_code: Yup.string()
      .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code")
      .required("IFSC code is required"),
    identityProofs: Yup.array().of(
      Yup.object({
        accountNumber: Yup.string()
          .matches(/^[0-9]+$/, "Account number must be numeric")
          .min(9, "Minimum 9 digits")
          .max(18, "Maximum 18 digits")
          .required("Account number is required"),
        identityType: Yup.string().required("Identity type is required"),
        identityNumber: Yup.string().required("Identity number is required"),
        file: Yup.mixed().required("File is required"),
      })
    ),
  });

  const emergencySchema = Yup.object({
    emergencyContacts: Yup.array()
      .min(1, "At least 1 emergency contact is required")
      .max(3, "Maximum 3 emergency contacts allowed")
      .of(
        Yup.object({
          name: Yup.string()
            .required("Contact name is required")
            .min(3, "Minimum 3 characters"),
          relationship: Yup.string().required("Relationship is required"),
          phone: Yup.string()
            .matches(/^\d{10}$/, "Phone number must be 10 digits")
            .required("Phone number is required"),
        })
      ),
  });

  const getValidationSchema = () => {
    if (step === 1) return personalSchema;
    if (step === 3) return bankIdentitySchema;
    if (step === 4) return emergencySchema;
    return null;
  };

  const handleclick = (resetForm) => {
    localStorage.removeItem("onboard-form");
    resetForm();
    setStep(1);
  };

  return (
    <div className="Onboard-bg">
      <div className="box">
        <div className="inner-box">
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={getValidationSchema()}
            validateOnChange={true}
            validateOnBlur={true}
            onSubmit={async (values, { setTouched, resetForm }) => {
              localStorage.setItem("onboard-form", JSON.stringify(values));
              setTouched({});

              if (step < 5) {
                setStep(step + 1);
                return;
              }

              let obj = {};
              obj.name = values.fullName;
              obj.age = values.dob;
              obj.city = values.Department;

              const token = localStorage.getItem("token");

              await fetch("http://localhost:3000/Incoming", {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(obj),
              });

              resetForm();
              localStorage.removeItem("onboard-form");
              setStep(1);

              alert("Success ✅");
            }}
          >
            {({ values, touched, errors, setFieldValue, resetForm }) => (
              <Form className="formik-box">
                <ScrollToFirstError />
                {step === 1 && (
                  <div className="Grand-parent">
                    {"Step 1 of 5"}
                    <h2>Personal Details</h2>
                    <label className="mini-head">Full Name</label>
                    <Field name="fullName" className="field" />
                    {touched.fullName && errors.fullName && (
                      <div className="error">{errors.fullName}</div>
                    )}

                    <label className="mini-head">Email</label>
                    <Field name="email" className="field" />
                    {touched.email && errors.email && (
                      <div className="error">{errors.email}</div>
                    )}

                    <label className="mini-head">Phone Number</label>
                    <Field name="phone" className="field" />
                    {touched.phone && errors.phone && (
                      <div className="error">{errors.phone}</div>
                    )}

                    <label className="mini-head">Date of Birth</label>
                    <Field type="date" name="dob" className="field" />
                    {touched.dob && errors.dob && (
                      <div className="error">{errors.dob}</div>
                    )}

                    <label className="mini-head">Gender</label>
                    <label>
                      <Field type="radio" name="gender" value="Male" /> Male
                    </label>
                    <label>
                      <Field type="radio" name="gender" value="Female" /> Female
                    </label>
                    {touched.gender && errors.gender && (
                      <div className="error">{errors.gender}</div>
                    )}

                    <label className="mini-head">Marital Status</label>
                    <Field as="select" name="maritalStatus" className="field">
                      <option value="">Select</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                    </Field>
                    {touched.maritalStatus && errors.maritalStatus && (
                      <div className="error">{errors.maritalStatus}</div>
                    )}

                    {values.maritalStatus === "Married" && (
                      <>
                        <label className="mini-head">Spouse Name</label>
                        <Field name="spouseName" className="field" />
                        {touched.spouseName && errors.spouseName && (
                          <div className="error">{errors.spouseName}</div>
                        )}
                      </>
                    )}
                    <br></br>
                    <button type="submit">Next</button>
                    <div className="Pro-bar">
                      <span className="Pro-bar-head">0%</span>
                      <div className="Pro-bar-small"></div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="Grand-parent">
                    {"Step 2 of 5"}
                    <h2>Employment Details</h2>

                    <label className="mini-head">Employee ID</label>
                    <Field
                      name="EmployeeId"
                      className="field"
                      readOnly
                      placeholder="Id will be generated By Backend"
                    />

                    <label className="mini-head">Department</label>
                    <Field as="select" name="Department" className="field">
                      <option value="">Select</option>
                      <option value="HR">HR</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Sales">Sales</option>
                    </Field>

                    <label className="mini-head">Role</label>
                    <Field as="select" name="Role" className="field">
                      <option value="">Select</option>
                      {values.Department === "HR" && (
                        <option value="Recruiter">Recruiter</option>
                      )}
                      {values.Department === "Engineering" && (
                        <option value="Developer">Developer</option>
                      )}
                      {values.Department === "Sales" && (
                        <option value="Sales Executive">Sales Executive</option>
                      )}
                    </Field>

                    <label className="mini-head">Employment Type</label>
                    <Field as="select" name="Employment_Type" className="field">
                      <option value="">Select</option>
                      <option value="Full-Time">Full-Time</option>
                      <option value="Contract">Contract</option>
                    </Field>

                    {values.Employment_Type === "Contract" && (
                      <>
                        <label className="mini-head">Contract Start Date</label>
                        <Field
                          type="date"
                          name="Contract_Start"
                          className="field"
                        />
                        <label className="mini-head">Contract End Date</label>
                        <Field
                          type="date"
                          name="Contract_End"
                          className="field"
                        />
                      </>
                    )}
                    <br></br>
                    <button type="button" onClick={() => setStep(1)}>
                      Back
                    </button>
                    <br></br>
                    <button type="submit">Next</button>
                    <br></br>
                    <div className="Pro-bar-2">
                      <span className="Pro-bar-head">20%</span>
                      <div className="Pro-bar-small-2"></div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="Grand-parent">
                    {"Step 3 of 5"}
                    <div key={`step3`}>
                      <h2>Bank & Identity Details</h2>

                      <label className="mini-head">Bank Name</label>
                      <Field name="Bank_name" className="field" />
                      {touched.Bank_name && errors.Bank_name && (
                        <div className="error">{errors.Bank_name}</div>
                      )}

                      <label className="mini-head">IFSC Code</label>
                      <Field name="IFSC_code" className="field" />
                      {touched.IFSC_code && errors.IFSC_code && (
                        <div className="error">{errors.IFSC_code}</div>
                      )}

                      <h3>Identity Proofs</h3>
                      {values.identityProofs.map((_, index) => (
                        <div key={index} className="identity-card">
                          <label className="mini-head">Account Number</label>
                          <Field
                            name={`identityProofs.${index}.accountNumber`}
                            className="field"
                          />
                          {touched.identityProofs?.[index]?.accountNumber &&
                            errors.identityProofs?.[index]?.accountNumber && (
                              <div className="error">
                                {errors.identityProofs[index].accountNumber}
                              </div>
                            )}

                          <label className="mini-head">Identity Type</label>
                          <Field
                            as="select"
                            name={`identityProofs.${index}.identityType`}
                            className="field"
                          >
                            <option value="">Select</option>
                            <option value="Aadhaar">Aadhaar</option>
                            <option value="Passport">Passport</option>
                            <option value="PAN">PAN</option>
                          </Field>
                          {touched.identityProofs?.[index]?.identityType &&
                            errors.identityProofs?.[index]?.identityType && (
                              <div className="error">
                                {errors.identityProofs[index].identityType}
                              </div>
                            )}

                          <label className="mini-head">Identity Number</label>
                          <Field
                            name={`identityProofs.${index}.identityNumber`}
                            className="field"
                          />
                          {touched.identityProofs?.[index]?.identityNumber &&
                            errors.identityProofs?.[index]?.identityNumber && (
                              <div className="error">
                                {errors.identityProofs[index].identityNumber}
                              </div>
                            )}

                          <label className="mini-head">Upload File</label>
                          <input
                            type="file"
                            className="field"
                            onChange={(e) =>
                              setFieldValue(
                                `identityProofs.${index}.file`,
                                e.currentTarget.files[0],
                                true
                              )
                            }
                            onBlur={() =>
                              setFieldValue(
                                `identityProofs.${index}.file`,
                                values.identityProofs[index].file,
                                true
                              )
                            }
                          />
                          {touched.identityProofs?.[index]?.file &&
                            errors.identityProofs?.[index]?.file && (
                              <div className="error">
                                {errors.identityProofs[index].file}
                              </div>
                            )}
                          <br></br>
                          <button
                            type="button"
                            className="remove-btn"
                            onClick={() => {
                              const updated = values.identityProofs.filter(
                                (_, i) => i !== index
                              );
                              setFieldValue("identityProofs", updated);
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <br></br>
                      <button
                        type="button"
                        className="add-btn"
                        onClick={() =>
                          setFieldValue("identityProofs", [
                            ...values.identityProofs,
                            {
                              accountNumber: "",
                              identityType: "",
                              identityNumber: "",
                              file: null,
                            },
                          ])
                        }
                      >
                        Add Identity Proof
                      </button>
                      <br></br>
                      <div className="step-actions">
                        <button type="button" onClick={() => setStep(2)}>
                          Back
                        </button>
                        <button type="submit">Next</button>
                      </div>
                    </div>
                    <br></br>
                    <div className="Pro-bar-3">
                      <span className="Pro-bar-head">45%</span>
                      <div className="Pro-bar-small-3"></div>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="Grand-parent">
                    {"Step 4 of 5"}
                    <h2>Emergency Contacts</h2>
                    {values.emergencyContacts.map((_, index) => (
                      <div key={index} className="identity-card">
                        <label className="mini-head">Contact Name</label>
                        <Field
                          name={`emergencyContacts.${index}.name`}
                          className="field"
                        />
                        {touched.emergencyContacts?.[index]?.name &&
                          errors.emergencyContacts?.[index]?.name && (
                            <div className="error">
                              {errors.emergencyContacts[index].name}
                            </div>
                          )}

                        <label className="mini-head">Relationship</label>
                        <Field
                          name={`emergencyContacts.${index}.relationship`}
                          className="field"
                        />
                        {touched.emergencyContacts?.[index]?.relationship &&
                          errors.emergencyContacts?.[index]?.relationship && (
                            <div className="error">
                              {errors.emergencyContacts[index].relationship}
                            </div>
                          )}

                        <label className="mini-head">Phone Number</label>
                        <Field
                          name={`emergencyContacts.${index}.phone`}
                          className="field"
                        />
                        {touched.emergencyContacts?.[index]?.phone &&
                          errors.emergencyContacts?.[index]?.phone && (
                            <div className="error">
                              {errors.emergencyContacts[index].phone}
                            </div>
                          )}
                        <br></br>
                        {values.emergencyContacts.length > 1 && (
                          <button
                            type="button"
                            className="remove-btn"
                            onClick={() => {
                              const updated = values.emergencyContacts.filter(
                                (_, i) => i !== index
                              );
                              setFieldValue("emergencyContacts", updated);
                            }}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    <br></br>
                    {values.emergencyContacts.length < 3 && (
                      <button
                        type="button"
                        className="add-btn"
                        onClick={() =>
                          setFieldValue("emergencyContacts", [
                            ...values.emergencyContacts,
                            { name: "", relationship: "", phone: "" },
                          ])
                        }
                      >
                        Add Emergency Contact
                      </button>
                    )}
                    <br></br>
                    <div className="step-actions">
                      <button type="button" onClick={() => setStep(3)}>
                        Back
                      </button>
                      <button type="submit">Review</button>
                    </div>
                    <br></br>
                    <div className="Pro-bar-4">
                      <span className="Pro-bar-head">75%</span>
                      <div className="Pro-bar-small-4"></div>
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div className="form-step">
                    {"Step 5 of 5"}
                    <h2>Review & Submit</h2>

                    <div className="review-section">
                      <div className="review-header">
                        <h3 className="fivth-form">Personal Details</h3>
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="final-btn"
                        >
                          Edit
                        </button>
                      </div>
                      <p>
                        <strong>Name:</strong> {values.fullName}
                      </p>
                      <p>
                        <strong>Email:</strong> {values.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {values.phone}
                      </p>
                      <p>
                        <strong>Gender:</strong> {values.gender}
                      </p>
                      <p>
                        <strong>Marital Status:</strong> {values.maritalStatus}
                      </p>
                      {values.spouseName && (
                        <p>
                          <strong>Spouse Name:</strong> {values.spouseName}
                        </p>
                      )}
                    </div>

                    <div className="review-section">
                      <div className="review-header">
                        <h3 className="fivth-form">Bank & Identity</h3>
                        <button
                          type="button"
                          onClick={() => setStep(3)}
                          className="final-btn"
                        >
                          Edit
                        </button>
                      </div>
                      <p>
                        <strong>Bank Name:</strong> {values.Bank_name}
                      </p>
                      <p>
                        <strong>IFSC Code:</strong> {values.IFSC_code}
                      </p>

                      {values.identityProofs.map((proof, index) => (
                        <div key={index} className="review-subsection">
                          <p>
                            <strong>Account Number:</strong>{" "}
                            {proof.accountNumber}
                          </p>
                          <p>
                            <strong>Identity Type:</strong> {proof.identityType}
                          </p>
                          <p>
                            <strong>Identity Number:</strong>{" "}
                            {proof.identityNumber}
                          </p>
                          <p>
                            <strong>File:</strong>{" "}
                            {proof.file ? proof.file.name : "Not uploaded"}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="review-section">
                      <div className="review-header">
                        <h3 className="fivth-form">Emergency Contacts</h3>
                        <button
                          type="button"
                          onClick={() => setStep(4)}
                          className="final-btn"
                        >
                          Edit
                        </button>
                      </div>
                      {values.emergencyContacts.map((contact, index) => (
                        <div key={index} className="review-subsection">
                          <p>
                            <strong>Name:</strong> {contact.name}
                          </p>
                          <p>
                            <strong>Relationship:</strong>{" "}
                            {contact.relationship}
                          </p>
                          <p>
                            <strong>Phone:</strong> {contact.phone}
                          </p>
                        </div>
                      ))}
                    </div>
                    <br></br>
                    <div className="form-actions">
                      <button type="button" onClick={() => setStep(3)}>
                        Back
                      </button>
                      <br></br>
                      <button
                        type="button"
                        onClick={() => handleclick(resetForm)}
                        style={{ backgroundColor: "red" }}
                      >
                        RESET FORM
                      </button>
                      <br></br>
                      <button type="submit">Confirm & Submit</button>
                    </div>
                    <br></br>
                    <div className="Pro-bar-5">
                      <span className="Pro-bar-head">100%</span>
                      <div className="Pro-bar-small-5"></div>
                    </div>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Onboard;
