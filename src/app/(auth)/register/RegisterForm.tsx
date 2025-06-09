"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import React from "react";
import { GiPadlock } from "react-icons/gi";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchema } from "@/lib/schemas/registerSchema";
import { registerUser } from "@/app/actions/authActions";
import { handleFormServerErrors } from "@/lib/util";
import UserDetailsForm from "./UserDetailsForm";

export default function RegisterForm() {
  const methods = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const {setError, handleSubmit, formState: { errors, isValid, isSubmitting } } = methods;

  const onSubmit = async (data: RegisterSchema) => {
    //console.log(getValues())
    const result = await registerUser(data);
    if (result.status === "success") {
      console.log("User registered successfully");
    } else {
      handleFormServerErrors(result, setError);
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
         <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
           <UserDetailsForm />
            {errors.root?.serverError && (
              <p className="text-danger text-sm">
                {errors.root.serverError.message}
              </p>
            )}
            <Button
              isLoading={isSubmitting}
              isDisabled={!isValid}
              fullWidth
              color="secondary"
              type="submit"
            >
              Register
            </Button>
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
