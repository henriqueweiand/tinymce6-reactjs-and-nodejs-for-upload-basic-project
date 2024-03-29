import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function TinyMCETest() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>test.</p>"
        apiKey=""
        init={{
          images_upload_url: "/upload/image", // IF you're running from CRA please add full route here "http://localhost:80/upload/image"
          automatic_uploads: true,

          selector: "textarea#open-source-plugins",
          plugins: "preview image link media",
          menubar: false,
          toolbar: "insertfile image media link",

          height: 600,
          contextmenu: "link image table",
        }}
      />
      <button onClick={log}>Log editor content</button>
    </>
  );
}
