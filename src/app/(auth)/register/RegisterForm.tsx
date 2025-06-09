"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import React, { useState } from "react";
import { GiPadlock } from "react-icons/gi";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  profileSchema,
  registerSchema,
  RegisterSchema,
} from "@/lib/schemas/registerSchema";
import { registerUser } from "@/app/actions/authActions";
import { handleFormServerErrors } from "@/lib/util";
import UserDetailsForm from "./UserDetailsForm";
import ProfileForm from "./ProfileForm";

const stepSchemas = [registerSchema, profileSchema];

export default function RegisterForm() {
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = stepSchemas[activeStep];

  const methods = useForm<RegisterSchema>({
    resolver: zodResolver(currentValidationSchema),
    mode: "onTouched",
  });

  const {
    setError,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    getValues
  } = methods;

  const onSubmit = async (data: RegisterSchema) => {
    console.log(getValues())
    // const result = await registerUser(data);
    // if (result.status === "success") {
    //   console.log("User registered successfully");
    // } else {
    //   handleFormServerErrors(result, setError);
    // }
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <UserDetailsForm />;
      case 1:
        return <ProfileForm />;
      default:
        return "Unknown step";
    }
  };

  const onBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const onNext = async () => {
    if (activeStep === stepSchemas.length - 1) {
      await onSubmit();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  return (
    <Card className="w-2/5 mx-auto">
      <CardHeader className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-2 items-center text-secondary">
          <div className="flex flex-row items-center gap-3">
            <GiPadlock size={30} />
            <h1 className="text-3xl font-semibold">Register</h1>
          </div>
          <p className="text-neutral-500">Welcome to NextChat</p>
        </div>
      </CardHeader>
      <CardBody>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onNext)}>
            <div className="space-y-4">
              {getStepContent(activeStep)}
              {errors.root?.serverError && (
                <p className="text-danger text-sm">
                  {errors.root.serverError.message}
                </p>
              )}

              <div className="flex flex-row items-center gap-6">
                {activeStep !== 0 && (
                  <Button onPress={onBack} fullWidth>
                    Back
                  </Button>
                )}
                <Button
                  isLoading={isSubmitting}
                  isDisabled={!isValid}
                  fullWidth
                  color="secondary"
                  type="submit"
                >
                  {activeStep === stepSchemas.length -1 ? 'Submit' : 'Continue'}
                </Button>
              </div>

            </div>
          </form>
        </FormProvider>
      </CardBody>
    </Card>
  );
}

/**
 errors: Comes from useForm() of react-hook-form, it contains all the validation errors.

errors.root: Represents global (form-level) errors, added with setError("root.XXX").

errors.root?.serverError: If a serverError has been defined → the block is rendered.

<p className="text-danger text-sm">...</p>: The error message displayed in a paragraph styled in red (likely using Tailwind CSS or Bootstrap).

   ****Element	****                     |  ****  Role ****
setError("root.serverError", ...)	       |    Adds a general (non-field-specific) error.
errors.root?.serverError	               |    Accesses this error to display it in the interface.
 */
