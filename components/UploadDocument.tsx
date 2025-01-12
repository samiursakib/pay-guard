"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FieldError, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { z } from "zod";
import { SubmitButton } from "./submit-button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const formSchema = z.object({
  file: z
    .any()
    .refine((file) => file.length > 0, "File is required")
    .refine(
      (file) =>
        ["image/jpg", "image/png", "image/jpeg", "application/pdf"].includes(
          file[0]?.type
        ),
      "File must be a PDF or an image of format PNG, JPG or JPEG"
    )
    .refine(
      (file) => file[0]?.size <= 5 * 1024 * 1024,
      "File size must be less than 5 MB"
    ),
});

type FormSchema = z.infer<typeof formSchema>;

export default function UploadDocumentForm() {
  const {
    formState: { errors, isSubmitting, isSubmitSuccessful },
    register,
    handleSubmit,
    reset,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        file: [],
      });
    }
  }, [isSubmitSuccessful]);

  const handleUpload = async (formData: FormSchema) => {
    console.log(formData);
    try {
      // const formData = new FormData(data.get("file") as file[0]);
      // formData.append("file", formData);
      const form = new FormData();
      form.append("file", formData.file[0]);
      const response = await fetch("/upload-file", {
        method: "POST",
        body: form,
      });
      const data = await response.json();
      if (data?.success) {
        toast.success(data?.message, {
          autoClose: 1500,
        });
      } else {
        toast.error(data?.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <ToastContainer />
      <form
        className="w-[400px] border p-8 rounded-xl"
        onSubmit={handleSubmit(handleUpload, (error) => console.log(error))}
      >
        <div className="flex flex-col my-4 gap-2">
          <Label htmlFor="document">Document</Label>
          <Input
            type="file"
            placeholder="Upload a file"
            {...register("file")}
          />
          {errors?.file && (
            <span className="text-red-500">
              {(errors?.file as FieldError).message}
            </span>
          )}
        </div>
        <SubmitButton type="submit">
          {isSubmitting ? "Uploading..." : "Upload"}
        </SubmitButton>
      </form>
    </>
  );
}
