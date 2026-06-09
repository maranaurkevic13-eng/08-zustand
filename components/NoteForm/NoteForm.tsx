"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";       
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import type { FormValues, NoteTag } from "@/types/note";
import css from "./NoteForm.module.css";

interface NoteFormProps {
  onClose: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

   const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
  });
  return (
    <Formik<FormValues>
      initialValues={{ title: "", content: "", tag: "Todo"as NoteTag }}
      validationSchema={Yup.object({
        title: Yup.string().min(3).max(50).required("Title is required"),
        content: Yup.string().max(500, "Max 500 characters"),
        tag: Yup.string()
          .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
          .required("Tag is required"),
      })}
      onSubmit={(values, { resetForm }) => {
        createMutation.mutate(values, {
          onSuccess: () => {
            resetForm();
          },
        });
      }}
    >
      <Form className={css.form}>
        <label>
          Title
          <Field name="title" />
          <ErrorMessage name="title" component="div" />
        </label>

        <label>
          Content
          <Field as="textarea" name="content" />
          <ErrorMessage name="content" component="div" />
        </label>

        <label>
          Tag
          <Field as="select" name="tag">
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="div" />
        </label>

        <div className={css.actions}>
          <button type="button" onClick={onClose}>Cancel</button>
          <button type="submit" disabled={createMutation.isPending}>
            {createMutation.isPending ? "Creating..." : "Create note"}
          </button>
        </div>
      </Form>
    </Formik>
  );
}
