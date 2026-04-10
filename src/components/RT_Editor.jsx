import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import conf from '../config/config.js';
import { Controller } from "react-hook-form";

function RT_Editor({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 inline-block pl-1 text-sm font-medium tracking-wide text-zinc-300">
          {label}
        </label>
      )}

      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/80 shadow-[0_0_30px_rgba(0,0,0,0.35)] transition-all duration-300 focus-within:border-zinc-600 focus-within:shadow-[0_0_30px_rgba(161,161,170,0.12)]">
        <Controller
          name={name || "content"}
          control={control}
          defaultValue={defaultValue}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Editor
              apiKey={conf.TinyMCE_apikey}
              value={value}
              init={{
                height: 500,
                menubar: true,
                skin: "oxide-dark",
                content_css: "dark",
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
                content_style: `
                  body {
                    background-color: #18181b;
                    color: #f4f4f5;
                    font-family: Inter, Helvetica, Arial, sans-serif;
                    font-size: 14px;
                    padding: 14px;
                  }

                  h1,h2,h3,h4,h5,h6 {
                    color: #fafafa;
                  }

                  a {
                    color: #d4d4d8;
                  }

                  blockquote {
                    border-left: 3px solid #52525b;
                    margin-left: 0;
                    padding-left: 12px;
                    color: #a1a1aa;
                  }

                  code {
                    background: #27272a;
                    color: #e4e4e7;
                    padding: 2px 6px;
                    border-radius: 6px;
                  }
                `,
              }}
              onEditorChange={onChange}
            />
          )}
        />
      </div>
    </div>
  );
}

export default RT_Editor;