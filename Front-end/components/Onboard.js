import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";

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

      setInitialValues({
        ...initialValues,
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
      });
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
    spouseName: Yup.string().when(
      "maritalStatus",
      function (maritalStatus, schema) {
        if (maritalStatus === "Married") {
          return schema.required("Spouse name is required");
        } else {
          return schema.notRequired();
        }
      }
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

  return (
    <div className="Onboard-bg">
      <div className="box">
        <div className="inner-box">
          <Formik
            key={step}
            enableReinitialize
            initialValues={initialValues}
            validationSchema={
              step === 1
                ? personalSchema
                : step === 3
                ? bankIdentitySchema
                : step === 4
                ? emergencySchema
                : null
            }
            validateOnChange={false}
            validateOnBlur={true}
            onSubmit={(values) => {
              localStorage.setItem("onboard-form", JSON.stringify(values));
              if (step === 1) setStep(2);
              else if (step === 2) setStep(3);
              else if (step === 3) setStep(4);
            }}
          >
            {({ values, touched, errors, setFieldValue }) => (
              <Form className="formik-box">
                {step === 1 && (
                  <>
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

                    <button type="submit">Next</button>
                  </>
                )}

                {step === 2 && (
                  <>
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

                    <button type="button" onClick={() => setStep(1)}>
                      Back
                    </button>
                    <button type="submit">Next</button>
                  </>
                )}

                {step === 3 && (
                  <>
                    <h2>Bank & Identity Details</h2>

                    {/* Bank Name */}
                    <label className="mini-head">Bank Name</label>
                    <Field name="Bank_name" className="field" />
                    {touched.Bank_name && errors.Bank_name && (
                      <div className="error">{errors.Bank_name}</div>
                    )}

                    {/* IFSC */}
                    <label className="mini-head">IFSC Code</label>
                    <Field name="IFSC_code" className="field" />
                    {touched.IFSC_code && errors.IFSC_code && (
                      <div className="error">{errors.IFSC_code}</div>
                    )}

                    <h3>Identity Proofs</h3>

                    {values.identityProofs.map((_, index) => (
                      <div key={index} className="identity-card">
                        {/* Account Number */}
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

                        {/* Identity Type */}
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

                        {/* Identity Number */}
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

                        {/* File */}
                        <label className="mini-head">Upload File</label>
                        <input
                          type="file"
                          className="field"
                          onChange={(e) => {
                            setFieldValue(
                              `identityProofs.${index}.file`,
                              e.currentTarget.files[0],
                              true // ✅ force validation
                            );
                          }}
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

                    <div className="step-actions">
                      <button type="button" onClick={() => setStep(2)}>
                        Back
                      </button>
                      <button type="submit">Next</button>
                    </div>
                  </>
                )}

                {step === 4 && (
                  <>
                    <h2>Emergency Contacts</h2>

                    {values.emergencyContacts.map((_, index) => (
                      <div key={index} className="identity-card">
                        {/* Contact Name */}
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

                        {/* Relationship */}
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

                        {/* Phone */}
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

                        {/* Remove */}
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

                    {/* Add (max 3) */}
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

                    <div className="step-actions">
                      <button type="button" onClick={() => setStep(3)}>
                        Back
                      </button>
                      <button type="submit">Review</button>
                    </div>
                  </>
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
