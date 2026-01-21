import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import conf from '../config/config.js';
import { Controller } from "react-hook-form";

function RT_Editor({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1">{label}</label>
      )}

      <Controller
        name={name || "content"}
        control={control}
        defaultValue={defaultValue}   
        render={({ field: { onChange, value } }) => (
          <Editor
            apiKey= "om78ef4wsnk9xk2etuj9zywu9yppm8ny3ohnn0mtmx8zbcj9"
            value={value}             
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
export default RT_Editor;